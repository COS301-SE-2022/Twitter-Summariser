import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Permission from "@model/permission/permissions.model"

export default class PermissionService {
    private TableName: string = "PermissionsTable";
    constructor (private docClient: DocumentClient) {}

    async getPermission(id: string, key: string): Promise<Permission> {
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

    async getPermissions(key: string): Promise<Permission[]> {
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

    async updatePermission(id: string, key: string, perm: string): Promise<Permission> {
        const result = await this.docClient.update({
            TableName: this.TableName,
            Key: {
                "reportID": id,
                "apiKey": key
            },
            UpdateExpression: "SET type = :type",
            ExpressionAttributeValues: {
                ":type": perm
            }
        }).promise();

        return result.Attributes as Permission;
    }

    async deletePermission(id: string, key: string) {
        await this.docClient.delete({
            TableName: this.TableName,
            Key: {
                "reportID": id,
                "apiKey": key
            }
        }).promise();
    }

}