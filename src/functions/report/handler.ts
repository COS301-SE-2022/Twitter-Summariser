import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";

export const getAllMyReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = await ServicesLayer.reportService.getReports(params.apiKey);


    //const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(reports)
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});

// Published reports
export const getAllReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = ServicesLayer.reportService.getReports(params.apiKey);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(reports)
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});

export const getReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const report = await ServicesLayer.reportService.getReport(params.reportID);
    //const blocks = await ServicesLayer.reportBlock.getBlocks(params.reportID);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ report: report/*, blocks: blocks*/ })
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});