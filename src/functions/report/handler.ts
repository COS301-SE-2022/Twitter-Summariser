import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from "@libs/lambda";
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";
import reportModel from "@model/report/report.model";

// Generation of reports
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

    const report = await ServicesLayer.reportService.addReport({ reportID: id, resultSetID: params.resultSetID, status: "DRAFT", title: title.searchPhrase, apiKey: params.apiKey, dateCreated: d.toString(), author: params.author });

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

// Retrieval of reports
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

// Retrieval of Published reports
export const getAllPublishedReports = middyfy(async (): Promise<APIGatewayProxyResult> => {
  try {
    const reports = ServicesLayer.reportService.getAllPublishedReports();

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

// Share report
export const shareReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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

// Get report function
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

// Pubishing of reports
export const publishReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let report;

    if(ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      report = ServicesLayer.reportService.updateReportStatus('PUBLISHED', params.reportID);
    }else{
      throw Error('Request not authorised.');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(report)
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(e)
    };
  }
});

// Unpubishing of reports
export const unpublishReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let result;

    if(ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      result = ServicesLayer.reportService.updateReportStatus('DRAFT', params.reportID);
    }else{
      throw Error('Request not authorised.');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result)
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(e)
    };
  }
});

// Adding a custom tweet
export const addCustomTweet = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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

// Deleting a result set
export const deleteResultSet = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const result = ServicesLayer.resultSetServices.deleteResultSet(params.resultSetID);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result)
    }
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});

// Deleting a report
export const deleteDraftReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let report;

    if(ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      report = ServicesLayer.reportService.updateReportStatus('DELETED', params.reportID);
    }else{
      throw Error('Request not authorised.');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(report)
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(e)
    };
  }
});