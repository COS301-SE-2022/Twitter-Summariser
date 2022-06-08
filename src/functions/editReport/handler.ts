import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";

export const editReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = JSON.parse(event.body);

        //const blocks = await ServicesLayer.reportBlock.getBlocks(params.reportID);

        //console.log(tweets);

        let id: string;
        id = "RT-";
        id += randomUUID();
        var dd = new Date();
        var d = new Date(dd.toLocaleString()+"-02:00");

        console.log(id);
        const report = await ServicesLayer.reportService.addReport({reportID: id, resultSetID: params.resultSetID, title: "Input Title", apiKey: params.apiKey, dateCreated: d, author: params.author});
        
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