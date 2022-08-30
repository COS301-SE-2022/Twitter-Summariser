import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import { EventBridge, Lambda } from "aws-sdk";
import ServicesLayer from "../../services";

// Generation of reports
export const reportScheduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body)
			const eventBridge = new EventBridge();
			const lambda = new Lambda();

			const ruleName = params.username+'sRule';
			const ruleParams = {
				Name: ruleName,
				ScheduleExpression: 'cron('+ params.min+ ' '+params.hour+ ' ' + params.dateOfMonth + ' ' + params.month +' ? ' + params.year + ')' //cron(min, hour, date-of-month, month, day-of-week, year)
			};

			const tt = await ServicesLayer.scheduleService.addScheduleSetting({id: ruleName, apiKey: params.apiKey, sortOption: params.sortBy, filterOption: params.filterBy, date: params.date, keyword: params.keyword})

			const rule = await eventBridge.putRule(ruleParams).promise();

			const permissionParams = {
				Action: 'lambda:InvokeFunction',
				FunctionName: 'twitter-summariser-dev-genScheduledReport',
				Principal: 'events.amazonaws.com',
				StatementId: ruleName,
				SourceArn: rule.RuleArn,
			};

			await lambda.addPermission(permissionParams).promise();

			const targetParams = {
				Rule: ruleName,
				Targets: [
					{
						Id: ruleName + '-target',
						Arn: 'arn:aws:lambda:us-east-1:534808114586:function:twitter-summariser-dev-genScheduledReport',
						Input: '{ "data": "data for genReport" } ',
					},

				],
			}

			const result = await eventBridge.putTargets(targetParams).promise();

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

export const genScheduledReport = middyfy(async (): Promise<void> => {
	try {

	} catch (e) {

	}
}
);

export const deleteEventRules = middyfy(async (): Promise<void> => {
	try {
		const eventBridge = new EventBridge();
		
		const rem = {
			Bus: "default",
			Ids: [],
			Rule: "",
			Force: true
		};
		await eventBridge.removeTargets(rem).promise();

		const delRule = {
			Name: "",
			Bus: "",
			Force: true
		}
		await eventBridge.deleteRule(delRule);
	} catch (e) {

	}
});