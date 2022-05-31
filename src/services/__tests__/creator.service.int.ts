jest.unmock("aws-sdk");

import {CreateTableInput, DeleteTableInput} from "aws-sdk/clients/dynamodb";
import CreatorService from "../creator.service";
import {DynamoDB} from "aws-sdk";
import dynamoDBClient from "@model/database";

const dynamoDb : DynamoDB = new DynamoDB({ ... dynamoDBClient()});

describe("creator.service", () => {
    beforeAll(async () => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2021, 1, 08));

        const params: CreateTableInput = {
            TableName: "CreatorTable",
            AttributeDefinitions: [{
                AttributeName: "apiKey",
                AttributeType: "S"
            },
            {
                AttributeName: "email",
                AttributeType: "S"
            }],
            KeySchema: [{
                AttributeName: "apiKey",
                KeyType: "HASH"
            },
            {   
                AttributeName: "email",
                KeyType: "RANGE"
            }],
            GlobalSecondaryIndexes: [{
                IndexName: "gsiIndex",
                KeySchema: [{
                    AttributeName: "email",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "apiKey",
                    KeyType: "RANGE"
                }],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    })
})