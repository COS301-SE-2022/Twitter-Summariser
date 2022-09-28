import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import { EventBridge, Lambda } from "aws-sdk";
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";
import axiosPrivate from "../../../client/src/api/ConfigAxios";
import axios from "axios";


const eventBridge = new EventBridge();
const lambda = new Lambda();

// Generation of reports
export const reportScheduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			/*const eventBridge = new EventBridge();
			const lambda = new Lambda();*/

			const date_time = new Date(params.fullUTCDate);
			const ruleName = "SR-" + randomUUID();
			const ruleParams = {
				Name: ruleName,
				ScheduleExpression:
					"cron(" +
					date_time.getUTCMinutes() +
					" " +
					date_time.getUTCHours() +
					" " +
					date_time.getUTCDate() +
					" " +
					(date_time.getUTCMonth() + 1) +
					" ? " +
					date_time.getUTCFullYear() +
					")" //cron(min, hour, date-of-month, month, day-of-week, year)
			};

			const rule = await eventBridge.putRule(ruleParams).promise();

			const permissionParams = {
				Action: "lambda:InvokeFunction",
				FunctionName: "twitter-summariser-prod-genScheduledReport",
				Principal: "events.amazonaws.com",
				StatementId: ruleName,
				SourceArn: rule.RuleArn
			};

			await lambda.addPermission(permissionParams).promise();

			const targetParams = {
				Rule: ruleName,
				Targets: [
					{
						Id: ruleName + "-target",
						Arn: "arn:aws:lambda:us-east-1:724052881296:function:twitter-summariser-prod-genScheduledReport",
						Input: JSON.stringify(params.reportDetails)
					}
				]
			};

			await eventBridge.putTargets(targetParams).promise();

			await ServicesLayer.scheduleService.addScheduleSetting({
				id: ruleName,
				apiKey: params.apiKey,
				sortOption: params.sortBy,
				filterOption: params.filterBy,
				date: params.date,
				keyword: params.keyword
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify("success")
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

export const genScheduledReport = async (params): Promise<void> => {
	try {
		const responseST = await axiosPrivate.post(
			"searchTweets",
			JSON.stringify({
				apiKey: params.apiKey,
				filterBy: params.filterBy,
				keyword: params.keyword,
				numOfTweets: params.numOfTweets,
				sortBy: params.sortBy
			})
		);

		const generateParams = {
			FunctionName: "twitter-summariser-prod-generateReport",
			InvocationType: "RequestResponse",
			Payload: JSON.stringify({
				apiKey: params.apiKey,
				author: params.author,
				resultSetID: responseST.data.resultSetID,
				reportType: "SCHEDULED"
			})
		};

		await lambda.invoke(generateParams).promise();

	} catch (e) {}
};

export const deleteEventRules = middyfy(async (event: APIGatewayProxyEvent): Promise<void> => {
	try {
		const params = JSON.parse(event.body);

		const eventBridge = new EventBridge();

		const ruleName = params.ruleID;

		const rem = {
			Bus: "default",
			Ids: [ruleName + "-target"],
			Rule: ruleName,
			Force: true
		};
		await eventBridge.removeTargets(rem).promise();

		const delRule = {
			Name: ruleName,
			Bus: "default",
			Force: true
		};
		await eventBridge.deleteRule(delRule);
	} catch (e) {}
});
