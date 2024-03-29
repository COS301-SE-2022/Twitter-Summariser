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
				dateRegistered: "2022-01-01T00:00:00.000Z",
				RefreshAccessToken: "",
				profileKey: "assets/profile.png"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: [test] }));

			const creator: Creator = await CreatorServices.creatorService.getCreator(
				"test@gmail.com"
			);

			expect(db.get).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				Key: {
					email: "test@gmail.com"
				}
			});

			expect(creator).toEqual([test]);
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
				dateRegistered: "2022-01-01T00:00:00.000Z",
				RefreshAccessToken: "",
				profileKey: "assets/profile.png"
			};

			await CreatorServices.creatorService.addCreator(creator);
			expect(db.put).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				Item: creator,
				ConditionExpression: "email <> :email",
				ExpressionAttributeValues: {
					":email": "test@gmail.com"
				}
			});
		});
	});

	// describe("getCreatorByKey", () => {
	// 	test("Get Creator by key", async () => {
	// 		const creator: Creator = {
	// 			apiKey: "njksea",
	// 			email: "test@gmail.com",
	// 			username: "test",
	// 			password: "password",
	// 			dateRegistered: "2022-01-01T00:00:00.000Z",
	// 			RefreshAccessToken: "",
	// 			profileKey: "assets/profile.png"
	// 		};

	// 		awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: creator }));

	// 		const r: Creator = await CreatorServices.creatorService.getCreatorByKey(
	// 			"njksea"
	// 		);

	// 		expect(db.query).toHaveBeenCalledWith({
	// 			TableName: "CreatorTable",
	// 			IndexName: "gsiIndex",
	// 			KeyConditionExpression: "apiKey = :key",
	// 			ExpressionAttributeValues: {
	// 				":key": "njksea"
	// 			}
	// 		});

	// 		expect(r).toEqual([creator]);
	// 	});
	// });

	describe("updateCreator", () => {
		test("Update Creator", async () => {
			const creator: Creator = {
				apiKey: "njksea",
				email: "test@gmail.com",
				username: "test",
				password: "password",
				dateRegistered: "2022-01-01T00:00:00.000Z",
				RefreshAccessToken: "",
				profileKey: "assets/profile.png"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: [creator] }));
			const email = "test@gmail.com";
			const token = "token";

			await CreatorServices.creatorService.updateCreator(email, token);
			expect(db.update).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				Key: {
					email
				},
				UpdateExpression: "set #RefreshAccessToken = :RefreshAccessToken",
				ExpressionAttributeNames: {
					"#RefreshAccessToken": "RefreshAccessToken"
				},
				ExpressionAttributeValues: {
					":RefreshAccessToken": token
				}
			});
		});
	});

	describe("updateProfile", () => {
		test("Update Profile", async () => {
			const creator: Creator = {
				apiKey: "njksea",
				email: "test@gmail.com",
				username: "test",
				password: "password",
				dateRegistered: "2022-01-01T00:00:00.000Z",
				RefreshAccessToken: "",
				profileKey: "assets/profile.png"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: [creator] }));
			const email = "test@gmail.com";
			const key = "test.png";

			await CreatorServices.creatorService.updateProfileKey(email, key);
			expect(db.update).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				Key: {
					email
				},
				UpdateExpression: "set #profileKey = :profileKey",
				ExpressionAttributeNames: {
					"#profileKey": "profileKey"
				},
				ExpressionAttributeValues: {
					":profileKey": key
				}
			});
		});
	});

	describe("deleteCreator", () => {
		test("Delete Creator", async () => {
			const email = "test@gmail.com";

			await CreatorServices.creatorService.deleteCreator(email);
			expect(db.delete).toHaveBeenCalledWith({
				TableName: "CreatorTable",
				Key: {
					email
				}
			});
		});
	});
});
