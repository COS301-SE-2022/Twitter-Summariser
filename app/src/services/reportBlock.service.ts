import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ReportBlock from "@model/reportBlock/reportBlock.model";

export default class ReportBlockService {
	private TableName = "ReportBlockTable";

	constructor(private docClient: DocumentClient) {}

	async getReportBlock(reportBlockID: string): Promise<ReportBlock> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: { reportBlockID: reportBlockID }
			})
			.promise();

		return result.Item as ReportBlock;
	}

	async getReportBlocks(key: string): Promise<ReportBlock[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "reportBlockIndex",
				KeyConditionExpression: "reportID = :reportID",
				ExpressionAttributeValues: {
					":reportID": key
				}
			})
			.promise();

		if (result === undefined) return [] as ReportBlock[];

		const blocks = result.Items as ReportBlock[];
		this.sortReportBlocks(blocks);

		return blocks as ReportBlock[];
	}

	async addReportBlock(reportBlock: ReportBlock): Promise<ReportBlock> {
		await this.docClient
			.put({
				TableName: this.TableName,
				Item: reportBlock
			})
			.promise();

		return reportBlock as ReportBlock;
	}

	async deleteReportBlock(id: string) {
		await this.docClient
			.delete({
				TableName: this.TableName,
				Key: { reportBlockID: id }
			})
			.promise();
	}

	async updatePosition(id: string, position: number) {
		await this.docClient
			.update({
				TableName: this.TableName,
				Key: {
					reportBlockID: id
				},
				UpdateExpression: "SET #position = :position",
				ExpressionAttributeValues: {
					":position": position
				},
				ExpressionAttributeNames: {
					"#position": "position"
				}
			})
			.promise();
	}

	async sortReportBlocks(reportBlocks: ReportBlock[]): Promise<ReportBlock[]> {
		this;
		reportBlocks.sort((a, b) => {
			if (a.position > b.position) return 1;
			if (a.position < b.position) return -1;
			return 0;
		});
		return reportBlocks;
	}
}
