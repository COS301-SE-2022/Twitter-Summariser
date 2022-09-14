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

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedReport }));

			const report = await ReportService.reportService.getReport("1111");

			expect(db.get).toHaveBeenCalledWith({
				TableName: "ReportTable",
				Key: { reportID: "1111" }
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
			};

			expect(report).toEqual(expected);
		});

		test("Get item from empty table", async () => {
			expect.assertions(1);

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve(undefined));

			try {
				await ReportService.reportService.getReport("1111");
			} catch (e) {
				expect(e.message).toBe("report with id: 1111 does not exist");
			}
		});

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

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: addedReport }));

			try {
				await ReportService.reportService.getReport("1112");
			} catch (e) {
				expect(e.message).toBe("report with id: 1111 does not exist");
			}
		});
	});

	describe("getReports", () => {
		test("Get Reports", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			const reports = await ReportService.reportService.getReports("ABdggekj23");

			expect(db.query).toHaveBeenCalledWith({
				TableName: "ReportTable",
				IndexName: "reportIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				ExpressionAttributeValues: {
					":apiKey": "ABdggekj23"
				}
			});

			const expected: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			expect(reports).toEqual(expected);
		});

		test("Get reports from empty table", async () => {
			expect.assertions(1);

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve(undefined));

			try {
				await ReportService.reportService.getReports("ABdggekj23");
			} catch (e) {
				expect(e.message).toBe("no reports found");
			}
		});

		test("Reports don't exist", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABgT78ggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABPlgekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdglIgekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "AJJgekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			try {
				await ReportService.reportService.getReports("ABdggekj23");
			} catch (e) {
				expect(e.message).toBe("report with id: 1111 does not exist");
			}
		});
	});

	describe("getDraftReports", () => {
		test("Get draft reports", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			const reports = await ReportService.reportService.getDraftReports("ABdggekj23");

			expect(db.query).toHaveBeenCalledWith({
				TableName: "ReportTable",
				IndexName: "reportIndex",
				KeyConditionExpression: "apiKey = :apiKey",
				FilterExpression: "#status = :status",
				ExpressionAttributeValues: {
					":apiKey": "ABdggekj23",
					":status": "DRAFT"
				},
				ExpressionAttributeNames: {
					"#status": "status"
				}
			});

			const expected: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			expect(reports).toEqual(expected);
		});
	});

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
			expect(db.put).toHaveBeenCalledWith({ TableName: "ReportTable", Item: report });
		});
	});

	describe("updateStatus", () => {
		test("Update report status", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			await ReportService.reportService.updateReportStatus("PUBLISHED", "1114");

			expect(db.update).toHaveBeenCalledWith({
				TableName: "ReportTable",
				Key: {
					reportID: "1114"
				},
				UpdateExpression: "SET #status = :status",
				ExpressionAttributeNames: {
					"#status": "status"
				},
				ExpressionAttributeValues: {
					":status": "PUBLISHED"
				}
			});
		});
	});

	describe("updateTitle", () => {
		test("Update report title", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			await ReportService.reportService.updateReportTitle("New title", "1114");

			expect(db.update).toHaveBeenCalledWith({
				TableName: "ReportTable",
				Key: {
					reportID: "1114"
				},
				UpdateExpression: "SET #title = :title",
				ExpressionAttributeNames: {
					"#title": "title"
				},
				ExpressionAttributeValues: {
					":title": "New title"
				}
			});
		});
	});

	describe("deleteReport", () => {
		test("Delete report", async () => {
			const addedReports: Report[] = [
				{
					reportID: "1111",
					resultSetID: "12222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my report",
					author: "Test"
				},
				{
					reportID: "1112",
					resultSetID: "12232",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other report",
					author: "Test"
				},
				{
					reportID: "1113",
					resultSetID: "12422",
					status: "PUBLISHED",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other report",
					author: "Test"
				},
				{
					reportID: "1114",
					resultSetID: "13222",
					status: "DRAFT",
					apiKey: "ABdggekj23",
					dateCreated: "2022-01-01",
					title: "This is my other other other report",
					author: "Test"
				}
			];

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedReports }));

			await ReportService.reportService.deleteReport("1113");

			expect(db.delete).toHaveBeenCalledWith({
				TableName: "ReportTable",
				Key: {
					reportID: "1113"
				}
			});
		});
	});
});
