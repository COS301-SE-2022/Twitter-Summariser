import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import ServicesLayer from "../../services";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";

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
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify({ Report: report })
    }

  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Retrieval of reports
export const getAllMyDraftReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = await ServicesLayer.reportService.getReports(params.apiKey);


    //const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(reports)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Retrieval of Published reports
export const getAllPublishedReports = middyfy(async (): Promise<APIGatewayProxyResult> => {
  try {
    const reports = await ServicesLayer.reportService.getAllPublishedReports();

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(reports)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Share report
export const shareReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    
    return {
      statusCode: statusCodes.notImplemented,
      headers: header,
      body: JSON.stringify('Not Yet done')
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Get report function
export const getReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {

    const params = JSON.parse(event.body);
    const report = await ServicesLayer.reportService.getReport(params.reportID);

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify({ report: report })
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Pubishing of reports
export const publishReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let report;

    if(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      report = await ServicesLayer.reportService.updateReportStatus('PUBLISHED', params.reportID);
    }else{
      return {
        statusCode: statusCodes.unauthorized,
        headers: header,
        body: JSON.stringify('Only owner can publish a report.')
      }
    }

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(report)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    };
  }
});

// Unpubishing of reports
export const unpublishReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let result;

    if(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      result = await ServicesLayer.reportService.updateReportStatus('DRAFT', params.reportID);
    }else{
      return {
        statusCode: statusCodes.unauthorized,
        headers: header,
        body: JSON.stringify('Only owner can unpublish a report')
      }
    }

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(result)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    };
  }
});

// Adding a custom tweet
export const addCustomTweet = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    return {
      statusCode: statusCodes.notImplemented,
      headers: header,
      body: JSON.stringify('Still working on')
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Deleting a result set
export const deleteResultSet = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const result = await ServicesLayer.resultSetServices.deleteResultSet(params.resultSetID);

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(result)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    }
  }
});

// Deleting a report
export const deleteDraftReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    let report;

    if(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)){
      report = await ServicesLayer.reportService.updateReportStatus('DELETED', params.reportID);
    }else{
      return {
        statusCode: statusCodes.unauthorized,
        headers: header,
        body: JSON.stringify('Only owner can delete a draft report')
      }
    }

    return {
      statusCode: statusCodes.Successful,
      headers: header,
      body: JSON.stringify(report)
    }
  } catch (e) {
    return {
      statusCode: statusCodes.internalError,
      headers: header,
      body: JSON.stringify(e)
    };
  }
});