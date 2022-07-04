import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Creator from "@model/creator/creator.model";

export default class CreatorService {

    private TableName: string = "CreatorTable";

    constructor(private docClient: DocumentClient) { }

    async getAllCreators(): Promise<Creator[]> {
        const creator = await this.docClient.scan({
            TableName: this.TableName,
        }).promise()
        return creator.Items as Creator[];
    }

    async addCreator(creator: Creator): Promise<Creator> {

        if (!creator) {
            throw new Error("no new creator provided");
        }
        await this.docClient.put({
            TableName: this.TableName,
            Item: creator
        }).promise()
        return creator as Creator;
    }

    async getCreator(email : string): Promise<Creator> {
            const result = await this.docClient.query({
                TableName: this.TableName,
                IndexName: "gsiIndex",
                KeyConditionExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ":email": email
                },
            }).promise();
            
            return result.Items[0] as Creator;
    }    

    async getCreatorByKey(key: String): Promise<Creator> {
        const creator = await this.docClient.query({
            TableName: this.TableName,
            KeyConditionExpression: "apiKey = :key",
            ExpressionAttributeValues: {
                ":key": key
            }
        }).promise();

        return creator.Items[0] as Creator;
    }

}