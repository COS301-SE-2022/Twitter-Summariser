import {  APIGatewayProxyResultV2 } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import { Lambda } from "aws-sdk";


const lambda = new Lambda();


export const warmupTextSummariser = middyfy(async (): Promise<APIGatewayProxyResultV2> => {
	try {

        const lambdaParams = {
				FunctionName: "text-summarisation-dev-summarise",
				InvocationType: "RequestResponse",
				Payload: JSON.stringify({ 
					text: "Hello World",
					min: 100,
					max: 200
				})
			};

        await lambda.invoke(lambdaParams, function(data, err) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }).promise();

        return {
            statusCode: statusCodes.Successful,
            headers: header,
            body: JSON.stringify("Function Warmed Up")
        };
		
	} catch (error) {
		return {
			statusCode: statusCodes.internalError,
			headers: header,
			body: JSON.stringify(error)
		};
	}
});