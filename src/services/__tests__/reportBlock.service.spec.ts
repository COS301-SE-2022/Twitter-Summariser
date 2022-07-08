import ReportBlock from "@model/reportBlock/reportBlock.model";
import ReportBlockService from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

const db = new DocumentClient();

describe("reportBlock.service", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date(2022, 1, 1));
    });

    beforeEach(() => {
        awsSdkPromiseResponse.mockReset();
    });


    describe("getReportBlock", () => {
        test("Get Report Block",async () => {
            const addedReportBlock: ReportBlock = {
                reportBlockID: "9000",
                reportID: "1111",
                blockType: "RICHTEXT",
                position: 0,
                richText: "Testing"
            };

            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedReportBlock }));

            const reportBlock = await ReportBlockService.reportBlockService.getReportBlock("9000");

            expect(db.get).toHaveBeenCalledWith({
                TableName: "ReportBlockTable",
                Key: { id: "9000" }
            });

            const expected = {
                reportBlockID: "9000",
                reportID: "1111",
                blockType: "RICHTEXT",
                position: 0,
                richText: "Testing"
            };

            expect(reportBlock).toEqual(expected);

        })
    });

    describe("addReportBlock", () => {
        test("Add Report Block", async () => {
            const reportBlock: ReportBlock = {
                reportBlockID: "9000",
                reportID: "1111",
                blockType: "RICHTEXT",
                position: 0,
                richText: "Testing"
            };

            await ReportBlockService.reportBlockService.addReportBlock(reportBlock);
            
            expect(db.put).toHaveBeenCalledWith({
                TableName: "ReportBlockTable",
                Item: reportBlock
            })
        })
    })


})