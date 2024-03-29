import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import * as bcrypt from "bcryptjs";
import { header, statusCodes } from "@functions/resources/APIresponse";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import CreatorServices from "../../services";

dotenv.config();

export const getAllCreators = middyfy(async (): Promise<APIGatewayProxyResultV2> => {
	try {
		const creators = await CreatorServices.creatorService.getAllCreators();
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

export const deleteUser = middyfy(
	async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
		const params = JSON.parse(event.body);
		const creator = await CreatorServices.creatorService.deleteCreator(params.email);

		try {
			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(creator)
			};
		} catch (error) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(error)
			};
		}
	}
);

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
				RefreshAccessToken: "",
				profileKey: "assets/profile.png"
			});

			const response = {
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
			if (
				creator === undefined ||
				(await bcrypt.compare(params.password, creator.password)) !== true
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify({ error: "Invalid email or password" })
				};
			}

			// Create the Access Token
			const accessToken = jwt.sign(
				{
					username: creator.username
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "30m"
				}
			);

			// Create the Refresh Token
			const refreshToken = jwt.sign(
				{
					username: creator.username
				},
				process.env.REFRESH_TOKEN_SECRET,
				{
					expiresIn: "30d"
				}
			);

			// Update Creator in DB
			const isCreatorUpdated = await CreatorServices.creatorService.updateCreator(
				creator.email,
				refreshToken
			);

			if (isCreatorUpdated === true) {
				const cookieString = `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None; max-age=${
					24 * 60 * 60 * 1000
				}`;
				return {
					statusCode: statusCodes.Successful,
					headers: {
						...header,
						"set-cookie": cookieString
					},
					body: JSON.stringify({
						accessToken,
						email: creator.email,
						username: creator.username,
						apiKey: creator.apiKey,
						profileKey: creator.profileKey
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
	const cookies = event.headers.Cookie || event.headers.cookie;

	if (!cookies?.includes("refreshToken")) {
		return callback(null, {
			statusCode: statusCodes.unauthorized,
			headers: header,
			body: JSON.stringify({ message: "Missing important token" })
		});
	}

	const token = cookies.split("refreshToken=")[1].split(";")[0];
	const creatorsArray = await CreatorServices.creatorService.getAllCreators();

	for (const creator of creatorsArray) {
		if (creator.RefreshAccessToken === token) {
			jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
				if (err || decoded.username !== creator.username)
					return callback(null, {
						statusCode: statusCodes.unauthorized,
						headers: header,
						body: JSON.stringify({ message: "Invalid token" })
					});

				const accessToken = jwt.sign(
					{
						username: creator.username
					},
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "30m"
					}
				);
				const cookieString = `refreshToken=${token}; Path=/; HttpOnly; Secure; SameSite=None; max-age=${
					24 * 60 * 60 * 1000
				}`;

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
						apiKey: creator.apiKey,
						profileKey: creator.profileKey
					})
				});
			});
		}
	}

	return callback(null, {
		statusCode: statusCodes.unauthorized,
		headers: header,
		body: JSON.stringify({ message: "Invalid token" })
	});
};

export const logoutCreator = async (event, _context, callback) => {
	const cookieString = event.headers.Cookie || event.headers.cookie;
	if (!cookieString?.includes("refreshToken")) {
		return callback(null, { statusCode: statusCodes.no_content, headers: header });
	}

	const token = cookieString.split("refreshToken=")[1].split(";")[0];
	const creatorsArray = await CreatorServices.creatorService.getAllCreators();

	for (const creator of creatorsArray) {
		if (creator.RefreshAccessToken === token) {
			await CreatorServices.creatorService.updateCreator(creator.email, "None");
		}
	}

	const cookie = `refreshToken=; Path=/; HttpOnly; Secure; SameSite=None; max-age=0; $`;
	return callback(null, {
		statusCode: statusCodes.no_content,
		headers: { ...header, "Set-Cookie": cookie }
	});
};
