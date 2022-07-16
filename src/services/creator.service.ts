import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Creator from "@model/creator/creator.model";

export default class CreatorService {
    private TableName = "CreatorTable";

    constructor(private docClient: DocumentClient) { }

    async getAllCreators(): Promise<Creator[]> {
        const creator = await this.docClient
            .scan({
                TableName: this.TableName
            })
            .promise();
        return creator.Items as Creator[];
    }

    async addCreator(creator: Creator): Promise<Creator> {
        if (!creator) {
            throw new Error("no new creator provided");
        }
        await this.docClient
            .put({
                TableName: this.TableName,
                Item: creator,
                ConditionExpression: "email <> :email",
                ExpressionAttributeValues: {
                    ":email": creator.email
                }
            })
            .promise();
        return creator as Creator;
    }

    async getCreator(email: string): Promise<Creator> {
        const result = await this.docClient
            .get({
                TableName: this.TableName,
                Key: {
                    email
                }
            })
            .promise();

        return result.Item as Creator;
    }

    async getCreatorByKey(key: string): Promise<Creator> {
        const creator = await this.docClient
            .query({
                TableName: this.TableName,
                IndexName: "gsiIndex",
                KeyConditionExpression: "apiKey = :key",
                ExpressionAttributeValues: {
                    ":key": key
                }
            })
            .promise();

        return creator.Items[0] as Creator;
    }

    async updateCreator(email: string, token: string): Promise<boolean> {
        return this.docClient
            .update({
                TableName: this.TableName,
                Key: {
                    email
                },
                UpdateExpression: "set #RefreshAccessToken = :RefreshAccessToken",
                ExpressionAttributeNames: {
                    "#RefreshAccessToken": "RefreshAccessToken"
                },
                ExpressionAttributeValues: {
                    ":RefreshAccessToken": token
                }
            })
            .promise()
            .then(() => true)
            .catch((err) => err);
    }
}
