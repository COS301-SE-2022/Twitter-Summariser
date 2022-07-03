import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Permisssions from "@model/permissions/permissions.model"

export default class PermissionsService {
    private TableName: string = "PermissionsTable";
    constructor (private docClient: DocumentClient) {}

    async getPermission(id: String, key: String): Promise<Permisssions> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: {"reportID": id, "apiKey": key}
        }).promise();

        return result.Item as Permisssions;
    }
}