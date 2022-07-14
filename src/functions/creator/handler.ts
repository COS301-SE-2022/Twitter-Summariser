import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import * as bcrypt from "bcryptjs";
import { header, statusCodes } from "@functions/resources/APIresponse";
import CreatorServices from "../../services";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getAllCreators = middyfy(async (): Promise<APIGatewayProxyResult> => {
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
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        let apiKey: string;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        apiKey = "";

        for (let i = 0; i < 15; i++) {
            apiKey += characters.charAt(Math.floor(Math.random() * characters.length) + 0);
        }

        const params = JSON.parse(event.body);

        const hashedPass = bcrypt.hashSync(params.password, 10);

        try {
            const creator = await CreatorServices.creatorService.addCreator({
                apiKey,
                email: params.email,
                username: params.username,
                password: hashedPass,
                dateOfBirth: params.dateOfBirth,
                dateRegistered: new Date().toISOString()
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
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const params = JSON.parse(event.body);

        if (!params.email || !params.password) {
            return {
                statusCode: statusCodes.badRequest,
                headers: header,
                body: JSON.stringify({ 'error': 'Missing username or password' })
            };
        } else {
            try {
                const creator = await CreatorServices.creatorService.getCreator(params.email);

                if (creator === undefined) {
                    return {
                        statusCode: statusCodes.unauthorized,
                        headers: header,
                        body: JSON.stringify(`creator ${params.email} not found`)
                    };
                } else if ((await bcrypt.compare(params.password, creator.password)) !== true) {
                    return {
                        statusCode: statusCodes.unauthorized,
                        headers: header,
                        body: JSON.stringify(`Invalid password for user ${params.email}`)
                    };
                } else {
                    // Create the Access Token
                    const accessToken = jwt.sign(
                        {
                            email: creator.email,
                            username: creator.username,
                            apiKey: creator.apiKey
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "1h"
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
                    const isCreatorUpdated = await CreatorServices.creatorService.updateCreator(creator.email, refreshToken);

                    if (isCreatorUpdated === true) {
                        return {
                            statusCode: statusCodes.Successful,
                            headers: {
                                ...header,
                                "Set-Cookie": "JWT=" + refreshToken + "; HttpOnly; Max-Age=" + 24 * 60 * 60 * 1000
                            },
                            body: JSON.stringify({
                                apiKey: creator.apiKey,
                                email: creator.email,
                                username: creator.username,
                                accessToken: accessToken
                            })
                        };
                    } else {
                        return {
                            statusCode: statusCodes.internalError,
                            headers: header,
                            body: JSON.stringify(`Error updating creator ${creator.email}; ${isCreatorUpdated}`)
                        };
                    }
                }
            } catch (e) {
                return {
                    statusCode: statusCodes.internalError,
                    headers: header,
                    body: JSON.stringify({ message: e.message })
                };
            }
        }
    }
);
