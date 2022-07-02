import { DocumentClient } from "aws-sdk/clients/dynamodb";
import TextStyle from "@model/textStyles/textStyles.model";

export default class TextStyleService {
    private TableName: string = "TextStylesTable";

    constructor (private docClient: DocumentClient) {}

    async getStyle(RBID: string): Promise <TextStyle> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "textStylesIndex",
            KeyConditionExpression: 'reportBlockID = :reportBlockID',
            ExpressionAttributeValues: {
                ":reportBlockID": RBID
            }
        }).promise();

        return result.Items[0] as TextStyle;
    }

    async addStyle(style: TextStyle): Promise<TextStyle> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: style
        }).promise();

        return style as TextStyle;
    }
}