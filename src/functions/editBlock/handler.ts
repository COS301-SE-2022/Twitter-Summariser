import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";

export const editBlock = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = JSON.parse(event.body);

        let text: any;
        let styles: any;

        if(params.reportBlockID==undefined){
          var id = "BL-"+randomUUID();
          text = await ServicesLayer.reportBlockService.addReportBlock({reportBlockID: id, reportID: params.reportID, blockType: 'RICHTEXT', position: params.position, richText: params.text});
          var sid = "ST-"+randomUUID();
          styles = await ServicesLayer.textStyleService.addStyle({styleID: sid, reportBlockID: id, align: params.textStyle.Align, bold: params.textStyle.Bold, colour: params.textStyle.Color, italic: params.textStyle.Italic, size: params.textStyle.Size});
        }else{
          text = await ServicesLayer.reportBlockService.addReportBlock({reportBlockID: params.reportBlockID, reportID: params.reportID, blockType: 'RICHTEXT', position: params.position, richText: params.text});
          styles = await ServicesLayer.textStyleService.addStyle({styleID: params.styleID, reportBlockID: params.reportBlockID, align: params.textStyle.Align, bold: params.textStyle.Bold, colour: params.textStyle.Color, italic: params.textStyle.Italic, size: params.textStyle.Size});
        }
        
        return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Methods": '*',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({text: text, styles: styles})
          }
          
    } catch (e) {
        return formatJSONResponse({
         statusCode: 500,
          message: e
        });
      }
});