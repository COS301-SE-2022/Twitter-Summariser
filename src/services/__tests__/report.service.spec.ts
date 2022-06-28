
import Report from "@model/report/report.model";
import ReportService from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

const db = new DocumentClient();

describe("report.service", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 1, 1));
    });

    beforeEach(() => {
        awsSdkPromiseResponse.mockReset();
    });

    describe("getReport", () => {
        test("Get Report", async () => {
            const addedReport: Report = {
                reportID: "1111",
                resultSetID: "12222",
                status: "DRAFT",
                apiKey: "ABdggekj23",
                dateCreated: "2022-01-01",
                title: "This is my report",
                author: "Test"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Item: addedReport}));

            const report = await ReportService.reportService.getReport("1111");

            expect(db.get).toHaveBeenCalledWith({
                TableName: "ReportTable",
                Key: { "reportID": "1111"}
            });

            const expected = {
                reportID: "1111",
                resultSetID: "12222",
                status: "DRAFT",
                apiKey: "ABdggekj23",
                dateCreated: "2022-01-01",
                numOfBlocks: 0,
                title: "This is my report",
                author: "Test",
                Report: []
            }

            expect(report).toEqual(expected);
        })

        test("Get item from empty table", async () => {
            expect.assertions(1);

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve(undefined));

            try {
                await ReportService.reportService.getReport("1111");
            } catch (e) {
                expect(e.message).toBe("report with id: 1111 does not exist");
            }
        })

        test("Test does not exist", async () => {
            const addedReport: Report = {
                reportID: "1111",
                resultSetID: "12222",
                status: "DRAFT",
                apiKey: "ABdggekj23",
                dateCreated: "2022-01-01",
                title: "This is my report",
                author: "Test"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({Item: addedReport}));

            try {
                await ReportService.reportService.getReport("1112");
            } catch (e) {
                expect(e.message).toBe("report with id: 1111 does not exist");
            }

        })
    })

    describe("addReport", () => {
        test("Add Report", async () => {
            const report: Report = {
                reportID: "1111",
                resultSetID: "12222",
                status: "DRAFT",
                apiKey: "ABdggekj23",
                dateCreated: "2022-01-01",
                title: "This is my report",
                author: "Test"
            };

            await ReportService.reportService.addReport(report);
            expect(db.put).toHaveBeenCalledWith({TableName: "ReportTable", Item: report})
        })
    })
}) 