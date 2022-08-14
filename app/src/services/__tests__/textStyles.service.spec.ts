import TextStyle from "@model/textStyles/textStyles.model";
import TextStyleService from "..";

import { DocumentClient, awsSdkPromiseResponse } from "../../__mocks__/aws-sdk";

const db = new DocumentClient();

describe("textStyles.service", () => {
	beforeAll(() => {
		jest.useFakeTimers("modern");
		jest.setSystemTime(new Date(2022, 1, 1));
	});

	beforeEach(() => {
		awsSdkPromiseResponse.mockReset();
	});

	describe("getTextStyle", () => {
		test("Get Text Styles", async () => {
			const addedTextStyles: TextStyle = {
				textStylesID: "4111",
				reportBlockID: "700",
				align: "center",
				bold: "no",
				colour: "black",
				italic: "yes",
				size: "12pt"
			};

			awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Items: addedTextStyles }));

			const textStyle = await TextStyleService.textStyleService.getStyle("700");

			expect(db.query).toHaveBeenCalledWith({
				TableName: "TextStylesTable",
				IndexName: "textStylesIndex",
				KeyConditionExpression: "reportBlockID = :reportBlockID",
				ExpressionAttributeValues: {
					":reportBlockID": "700"
				}
			});

			const expected = {
				textStylesID: "4111",
				reportBlockID: "700",
				align: "center",
				bold: "no",
				colour: "black",
				italic: "yes",
				size: "12pt"
			};

			expect(textStyle).toEqual(expected);
		});
	});

	describe("addStyle", () => {
		test("add Text Style", async () => {
			const textStyle: TextStyle = {
				textStylesID: "4111",
				reportBlockID: "700",
				align: "center",
				bold: "no",
				colour: "black",
				italic: "yes",
				size: "12pt"
			};

			await TextStyleService.textStyleService.addStyle(textStyle);

			expect(db.put).toHaveBeenCalledWith({
				TableName: "TextStylesTable",
				Item: textStyle
			});
		});
	});
});
