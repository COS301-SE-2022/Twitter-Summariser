import Creator from "@model/creator/creator.model";
import CreatorServices from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk"

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
            const test : Creator = {
                apiKey: "njksea",
                email: "test@gmail.com",
                username: "test",
                password: "password",
                dateOfBirth: "2002-01-08",
                dateRegistered: "2022-01-01T00:00:00.000Z"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Item: test}));

            const creator: Creator = await CreatorServices.creatorService.getCreator("test@gmail.com");
            expect(db.get).toHaveBeenCalledWith({
                TableName: "CreatorTable",
                Key: {
                    PK: "njksea",
                    SK: "test@gmail.com"
                }
            });

            expect(creator).toEqual(test);
        
        })

        /*
        describe("on error", () => {
            it("should throw an error if the item not found in the db", () => {
                const email = "unitTest@gmail.com";

                awsSdkPromiseResponse.mockResolvedValueOnce({Item: undefined});

                return expect(CreatorServices.creatorService.getCreator(email)).rejects.toThrowError(
                    "creator unitTest@gmail.com does not exist"
                );
            });
        });

        describe("on success", () => {
            it("should return right dto", () => {
                const email = "test@gmail.com";
                const creator: Creator = {
                    apiKey: "ABDefzf",
                    email: "test@gmail.com",
                    username: "test",
                    password: "password",
                    dateOfBirth: "2002/01/02",
                    dateRegistered: "2022-01-01T00:00:00.000Z"
                }

                awsSdkPromiseResponse.mockResolvedValueOnce(Promise.resolve({Item: creator}));
                expect(db.get).toHaveBeenCalledWith({TableName: 'CreatorTable'})
                return expect(CreatorServices.creatorService.getCreator(email)).resolves.toEqual(creator);
            });
        }) ;
        */

    });
})