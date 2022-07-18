import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import * as bcrypt from "bcryptjs";
import { header, statusCodes } from "@functions/resources/APIresponse";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import CreatorServices from "../../services";

dotenv.config();

export const getAllCreators = middyfy(async (): Promise<APIGatewayProxyResultV2> => {
    const creators = await CreatorServices.creatorService.getAllCreators();
    try {
        return {
            statusCode: statusCodes.Successful,
            headers: header,
            body: JSON.stringify(creators)
        };
    } catch (error) {
        return {
            statusCode: statusCodes.internalError,
            headers: header,
            body: JSON.stringify(error)
        };
    }
});

export const addCreator = middyfy(
    async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        const params = JSON.parse(event.body);
        if (Object.keys(params).length !== 3) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({ message: "Please provide all/only the required fields" })
            };
        }

        if (!params.email || !params.password || !params.username) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({ error: "Missing username or password" })
            };
        }

        const creatorsArray = await CreatorServices.creatorService.getAllCreators();
        for (const creator of creatorsArray) {
            if (creator.email === params.email) {
                return {
                    statusCode: statusCodes.badRequest,
                    headers: header,
                    body: JSON.stringify({ error: "Email already exists" })
                };
            }
            if (creator.username === params.username) {
                return {
                    statusCode: statusCodes.badRequest,
                    headers: header,
                    body: JSON.stringify({ error: "Username already exists" })
                };
            }
        }

        try {
            let apiKey = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const hashedPass = bcrypt.hashSync(params.password, 10);

            for (let i = 0; i < 15; i++)
                apiKey += characters.charAt(Math.floor(Math.random() * characters.length) + 0);

            const creator = await CreatorServices.creatorService.addCreator({
                apiKey,
                email: params.email,
                username: params.username,
                password: hashedPass,
                dateRegistered: new Date().toISOString(),
                RefreshAccessToken: ""
            });

            const response = {
                apiKey: creator.apiKey,
                email: creator.email,
                username: creator.username
            };

            return {
                statusCode: statusCodes.Successful,
                headers: header,
                body: JSON.stringify(response)
            };
        } catch (e) {
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify(e)
            };
        }
    }
);

export const loginCreator = middyfy(
    async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
        const params = JSON.parse(event.body);

        if (Object.keys(params).length !== 2) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({ message: "Please provide all/only the required fields" })
            };
        }

        if (!params.email || !params.password) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({ error: "Missing username or password" })
            };
        }
        try {
            const creator = await CreatorServices.creatorService.getCreator(params.email);

            if (creator === undefined) {
                return {
                    statusCode: statusCodes.unauthorized,
                    headers: header,
                    body: JSON.stringify(`creator ${params.email} not found`)
                };
            }
            if ((await bcrypt.compare(params.password, creator.password)) !== true) {
                return {
                    statusCode: statusCodes.unauthorized,
                    headers: header,
                    body: JSON.stringify(`Invalid password for user ${params.email}`)
                };
            }
            // Create the Access Token
            const accessToken = jwt.sign(
                {
                    email: creator.email,
                    username: creator.username,
                    apiKey: creator.apiKey
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            // Create the Refresh Token
            const refreshToken = jwt.sign(
                {
                    email: creator.email,
                    username: creator.username,
                    apiKey: creator.apiKey
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            // Update Creator in DB
            const isCreatorUpdated = await CreatorServices.creatorService.updateCreator(
                creator.email,
                refreshToken
            );

            if (isCreatorUpdated === true) {
                const cookieString = `refreshToken=${refreshToken}; HttpOnly; max-age=${24 * 60 * 60 * 1000
                    }`;
                return {
                    statusCode: statusCodes.Successful,
                    headers: {
                        ...header,
                        "Set-Cookie": cookieString
                    },
                    body: JSON.stringify({
                        accessToken,
                        email: creator.email,
                        username: creator.username,
                        apiKey: creator.apiKey
                    })
                };
            }
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify(`Error updating creator ${creator.email}; ${isCreatorUpdated}`)
            };
        } catch (e) {
            return {
                statusCode: statusCodes.internalError,
                headers: header,
                body: JSON.stringify({ message: e.message })
            };
        }
    }
);

export const refreshToken = async (event, _context, callback) => {
    const cookies = event.headers.cookie;
    if (!cookies.includes("refreshToken")) {
        return callback(null, { statusCode: statusCodes.unauthorized, headers: header, body: JSON.stringify({ message: "Missing important token" }) });
    }

    const token = cookies.split("refreshToken=")[1].split(";")[0];

    const creatorsArray = await CreatorServices.creatorService.getAllCreators();
    for (const creator of creatorsArray) {
        if (creator.RefreshAccessToken === token) {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || decoded.username !== creator.username) {
                    return callback(null, { statusCode: statusCodes.unauthorized, headers: header, body: JSON.stringify({ message: "Invalid token" }) });
                }
                const accessToken = jwt.sign(
                    {
                        email: creator.email,
                        username: creator.username,
                        apiKey: creator.apiKey
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );
                const cookieString = `refreshToken=${token}; HttpOnly; max-age=${24 * 60 * 60 * 1000}`;
                return callback(null, {
                    statusCode: statusCodes.Successful,
                    headers: {
                        ...header,
                        "Set-Cookie": cookieString
                    },
                    body: JSON.stringify({
                        accessToken,
                        email: creator.email,
                        username: creator.username,
                        apiKey: creator.apiKey
                    })
                });
            });
        }
    }
    return callback(null, { statusCode: statusCodes.unauthorized, headers: header, body: JSON.stringify({ message: "Invalid token" }) });
}

export const logoutCreator = middyfy(async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    const cookieString = event.cookies;
    console.log(cookieString);

    return {
        statusCode: statusCodes.Successful,
        headers: header,
        body: JSON.stringify({ message: "Logout successful" })
    };
});