jest.unmock("aws-sdk");

import {CreateTableInput, DeleteTableInput} from "aws-sdk/clients/dynamodb";
import CreatorServices from "..";
import {DynamoDB} from "aws-sdk";
import dynamoDBClient from "@model/database";
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

    describe("getCreator", () => {
        describe("on error", () => {
            it("should throw an error if no item is found in the database", () => {
                const email = "test@yahoo.com";
                const password = "password";

                return expect(CreatorServices.creatorService.getCreator(email, password)).rejects.toThrowError(
                    "creator not found"
                );
            });
        });

        describe("on success", () => {
            it("should return the correct creator", async () => {
                const creator : Creator= {
                    apiKey: "AbcDwu9dgfv",
                    username: "test",
                    email: "test@yahoo.com",
                    password: "password",
                    dateOfBirth: "2002/01/08",
                    dateRegistered: "2021-01-08T00:00:00.000Z"
                };

                await CreatorServices.creatorService.addCreator(creator);
            
                return expect(CreatorServices.creatorService.getCreator(creator.email, creator.password)).resolves.toMatchInlineSnapshot(`
                    Object {
                        "apiKey": "AbcDwu9dgfv",
                        "email": "test@yahoo.com",
                        "username": "test"
                    }
                `);
            });
        });
    });

    describe("addCreator", () => {
        describe("on error", () => {
            it("should throw an error if no creator is provided", () => {
                const creator = null;

                return expect(CreatorServices.creatorService.addCreator(creator)).rejects.toThrowError(
                    "no new creator provided"
                );
            });
        });

        describe("on success", () => {
            it("should create and return the correct creator", async () => {
                const creator : Creator= {
                    apiKey: "AbzDwu9dYfv",
                    username: "testAdd",
                    email: "testAdd@yahoo.com",
                    password: "passwordAdd",
                    dateOfBirth: "2002/02/08",
                    dateRegistered: "2021-01-08T00:00:00.000Z"
                };

                return expect(CreatorServices.creatorService.addCreator(creator)).resolves.toMatchInlineSnapshot(`
                    Object {
                        "apiKey": "AbzDwu9dYfv",
                        "email": "testAdd@yahoo.com",
                        "username": "testAdd"
                    }
                `);
            });
        });
    });
    
});