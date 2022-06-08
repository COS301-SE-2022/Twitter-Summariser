import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/report/report.model";

import ServicesLayer from "../services";

export default class ReportService {

    // add function to get all published reports

    private TableName: string = "ReportTable";

    constructor (private docClient: DocumentClient) {}

    // get specific reports
    async getReport(id: string) : Promise<Report> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { "reportID": id}
        }).promise();

        const item = result.Item;

        const tweets = await ServicesLayer.tweetService.getTweets(item.resultSetID);

        item["tweets"] = tweets;

        // console.log(result.Item);

        

        return result.Item as Report;
    }

    // get my reports
    async getReports(key: string): Promise<Report[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "reportIndex",
            KeyConditionExpression: 'apiKey = :apiKey',
            ExpressionAttributeValues: {
                ":apiKey": key
            }
        }).promise();

        console.log(result.Items);
    

        // const tweets = await ServicesLayer.tweetService.getTweets(resultSetID);
        return result.Items as Report[];
    }

    // store reports
    async addReport(report: Report): Promise<Report> {
        // console.log(report);
        await this.docClient.put({
            TableName: this.TableName,
            Item: report
        }).promise();

        return report as Report;
    }
}