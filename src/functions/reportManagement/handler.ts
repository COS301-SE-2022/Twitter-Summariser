import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";

export const cloneReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const params = JSON.parse(event.body);
      //const reports = await ServicesLayer.reportService.getReports(params.apiKey);
  
  
      //const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Methods": '*',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify("")
      }
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e
      });
    }
  });