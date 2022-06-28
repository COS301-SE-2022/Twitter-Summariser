import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";

//Generation of reports
export const generateReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
    const title = await ServicesLayer.resultSetServices.getResultSet(params.resultSetID, params.apiKey);

    //console.log(tweets);

    var bid = 'BK-';

    let id: string;
    id = "RT-";
    id += randomUUID();
    var dd = new Date();
    var d = new Date(dd.toLocaleString() + "-02:00");

    var x = 1;

    for (var i = 0; i < tweets.length; i++) {
      await ServicesLayer.reportBlockService.addReportBlock({ reportBlockID: bid + randomUUID(), reportID: id, blockType: "TWEET", position: x, tweetID: tweets[i]["tweetId"] });
      x = x + 2;
    }

    const report = await ServicesLayer.reportService.addReport({ reportID: id, resultSetID: params.resultSetID, title: title.searchPhrase, apiKey: params.apiKey, dateCreated: d.toString(), author: params.author });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ Report: report })
    }

  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});

//Retrieval of reports
export const getAllMyDraftReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = await ServicesLayer.reportService.getReports(params.apiKey);


    //const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
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
export const getAllPublishedReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = ServicesLayer.reportService.getReports(params.apiKey);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ report: report })
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});

//Pubishing of reports
export const publishReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify('')
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});