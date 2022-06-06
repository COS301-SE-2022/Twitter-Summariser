import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/Report/report.model";

export default class ReportService {
    
    private TableName: string = "ReportTable";

    constructor(private docClient: DocumentClient) {}

    async getMyReports(key: string) : Promise<Report[]> {
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

    async getAllReports(): Promise<Report[]> {
        const creator = await this.docClient.scan({
            TableName: this.TableName,
        }).promise()
        return creator.Items as Report[];
    }

    async getReport(id: string, key: string) : Promise<Report> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { id, key}
        }).promise();

        return result.Item as Report;
    }

    async addReport(report: Report): Promise<Report> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: report
        }).promise();

        return report as Report;
    }
}