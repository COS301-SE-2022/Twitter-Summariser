import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

// function for writing and editing text on textBox
export const editBlock = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			let text: any;
			let styles: any;

			if (
				!(await ServicesLayer.permissionService.verifyEditor(
					params.reportID,
					params.apiKey
				)) &&
				!(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey))
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Don't have enough permissions to edit this report.")
				};
			}

			if (params.reportBlockID === undefined) {
				const id = `BK-${randomUUID()}`;
				text = await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: id,
					reportID: params.reportID,
					blockType: "RICHTEXT",
					position: params.position,
					richText: params.text
				});
				const sid = `ST-${randomUUID()}`;
				styles = await ServicesLayer.textStyleService.addStyle({
					textStylesID: sid,
					reportBlockID: id,
					align: params.textStyle.Align,
					bold: params.textStyle.Bold,
					colour: params.textStyle.Color,
					italic: params.textStyle.Italic,
					size: params.textStyle.Size
				});
			} else {
				text = await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: params.reportBlockID,
					reportID: params.reportID,
					blockType: "RICHTEXT",
					position: params.position,
					richText: params.text
				});
				styles = await ServicesLayer.textStyleService.addStyle({
					textStylesID: params.styleID,
					reportBlockID: params.reportBlockID,
					align: params.textStyle.Align,
					bold: params.textStyle.Bold,
					colour: params.textStyle.Color,
					italic: params.textStyle.Italic,
					size: params.textStyle.Size
				});
			}

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ text, styles })
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);

// function for writing and editing text on textBox
export const deleteReportBlock = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (
				!(await ServicesLayer.permissionService.verifyEditor(
					params.reportID,
					params.apiKey
				)) &&
				!(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey))
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Don't have enough permissions to edit this report.")
				};
			}

			const blck = await ServicesLayer.reportBlockService.getReportBlock(
				params.reportBlockID
			);

			if (blck.blockType === "TWEET") {
				const report = await ServicesLayer.reportBlockService.getReportBlocks(
					blck.reportID
				);
				
				const r = await ServicesLayer.reportService.getReport(params.reportID); 
				
				await ServicesLayer.reportService.updateReportBlockNum((r.blockNumber)-1, params.reportID);
				
				let top = null;
				let bottom = null;
				report.map(async (block) => {
					if (block.position === blck.position - 1) {
						top = block;
					} else if (block.position === blck.position + 1) {
						bottom = block;
					}

					if (block.position > blck.position) {
						block.position = block.position - 2;
						await ServicesLayer.reportBlockService.addReportBlock(block);
					}
				});

				if (top !== undefined && bottom != undefined) {
					await ServicesLayer.reportBlockService.addReportBlock({
						reportBlockID: top.reportBlockID,
						reportID: top.reportID,
						blockType: "RICHTEXT",
						position: top.position,
						richText: top.richText + "\n\n" + bottom.richText
					});
					await ServicesLayer.reportBlockService.deleteReportBlock(params.reportBlockID);
					await ServicesLayer.reportBlockService.deleteReportBlock(bottom.reportBlockID);
				} else {
					await ServicesLayer.reportBlockService.deleteReportBlock(params.reportBlockID);
				}
			} else {
				await ServicesLayer.reportBlockService.deleteReportBlock(params.reportBlockID);
			}

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify("Operation Successful")
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
				headers: header,
				body: JSON.stringify(e)
			};
		}
	}
);
