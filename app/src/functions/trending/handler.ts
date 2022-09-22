import { APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { statusCodes, header } from "@functions/resources/APIresponse";
import axios from "axios";

export const getTrendingTopics = middyfy(
	async (): Promise<APIGatewayProxyResult> => {
		try {

			const response = await axios.get(
				"https://api.twitter.com/1.1/trends/place.json?id=1",
				{
					headers: {
						Authorization: "Bearer " + process.env.BEARER_TOKEN,
						Accept: "application/json",
						"Content-type": "application/json"
					}
				}
			)

			/*const response = await fetch(
				"https://api.twitter.com/1.1/trends/place.json?id=1" + params.region,
				{
					method: "GET",
					headers: {
						Authorization: "Bearer " + process.env.BEARER_TOKEN + "",
						Accept: "application/json",
						"Content-type": "application/json"
					}
				}
			);*/

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
