import * as AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();
const api = new AWS.