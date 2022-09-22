import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Report from "@model/report/report.model";
import Permission from "@model/permission/permissions.model";
import ServicesLayer from ".";
import { Lambda } from "aws-sdk";
import { randomUUID } from "crypto";
import { clientV2 } from "@functions/resources/twitterV2.client";

export default class ReportService {
	// add function to get all published reports

	private TableName = "ReportTable";

	constructor(private docClient: DocumentClient) {}

	// get specific reports
	async getReport(id: string): Promise<any> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: { reportID: id }
			})
			.promise();

		if (result === undefined) throw new Error(`report with id: ${id} does not exist`);

		const item = result.Item;

		const report = [];

		const reportBlocks = await ServicesLayer.reportBlockService.getReportBlocks(item.reportID);

		const promises = reportBlocks.map(async (block) => {
			const type = block.blockType;
			const ob = {} as any;

			ob.blockType = type;
			ob.position = block.position;
			ob.reportBlockID = block.reportBlockID;

			if (type === "TWEET") {
				ob.block = {
					tweetID: block.tweetID
				};
			} else if (type === "RICHTEXT") {
				const style = await ServicesLayer.textStyleService.getStyle(block.reportBlockID);
				ob.block = {
					text: block.richText,
					position: block.position,
					style
				};
			}
			report.push(ob);
		});

		await Promise.all(promises);
		await ServicesLayer.reportBlockService.sortReportBlocks(report);
		const rp = [];
		let bl = false;
		let count = 0;
		let max;

		for (let y = 0; y < report.length; y++) {
			max = report[y].position;
		}

		let y = 0;
		for (let x = 0; x < max + 2; x++) {
			if (report[y] !== undefined) {
				if (report[y].position === x) {
					rp.push(report[y]);
					bl = true;
					count++;
					y++;
				}
			}

			if (!bl && y > 0) {
				if (report[y - 1].blockType === "TWEET") {
					rp.push({ blockType: "RICHTEXT", position: x, block: null });
					count++;
				}
			} else if (!bl && x === 0) {
				rp.push({ blockType: "RICHTEXT", position: x, block: null });
			}
			bl = false;
		}

		item.Report = rp;
		item.numOfBlocks = count;

		return result.Item;
	}

	// get my report helper for backend
	async getReportHelper(id: string): Promise<Report> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: { reportID: id }
			})
			.promise();

		// const tweets = await ServicesLayer.tweetService.getTweets(resultSetID);
		return result.Item as Report;
	}

	// get my reports
	async getReports(key: string): Promise<Report[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "reportIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				ExpressionAttributeValues: {
					":apiKey": key
				}
			})
			.promise();

		if (result === undefined) throw new Error(`no reports found`);

		// const tweets = await ServicesLayer.tweetService.getTweets(resultSetID);
		return result.Items as Report[];
	}

	async getDraftReports(key: string): Promise<Report[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "reportIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				FilterExpression: "#status = :status",
				ExpressionAttributeValues: {
					":apiKey": key,
					":status": "DRAFT"
				},
				ExpressionAttributeNames: {
					"#status": "status"
				}
			})
			.promise();

		return result.Items as Report[];
	}

	async getPublishedReports(key: string): Promise<Report[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "reportIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				FilterExpression: "#status = :status",
				ExpressionAttributeValues: {
					":apiKey": key,
					":status": "PUBLISHED"
				},
				ExpressionAttributeNames: {
					"#status": "status"
				}
			})
			.promise();

		return result.Items as Report[];
	}

	async getAllPublishedReports(): Promise<Report[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "statusIndex",
				KeyConditionExpression: "#status = :status",
				ExpressionAttributeNames: {
					"#status": "status"
				},
				ExpressionAttributeValues: {
					":status": "PUBLISHED"
				}
			})
			.promise();

		return result.Items as Report[];
	}

	async getSharedReports(key: string): Promise<Report[]> {
		const permissions: Permission[] = await ServicesLayer.permissionService.getPermissions(key);

		const results: Report[] = [];

		const promises = permissions.map(async (permission) => {
			const id = permission.reportID;
			const report = await this.getReportHelper(id);
			report.permission = permission.type;
			results.push(report);
		});

		await Promise.all(promises);

		return results as Report[];
	}

	// store reports
	async addReport(report: Report): Promise<Report> {
		// console.log(report);
		await this.docClient
			.put({
				TableName: this.TableName,
				Item: report
			})
			.promise();

		return report as Report;
	}

	// update Report
	async updateReportStatus(status: string, reportID: string) {
		await this.docClient
			.update({
				TableName: this.TableName,
				Key: {
					reportID: reportID
				},
				UpdateExpression: "SET #status = :status",
				ExpressionAttributeNames: {
					"#status": "status"
				},
				ExpressionAttributeValues: {
					":status": status
				}
			})
			.promise();
	}

	async updateReportTitle(title: string, reportID: string) {
		await this.docClient
			.update({
				TableName: this.TableName,
				Key: {
					reportID
				},
				UpdateExpression: "SET #title = :title",
				ExpressionAttributeNames: {
					"#title": "title"
				},
				ExpressionAttributeValues: {
					":title": title
				}
			})
			.promise();
	}

	async deleteReport(id: string) {
		await this.docClient
			.delete({
				TableName: this.TableName,
				Key: {
					reportID: id
				}
			})
			.promise();
	}

	// verify owner of report
	async verifyOwner(reportID: string, apiKey: string): Promise<boolean> {
		const per = await this.getReport(reportID);
		return per.apiKey === apiKey;
	}

	//Generate Report
	async genrateReport(params: any): Promise<any> {

		const lambda = new Lambda();
		const title = await ServicesLayer.resultSetServices.getResultSet(
			params["resultSetID"],
			params["apiKey"]
		);
		
		const { tweets } = title;

		let id: string = "RT-" + randomUUID();
		const d = new Date();

		const { data } = await clientV2.get("tweets", { ids: tweets });

		let twts= "";
		  for(let tweet in data){
			twts += " " + data[tweet].text;
		  }

		let sText: string = "";
	
		if (process.env.NODE_ENV === "production") {
			//	Summarizing text
			const lambdaParams = {
				FunctionName: "text-summarisation-dev-summarise",
				InvocationType: "RequestResponse",
				Payload: JSON.stringify({ 
					text: twts,
					min: 100,
					max: 200
				})
			};

			const responseTS = await lambda.invoke(lambdaParams, function(data, err) {
				if (err) {
					console.log(err);
				} else {
					console.log(data);
				}
			}).promise();
			sText =  JSON.parse(JSON.parse(responseTS.Payload.toLocaleString()).body).text;
		} else {
			sText = "This is a test text";
		}
		
		// Adding blocks
		let x = -1;
		tweets.map(async (tweet) => {
			await ServicesLayer.reportBlockService.addReportBlock({
				reportBlockID: `BK-${randomUUID()}`,
				reportID: id,
				blockType: "TWEET",
				position: (x += 2),
				tweetID: tweet
			});
		});

		const report = await ServicesLayer.reportService.addReport({
			reportID: id,
			resultSetID: params["resultSetID"],
			status: "DRAFT",
			title: title.searchPhrase,
			apiKey: params["apiKey"],
			dateCreated: d.toString(),
			author: params["author"]
		});

		const tb = `BK-${randomUUID()}`;
		await ServicesLayer.reportBlockService.addReportBlock({
			reportBlockID: tb,
			reportID: id,
			blockType: "RICHTEXT",
			position: 0,
			richText: sText
		});

		const sid = `ST-${randomUUID()}`;
		await ServicesLayer.textStyleService.addStyle({
			textStylesID: sid,
			reportBlockID: tb,
			align: " text-left",
			bold: " font-bold",
			colour: " text-black",
			italic: "",
			size: " text-xs"
		});


		return { Report: report, summarisedText: sText };
	}
}
