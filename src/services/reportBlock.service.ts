import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ReportBlock from "@model/reportBlock/reportBlock.model";

export default class ReportBlockService {
    private TableName: string = "ReportBlockTable";

    constructor (private docClient: DocumentClient) {}

    /*
    async getReportBlocks(reportID: string) : Promise<ReportBlock[]> {
        const result = 
    }
    */
    
    async addReportBlock(reportBlock: ReportBlock): Promise<ReportBlock> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: reportBlock
        }).promise();

        return reportBlock as ReportBlock;
    } 

}