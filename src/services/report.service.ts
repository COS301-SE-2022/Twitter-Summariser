import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/report/report.model";

import ServicesLayer from "../services";

export default class ReportService {

    // add function to get all published reports

    private TableName: string = "ReportTable";

    constructor (private docClient: DocumentClient) {}

    // get specific reports
    async getReport(id: string) : Promise<any> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: { "reportID": id}
        }).promise();

        if (result == undefined)
            throw new Error("report with id: "+id+ " does not exist");
            
        const item = result.Item;

        const report = [];

        const reportBlocks = await ServicesLayer.reportBlockService.getReportBlocks(item.reportID);
        
        const promises = reportBlocks.map(async block => {
            let type = block.blockType;
            let ob = {};

            ob["blockType"] = type;
            ob["position"] = block.position;
            
            if (type === "TWEET") {
                const tweet = await ServicesLayer.tweetService.getTweet(block.tweetID);
                // console.log(tweet);
                ob["block"]=tweet;    
                // console.log(ob);          
            }
            else if (type === "RICHTEXT") {
                
                const style = await ServicesLayer.textStyleService.getStyle(block.reportBlockID);
                ob["block"]={
                    text: block.richText,
                    position: block.position,
                    style: style
                };
            }
            report.push(ob);

        });
        
        await Promise.all(promises);
        await ServicesLayer.reportBlockService.sortReportBlocks(report);
        let rp = [];
        let bl =false;
        var max =0;
        var count =0;

        for(var y=0; y<report.length; y++){
            max = report[y].position;
        }
        
        for(var x=0; x<max; x++){
            for(var y=0; y<report.length; y++){
                if(report[y].position==x){
                    rp.push(report[y]);
                    bl=true;
                    count++;
                }
            }
            
            if(!bl){
                rp.push({blockType: 'RICHTEXT', position: x, block: null});
                count++;
            }
            bl=false;
        }

        item["Report"] = rp;
        item["numOfBlocks"] = count;

        return result.Item;
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

    async updateReportStatus(status: String, reportID: String): Promise<Report> {
        const result = await this.docClient.update({
            TableName: this.TableName,
            Key: {"reportID": reportID},
            UpdateExpression: "SET status = :status",
            ExpressionAttributeValues: {
                ":status": status
            }
            
        }).promise();

        return result.Attributes as Report;
    }

    // get my reports
    async getAllPublishedReports(): Promise<Report[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "reportIndex",
            KeyConditionExpression: 'status = :status',
            ExpressionAttributeValues: {
                ":status": "PUBLISHED"
            }
        }).promise();

        console.log(result.Items);
    

        // const tweets = await ServicesLayer.tweetService.getTweets(resultSetID);
        return result.Items as Report[];
    }

}
