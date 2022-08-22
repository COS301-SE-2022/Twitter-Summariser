import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

// Generation of reports
export const reportScheduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body)

			 await ServicesLayer.scheduleService.addScheduleSetting({apiKey: params.apiKey, keyword: params.keyword, date: new Date(), period: 56, id: "9999"})
			 
			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(params)
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