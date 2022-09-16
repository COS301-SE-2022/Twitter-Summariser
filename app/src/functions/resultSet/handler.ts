import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

export const getAllResultSet = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const resultSet = await ServicesLayer.resultSetServices.getResultSets(params.apiKey);

			resultSet.map(async (set: any) => {
				delete set.apiKey;
			});

			resultSet.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			});

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

			const resultSet = await ServicesLayer.resultSetServices.getResultSet(
				params.resultSetID,
				params.apiKey
			);

			delete resultSet.apiKey;

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

// Deleting a result set
export const deleteResultSet = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			const result = await ServicesLayer.resultSetServices.deleteResultSet(
				params.resultSetID,
				params.apiKey
			);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(result)
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
