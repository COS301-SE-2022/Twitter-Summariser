import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes, AWSDetails } from "@functions/resources/APIresponse";
import { EventBridgeClient, ActivateEventSourceCommand } from "@aws-sdk/client-eventbridge";

export const reportScheduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			// Making eventBridge to trigger event at certain time
			const ruleName = "makingReport";
			const ruleParams = {
				Name: ruleName,
				ScheduleExpression: ""
			};

			//const rule = await eventBridge.putRule(ruleParams).promise();

			// Giving correct permissions
			const permissionParams = {
				Action: "lambda:InvokeFunction",
				FunctionName: "generateReportOfSchedule",
				Principal: "events.amazonaws.com",
				StatementId: ruleName,
				SourceArn: rule.RuleArn
			};

			await lambda.addPermission(permissionParams).promise();

			// Adding lambda target function
			const targetParams = {
				Rule: ruleName,
				Targets: [
					{
						Id: { ruleName } + "-target",
						Arn:
							"arn:aws:lambda:" +
							AWSDetails.region +
							":" +
							AWSDetails.account_id +
							"function:reportScheduler",
						Input: "{ 'data': ''}"
					}
				]
			};

			const result = await eventBridge.putTargets(targetParams).promise();

			return {
				statusCode: statusCodes.notImplemented,
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
