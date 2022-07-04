import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

export const getAllResultSet = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const resultSet = await ServicesLayer.resultSetServices.getResultSets(params.apiKey);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(resultSet)
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

export const getResultSet = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
			const resultSet = await ServicesLayer.resultSetServices.getResultSet(
				params.resultSetID,
				params.apiKey
			);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ resultSet, Tweets: tweets })
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
