import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";
import *  as AWS from 'aws-sdk';

// Importing Lambda Attributes
const eventBridge = new AWS.EventBridge();
const lambda = new AWS.Lambda();

export const reportSchduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			// Making eventBridge to trigger event at certain time
			const ruleName = "makingReport";
			const ruleParams = {
				Name: ruleName,
				ScheduleExpression: "",
			};

			const rule = await eventBridge.putRule(ruleParams).promise;

			// Giving correct permissions
			const permissionParams = {
				Action: 'lambda'
			}

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
