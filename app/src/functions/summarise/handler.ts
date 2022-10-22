import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export const summarize = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			let params = event.body == null ? event : JSON.parse(event.body);

			if (Object.keys(params).length !== 1 || !params.text) {
				return {
					statusCode: statusCodes.badRequest,
					headers: header,
					body: JSON.stringify({ message: "Please provide all/only the required fields" })
				};
			}

			const options = {
				method: "POST",

				url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/",

				headers: {
					"Content-Type": "application/json",
					"X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
					"X-RapidAPI-Key": process.env.RAPIDAPI_KEY
				},

				data: {
					text: params.text,
					min_length: 100,
					max_length: 300
				}
			};

			const response = await axios(options);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({
					text: response.data.summary
				})
			};
		} catch (error) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify({
					message: error.message
				})
			};
		}
	}
);
