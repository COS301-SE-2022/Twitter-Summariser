import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Creator from "../model/creator.model";

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
        await this.docClient.put({
            TableName: this.TableName,
            Item: creator
        }).promise()
        return creator as Creator;
    }

   async getCreator(apiKey : string, email : string): Promise<Creator> {
        const result = await this.docClient.get({
            TableName: this.TableName,
            Key: {apiKey, email}
        }).promise();

        return result.Item as Creator;
   }    
}