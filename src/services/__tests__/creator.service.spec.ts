import Creator from "@model/creator/creator.model";
import * as bcrypt from "bcryptjs";
import CreatorServices from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";


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
		test("Get Creator", async () => {
			const hashed = bcrypt.hashSync("password", 10);

			const test: Creator = {
				apiKey: "njksea",
				email: "test@gmail.com",
				username: "test",
				password: hashed,
				dateOfBirth: "2002-01-08",
				dateRegistered: "2022-01-01T00:00:00.000Z"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: [test] }));

			const creator: Creator = await CreatorServices.creatorService.getCreator(
				"test@gmail.com"
			);

			expect(db.query).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				IndexName: "gsiIndex",
				KeyConditionExpression: "email = :email",
				ExpressionAttributeValues: {
					":email": "test@gmail.com"
				}
			});

			expect(creator).toEqual(test);
		});

		test("Get item from empty table", async () => {
			expect.assertions(1);

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: [] }));

			const creator: Creator = await CreatorServices.creatorService.getCreator(
				"test@gmail.com"
			);

			expect(creator).toEqual(undefined);
			/*
            try {
                await CreatorServices.creatorService.getCreator("test@gmail.com");
            } catch (e) {
                expect(e.message).toBe("creator test@gmail.com not found");
            }
            */
		});

		/*
        test("Creator does not exist", async () => {


            const test : Creator = {
                apiKey: "njksea",
                email: "test@gmail.com",
                username: "test",
                password: "Password2",
                dateOfBirth: "2002-01-08",
                dateRegistered: "2022-01-01T00:00:00.000Z"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Items: [test]}));

            const creator: Creator = await CreatorServices.creatorService.getCreator("tlholo@gmail.com");
            // console.log(creator);
            expect(creator).toEqual(undefined);
            // const creator: Creator = await CreatorServices.creatorService.getCreator("test2@gmail.com", "password");
            
        })
        */

		/*
        test("Wrong credentials given", async () => {
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

            try {
                await CreatorServices.creatorService.getCreator("test@gmail.com", "password1");
            } catch (e) {
                expect(e.message).toBe("invalid credentials for user test@gmail.com");
            }
        })
        */
	});

	describe("addCreator", () => {
		test("Add Creator", async () => {
			const creator: Creator = {
				apiKey: "njksea",
				email: "test@gmail.com",
				username: "test",
				password: "password",
				dateOfBirth: "2002-01-08",
				dateRegistered: "2022-01-01T00:00:00.000Z"
			};

			await CreatorServices.creatorService.addCreator(creator);
			expect(db.put).toHaveBeenCalledWith({ TableName: "CreatorTable", Item: creator });
		});
	});
});
