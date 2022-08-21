import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

// Generation of reports
export const reportScheduler = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify('')
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