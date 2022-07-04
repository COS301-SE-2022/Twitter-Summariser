import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import CreatorServices from "../../services";

import * as bcrypt from "bcryptjs";
import { header, statusCodes } from "@functions/resources/APIresponse";

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
				apiKey: apiKey,
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

		try {
			const creator = await CreatorServices.creatorService.getCreator(params.email);

			if (creator === undefined) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("creator " + params.email + " not found")
				};
			}

			if ((await bcrypt.compare(params.password, creator.password)) != true) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("invalid credentials for user " + params.email)
				};
			}

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
				body: JSON.stringify({ message: e.message })
			};
		}
	}
);
