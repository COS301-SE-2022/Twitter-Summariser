import ResultSet from "@model/resultSet/resultSet.model";
import ResultSetService from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

const db = new DocumentClient();

describe("resultSet.service", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 1, 1));
    });

    beforeEach(() => {
        awsSdkPromiseResponse.mockReset();
    });

    describe("getResultSet", () => {

        test("Get Result Set", async () => {
            const testResultSet: ResultSet = {
                id: "1111",
                apiKey: "Gsdds3we52823",
                dateCreated: "2022-01-01",
                searchPhrase: "Test Phrase",
                sortOption: "verifiedLikes",
                filterOption: "byLikes"
            }
    
            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Item: testResultSet}));
    
            const resultSet = await ResultSetService.resultSetServices.getResultSet("1111", "Gsdds3we52823");
            
            expect(db.get).toHaveBeenCalledWith({
                TableName: "ResultSetTable",
                Key: { "apiKey": "Gsdds3we52823", "id": "1111"}
            });
    
            expect(resultSet).toEqual(testResultSet);
        })
        
    })

    describe("addResultSet", () => {
        test("Add Result Set", async () => {
            const resultSet: ResultSet = {
                id: "1111",
                apiKey: "Gsdds3we52823",
                dateCreated: "2022-01-01",
                searchPhrase: "Test Phrase",
                sortOption: "verifiedLikes",
                filterOption: "byLikes"
            }

            await ResultSetService.resultSetServices.addResultSet(resultSet);
            expect(db.put).toHaveBeenCalledWith({TableName: "ResultSetTable", Item: resultSet});
        })
    })
})