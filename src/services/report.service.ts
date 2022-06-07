import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/report/report.model";

export default class ReportService {
    private TableName: string = "ReportTable";

    constructor (private docClient: DocumentClient) {}

    async getReport(id: string) : Promise<Report[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id
            }

        }).promise();

        return result.Items as Report[];
    }

}