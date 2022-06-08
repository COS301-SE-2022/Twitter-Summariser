import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ReportBlock from "@model/reportBlock/reportBlock.model";

export default class ReportBlockService {
    private TableName: string = "ReportBlockTable";

    constructor (private docClient: DocumentClient) {}

    
    async getReportBlocks(reportID: string) : Promise<ReportBlock[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "reportBlockIndex",
            KeyConditionExpression: 'reportID = :reportID',
            ExpressionAttributeValues: {
                ":reportID": reportID
            }
        }).promise();

        return result.Items as ReportBlock[];
    }
    
    
    async addReportBlock(reportBlock: ReportBlock): Promise<ReportBlock> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: reportBlock
        }).promise();

        return reportBlock as ReportBlock;
    } 

}