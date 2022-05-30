import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Creator from "../model/creator.model";

import * as bcrypt from 'bcryptjs';

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

   async getCreator(email : string, password: string): Promise<Creator> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "gsiIndex",
            KeyConditionExpression: 'email = :email',
            
            ExpressionAttributeValues: {
                ":email": email
            },
            
            
        }).promise();
        console.log(result);
        const creator=result.Items[0];

        if (creator===undefined) return null;

        if (await bcrypt.compare(password, result.Items[0].password)===true) {
            return creator as Creator;
        } else return null;
        
        // return result.Items[0] as Creator;
   }    


}