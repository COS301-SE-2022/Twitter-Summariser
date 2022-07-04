import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ResultSet from "@model/resultSet/resultSet.model";

export default class ResultSetService {
	private TableName: string = "ResultSetTable";

	constructor(private docClient: DocumentClient) {}

	async getResultSets(key: string): Promise<ResultSet[]> {
		const result = await this.docClient
			.query({
				TableName: this.TableName,
				IndexName: "resultSetIndex",
				KeyConditionExpression: "apiKey = :apiKey",

				ExpressionAttributeValues: {
					":apiKey": key
				}
			})
			.promise();

		return result.Items as ResultSet[];
	}

	async getResultSet(id: string, key: string): Promise<ResultSet> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: {
					id: id,
					apiKey: key
				}
			})
			.promise();

		if (result == undefined) throw new Error("result set with id: " + id + " does not exist.");

		return result.Item as ResultSet;
	}

	async addResultSet(resultSet: ResultSet): Promise<ResultSet> {
		await this.docClient
			.put({
				TableName: this.TableName,
				Item: resultSet
			})
			.promise();

		return resultSet as ResultSet;
	}

	async deleteResultSet(resultSetID: String) {
		await this.docClient
			.delete({
				TableName: this.TableName,
				Key: {
					resultSetID: resultSetID
				}
			})
			.promise();
	}
}
