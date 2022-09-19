import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import fetch from 'node-fetch'
import { statusCodes, header } from "@functions/resources/APIresponse";


export const searchTweets = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

            const response = await fetch('https://api.twitter.com/1.1/trends/place.json?id=1'+params.region, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer '+process.env.BEARER_TOKEN,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                return {
                    statusCode: statusCodes.internalError,
                    headers: header,
                    body: JSON.stringify(response.status)
                };
            }

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