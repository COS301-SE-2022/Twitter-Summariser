import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
    if (process.env.IS_OFFLINE) {
        return new AWS.DynamoDB.DocumentClient({
            region: "local",
            endpoint: "http://localhost:8000",
            accessKeyId: "DEFAULT_ACCESS_KEY",
            secretAccessKey: "DEFAULT_SECRET_KEY"
        });
    }
    return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient;
