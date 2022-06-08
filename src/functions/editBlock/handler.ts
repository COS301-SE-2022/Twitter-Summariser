import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";

export const editBlock = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = JSON.parse(event.body);

        const block = await ServicesLayer.reportBlock.getReportBlock(params.reportID, params.blockID);

        if(block == undefined){
          //await ServicesLayer.reportBlock.addReportBlock({});
        }else{
          //await ServicesLayer.reportBlock.updateReportBlock({});
        }
        
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Methods": '*',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({})
          }
          
    } catch (e) {
        return formatJSONResponse({
         statusCode: 500,
          message: e
        });
      }
});