import * as AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();
const api = new AWS.APIGateway();
const s3 = new AWS.S3();

export { dynamoDB, lambda, api, s3 };
