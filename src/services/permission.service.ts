import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Permission from "@model/permission/permissions.model";

export default class PermissionService {
	private TableName: string = "PermissionsTable";
	constructor(private docClient: DocumentClient) {}

	async getPermission(id: String, key: String): Promise<Permission> {
		const result = await this.docClient
			.get({
				TableName: this.TableName,
				Key: { reportID: id, apiKey: key }
			})
			.promise();

		return result.Item as Permission;
	}

	async addPermission(permission: Permission): Promise<Permission> {
		await this.docClient
			.put({
				TableName: this.TableName,
				Item: permission
			})
			.promise();

		return permission as Permission;
	}

	// verify report retrieval
	async verifyReportRetr(status: string, apiKey: string, reportID: string): Promise<boolean> {
		this.TableName;
		const per = await this.getPermission(reportID, apiKey);
		if (status !== "PUBLISHED" && per === undefined) {
			return true;
		}
		return false;
	}
}
