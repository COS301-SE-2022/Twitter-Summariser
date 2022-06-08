import Creator from "@model/creator/creator.model";
import CreatorServices from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

import * as bcrypt from 'bcryptjs';

const db = new DocumentClient();

describe("creator.service", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 1, 1));
    });

    beforeEach(() => {
        awsSdkPromiseResponse.mockReset();
    });

    
    describe("getCreator", () => {

        test("Save Creator", async () => {
            const hashed = bcrypt.hashSync("password", 10);

            const test : Creator = {
                apiKey: "njksea",
                email: "test@gmail.com",
                username: "test",
                password: hashed,
                dateOfBirth: "2002-01-08",
                dateRegistered: "2022-01-01T00:00:00.000Z"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Items: [test]}));

            const creator: Creator = await CreatorServices.creatorService.getCreator("test@gmail.com", "password");
            
            expect(db.query).toHaveBeenCalledWith({
                TableName: "CreatorTable",
                IndexName: "gsiIndex",
                KeyConditionExpression: 'email = :email',
                ExpressionAttributeValues: {
                    ':email': 'test@gmail.com'
                }
            });

            expect(creator).toEqual(test);
        
        })

        
    });
    

    describe("addCreator", () => {
        test("Add Creator", async () => {
            const creator : Creator = {
                apiKey: "njksea",
                email: "test@gmail.com",
                username: "test",
                password: "password",
                dateOfBirth: "2002-01-08",
                dateRegistered: "2022-01-01T00:00:00.000Z"
            };

            await CreatorServices.creatorService.addCreator(creator);
            expect(db.put).toHaveBeenCalledWith({TableName: "CreatorTable", Item: creator})
        })
    })
})