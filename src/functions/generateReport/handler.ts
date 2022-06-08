import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";

export const generateReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = JSON.parse(event.body);

        const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);

        //console.log(tweets);

        var bid = 'BK-'+randomUUID();

        let id: string;
        id = "RT-";
        id += randomUUID();
        var dd = new Date();
        var d = new Date(dd.toLocaleString()+"-02:00");

        var x=1;
        for(var i=0; i<tweets.length; i++){
          await ServicesLayer.reportBlock.addReportBlock({id: bid, reportID: id, blockType: "TWEET", position: x, tweetID: tweets[i]["tweetId"]});
          x=x+2;
        }

        const report = await ServicesLayer.reportService.addReport({reportID: id, resultSetID: params.resultSetID, title: "Input Title", apiKey: params.apiKey, dateCreated: d.toString(), author: params.author});
        
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Methods": '*',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({Report: report})
          }
          
    } catch (e) {
        return formatJSONResponse({
         statusCode: 500,
          message: e
        });
      }
});