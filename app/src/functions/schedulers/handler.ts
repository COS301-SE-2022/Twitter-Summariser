import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";
import { EventBridge,Lambda } from "aws-sdk";

// Generation of reports
export const reportScheduler = middyfy(
	async (/*event: APIGatewayProxyEvent*/): Promise<APIGatewayProxyResult> => {
		try {
			//const params = JSON.parse(event.body)
			const eventBridge = new EventBridge();
			const lambda = new Lambda();

			const ruleName = 'MyProgramaticRuleName';
			const ruleParams = {
				Name: ruleName,
				ScheduleExpression: 'rate (1 hour)'
			};

			const rule = await eventBridge.putRule(ruleParams).promise();
			
			const permissionParams = {
				Action : 'lambda:InvokeFunction',
				FunctionName: 'genScheduledReport',
				Principal: 'events.amazonaws.com',
				StatementId: ruleName,
				SourceArn: rule.RuleArn,
			};

			await lambda.addPermission(permissionParams).promise();

			const targetParams = {
				Rule: ruleName,
				Targets: [
					{
						Id: ruleName+'-target',
						Arn: 'arn:aws:lambda:N. Virginia:534808114586:function:genScheduledReport',
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

export const genScheduledReport = middyfy( async ( ) : Promise<void> => {
		try {			

		} catch (e) {

		}
	}
);