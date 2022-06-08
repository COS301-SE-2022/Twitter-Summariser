import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";

export const generateReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = JSON.parse(event.body);

        const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);

        console.log(tweets);

        let id: string;
        id = "RT-";
        id += randomUUID();
        process.env.TZ = 'Africa/South_Africa';

        console.log(id);
        const report = await ServicesLayer.reportService.addReport({reportID: id, resultSetID: params.resultSetID, apiKey: params.apiKey, dateCreated: new Date(), author: params.author});
        
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Methods": '*',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({Report: report, Tweets: tweets})
          }
          
    } catch (e) {
        return formatJSONResponse({
         statusCode: 500,
          message: e
        });
      }
});