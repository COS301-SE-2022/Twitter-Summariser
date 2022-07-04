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

    let id: string;
    id = "RT-";
    id += randomUUID();
    var dd = new Date();
    var d = new Date(dd.toLocaleString() + "-02:00");

    var x = 1;

    for (var i = 0; i < tweets.length; i++) {
      await ServicesLayer.reportBlockService.addReportBlock({ reportBlockID: 'BK-' + randomUUID(), reportID: id, blockType: "TWEET", position: x, tweetID: tweets[i]["tweetId"] });
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

// Retrieval of user draft reports
export const getAllMyDraftReports = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);
    const reports = await ServicesLayer.reportService.getDraftReports(params.apiKey);


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

// clone report function
export const cloneReport = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    //Getting report copy
    let report = await ServicesLayer.reportService.getReportHelper(params.reportID);
    const oldReportId = report.reportID;
    const owner = report.apiKey;

    if(await ServicesLayer.reportService.verifyReportRetr(report.status, params.apiKey, report.apiKey)){
      return {
        statusCode: statusCodes.unauthorized,
        headers: header,
        body: JSON.stringify('not authorised to edit this report')
      }
    }

    // Cloning report
    let id: string;
    id = "RT-";
    id += randomUUID();

    var dd = new Date();
    var d = new Date(dd.toLocaleString() + "-02:00");

    report.reportID=id;
    report.apiKey=params.apiKey;
    report.author=params.author;
    report.status='DRAFT';
    report.dateCreated=d.toString();

    await ServicesLayer.reportService.addReport(report);

    // Getting and Cloning blocks
    let blocks = await ServicesLayer.reportBlockService.getReportBlocks(oldReportId);

    blocks.map(async block => {
      var temp = Object.assign({}, block);
      temp.reportID=id;
      temp.reportBlockID='BK-' + randomUUID();

      // Getting and cloning text
      if(temp.blockType==='RICHTEXT'){
        let style = await ServicesLayer.textStyleService.getStyle(block.reportBlockID)[0];
        style.textStylesID = "ST-"+randomUUID();
        style.reportBlockID = temp.reportBlockID;
        await ServicesLayer.textStyleService.addStyle(style);
      }
      
      await ServicesLayer.reportBlockService.addReportBlock(temp);
      return temp;
    });
    
    //Cloning result set 
    let resultSet = await ServicesLayer.resultSetServices.getResultSet(oldReportId, owner);
    resultSet.apiKey = params.apiKey;
    var oldRSid = resultSet.id;
    resultSet.id = "RS-"+randomUUID;
    await ServicesLayer.resultSetServices.addResultSet(resultSet);

    //cloning tweets
    let tweets = await ServicesLayer.tweetService.getTweets(oldRSid);
    tweets.map(async tweet =>{
      tweet.resultSetId=resultSet.id;

      await ServicesLayer.tweetService.addTweet(tweet);
    });

    return {
      statusCode: statusCodes.notImplemented,
      headers: header,
      body: JSON.stringify(report)
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

    if(await ServicesLayer.reportService.verifyReportRetr(report.status, params.apiKey, report.apiKey)){
      return {
        statusCode: statusCodes.unauthorized,
        headers: header,
        body: JSON.stringify('not authorised to edit this report')
      }
    }

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
      report = await ServicesLayer.reportService.getReport(params.reportID);

      if(report.status=='DRAFT'){
        report = await ServicesLayer.reportService.updateReportStatus('DELETED', params.reportID);
      }else{
        return {
          statusCode: statusCodes.forbidden,
          headers: header,
          body: JSON.stringify('Only a draft report can be deleted')
        }
      }
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