import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ReportBlock from "@model/reportBlock/reportBlock.model";
import { maxHeaderSize } from "http";

export default class ReportBlockService {
    
    private TableName: string = "ReportBlockTable";

    constructor (private docClient: DocumentClient) {}

    async getReportBlock(reportBlockID: string): Promise<ReportBlock> {
        
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { "id": reportBlockID}
        }).promise();

        return result.Item as ReportBlock;
    }


    async getReportBlocks(key: string) : Promise<ReportBlock[]> {
        console.log(key);
        
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "reportBlockIndex",
            KeyConditionExpression: 'reportID = :reportID',
            ExpressionAttributeValues: {
                ":reportID": key
            }
        }).promise();

        //console.log(result.Items);

        let blocks : ReportBlock[];
        blocks = result.Items as ReportBlock[];
        this.sortReportBlocks(blocks);

        console.log(blocks);
        return blocks as ReportBlock[];
    }
    
    
    async addReportBlock(reportBlock: ReportBlock): Promise<ReportBlock> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: reportBlock
        }).promise();

        return reportBlock as ReportBlock;
    } 

   async sortReportBlocks(reportBlocks: ReportBlock[]): Promise<ReportBlock[]> {
    reportBlocks.sort((a,b) => {
        if (a['position'] > b['position']) return 1;
        if (a['position'] < b['position']) return -1;
        return 0;
    });
       return reportBlocks as ReportBlock[]
   }

}