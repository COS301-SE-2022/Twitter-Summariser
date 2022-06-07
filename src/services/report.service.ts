import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/report/report.model";

export default class ReportService {
    private TableName: string = "ReportTable";

    constructor (private docClient: DocumentClient) {}

    async getReport(id: string) : Promise<Report> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { PK: id}
        }).promise();

        return result.Item as Report;
    }

    async getReports(key: string): Promise<Report[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "reportIndex",
            KeyConditionExpression: 'apiKey = :apiKey',
            ExpressionAttributeValues: {
                ":apiKey": key
            }
        }).promise();

        return result.Items as Report[];
    }

    async addReport(report: Report): Promise<Report> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: report
        }).promise();

        return report as Report;
    }

}