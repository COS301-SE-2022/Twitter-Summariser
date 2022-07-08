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

    describe("getReportBlocks", () => {
        test("Get Report Blocks", async () => {
            const addedReportBlocks: ReportBlock[] = [
                {
                    reportBlockID: "9001",
                    reportID: "1111",
                    blockType: "RICHTEXT",
                    position: 7,
                    richText: "Testing"
                },
                {
                    reportBlockID: "9002",
                    reportID: "1111",
                    blockType: "TWEET",
                    position: 0,
                    tweetID: "115752"
                },
                {
                    reportBlockID: "9000",
                    reportID: "1111",
                    blockType: "TWEET",
                    position: 5,
                    tweetID: "124756"
                },
                {
                    reportBlockID: "9007",
                    reportID: "1111",
                    blockType: "RICHTEXT",
                    position: 1,
                    richText: "Testing with sentence"
                }
            ];
            
            awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReportBlocks }));

            const reportBlocks = await ReportBlockService.reportBlockService.getReportBlocks("1111");
            
            expect(db.query).toHaveBeenCalledWith({
                TableName: "ReportBlockTable",
                IndexName: "reportBlockIndex",
                KeyConditionExpression: "reportID = :reportID",
                ExpressionAttributeValues: {
                    ":reportID": "1111"
                }
            });

            
            const expected: ReportBlock[] = [
                {
                    reportBlockID: "9002",
                    reportID: "1111",
                    blockType: "TWEET",
                    position: 0,
                    tweetID: "115752"
                },
                {
                    reportBlockID: "9007",
                    reportID: "1111",
                    blockType: "RICHTEXT",
                    position: 1,
                    richText: "Testing with sentence"
                },
                {
                    reportBlockID: "9000",
                    reportID: "1111",
                    blockType: "TWEET",
                    position: 5,
                    tweetID: "124756"
                },
                {
                    reportBlockID: "9001",
                    reportID: "1111",
                    blockType: "RICHTEXT",
                    position: 7,
                    richText: "Testing"
                }
            ];
            
            expect(reportBlocks).toEqual(expected);
        })
    })

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
            });
        });
    });


})