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

    describe("addReport", () => {
        test("Add Report", async () => {
            const report: Report = {
                reportID: "1111",
                resultSetID: "12222",
                apiKey: "ABdggekj23",
                dateCreated: new Date(2022, 1, 1),
                title: "This is my report",
                author: "Test"
            };

            await ReportService.reportService.addReport(report);
            expect(db.put).toHaveBeenCalledWith({TableName: "ReportTable", Item: report})
        })
    })
})