import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Permission from "@model/permission/permissions.model"

export default class PermissionService {
    private TableName: string = "PermissionsTable";
    constructor (private docClient: DocumentClient) {}

    async getPermission(id: String, key: String): Promise<Permission> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: {"reportID": id, "apiKey": key}
        }).promise();

        return result.Item as Permission;
    }

    async addPermission(permission: Permission): Promise<Permission> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: permission
        }).promise();

        return permission as Permission
    }

    async getPermissions(key: String): Promise<Permission[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "permissionIndex",
            KeyConditionExpression: "apiKey = :apiKey",
            ExpressionAttributeValues: {
                ":apiKey": key
            }
        }).promise();

        return result.Items as Permission[];
    }
}