import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
    if (process.env.STAGE==='dev') {
        return new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000",
            accessKeyId: 'DEFAULT_ACCESS_KEY',
            secretAccessKey: 'DEFAULT_SECRET'
        });
    }
    return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient;
