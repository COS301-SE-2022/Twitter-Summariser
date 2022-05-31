jest.unmock("aws-sdk");

import {CreateTableInput, DeleteTableInput} from "aws-sdk/clients/dynamodb";
import CreatorServices from "..";
import {DynamoDB} from "aws-sdk";
import dynamoDBClient from "@model/database";
import { getAllCreators } from "@functions/creator";
import Creator from "@model/creator/creator.model";

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
        await dynamoDb.createTable(params).promise();
    });

    afterAll(async () => {
        jest.useRealTimers();

        const params: DeleteTableInput = {
            TableName: "CreatorTable"
        };

        await dynamoDb.deleteTable(params).promise();
    });

    describe("getAllCreators", () => {
        describe("on error", () => {
            it ("error should be thrown if no item is found in database", () => {
                return expect(CreatorServices.creatorService.getAllCreators()).rejects.toThrowError(
                    "no records found"
                );
            });
        });

        // describe("on success", () => [
        //     it ("should return correct creator", async () => {
        //         const creator: Creator = {
                    
        //         }
        //     })
        // ])
    })
})