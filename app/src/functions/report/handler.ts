import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";
import TextStyle from "@model/textStyles/textStyles.model";

// Generation of reports
export const generateReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			const title = await ServicesLayer.resultSetServices.getResultSet(
				params.resultSetID,
				params.apiKey
			);
			const { tweets } = title;

			let id: string;
			id = "RT-";
			id += randomUUID();
			const dd = new Date();
			const d = new Date(`${dd.toLocaleString()}-02:00`);

			// Adding blocks
			let x = -1;
			tweets.map(async (tweet) => {
				await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: `BK-${randomUUID()}`,
					reportID: id,
					blockType: "TWEET",
					position: (x += 2),
					tweetID: tweet
				});
				// x += 2;
			});

			const report = await ServicesLayer.reportService.addReport({
				reportID: id,
				resultSetID: params.resultSetID,
				status: "DRAFT",
				title: title.searchPhrase,
				apiKey: params.apiKey,
				dateCreated: d.toString(),
				author: params.author
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ Report: report })
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

// Retrieval of user draft reports
export const getAllMyDraftReports = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			const reports = await ServicesLayer.reportService.getDraftReports(params.apiKey);

			reports.map((report) => {
				delete report.apiKey;
			});
			
			// const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(reports)
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

// Retrieval of Published reports
export const getAllPublishedReports = middyfy(async (): Promise<APIGatewayProxyResult> => {
	try {
		const reports = await ServicesLayer.reportService.getAllPublishedReports();

		return {
			statusCode: statusCodes.Successful,
			headers: header,
			body: JSON.stringify(reports)
		};
	} catch (e) {
		return {
			statusCode: statusCodes.internalError,
			headers: header,
			body: JSON.stringify(e)
		};
	}
});

// clone report function
export const cloneReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			// Getting report copy
			const report = await ServicesLayer.reportService.getReportHelper(params.reportID);
			const oldReportId = report.reportID;

			if (
				!(await ServicesLayer.permissionService.verifyReportRetr(
					report.status,
					params.apiKey,
					report.reportID
				)) &&
				!(await ServicesLayer.reportService.verifyOwner(oldReportId, params.apiKey))
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("not authorised to clone this report")
				};
			}

			// Cloning report
			let id: string;
			id = "RT-";
			id += randomUUID();

			const dd = new Date();
			const d = new Date(`${dd.toLocaleString()}-02:00`);

			report.reportID = id;
			report.title = "Copy of " + report.title;
			report.apiKey = params.apiKey;
			report.author = params.author;
			report.status = "DRAFT";
			report.dateCreated = d.toString();

			await ServicesLayer.reportService.addReport(report);

			// Getting blocks
			const blocks = await ServicesLayer.reportBlockService.getReportBlocks(oldReportId);

			blocks.map(async (block) => {
				const temp = { ...block };
				temp.reportID = id;
				temp.reportBlockID = `BK-${randomUUID()}`;

				// Cloning blocks
				if (block.blockType === "RICHTEXT") {
					// Cloning Text
					temp.richText = block.richText;

					// Cloning styles
					let style: TextStyle;
					await ServicesLayer.textStyleService
						.getStyle(block.reportBlockID)
						.then((value) => {
							style = value[0];
						});

					style.textStylesID = `ST-${randomUUID()}`;
					style.reportBlockID = temp.reportBlockID;
					await ServicesLayer.textStyleService.addStyle(style);
				} else {
					// Cloning Tweet
					temp.tweetID = block.tweetID;
				}

				await ServicesLayer.reportBlockService.addReportBlock(temp);
				return temp;
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(report)
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

// Share report
export const shareReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				const shareTo = await ServicesLayer.creatorService.getCreator(params.email);
				if (shareTo !== undefined) {
					await ServicesLayer.permissionService.addPermission({
						apiKey: shareTo.apiKey,
						reportID: params.reportID,
						type: params.type
					});
				} else {
					return {
						statusCode: statusCodes.Successful,
						headers: header,
						body: JSON.stringify("User is not found within system.")
					};
				}
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Only report owner can share a report.")
				};
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

// Get report function
export const getReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			let report: any = await ServicesLayer.reportService.getReportHelper(params.reportID);

			if (
				!(await ServicesLayer.permissionService.verifyReportRetr(
					report.status,
					params.apiKey,
					report.reportID
				)) &&
				!(await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey))
			) {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("not authorised to edit this report")
				};
			}

			const per = await ServicesLayer.permissionService.getPermission(
				params.reportID,
				params.apiKey
			);

			report = await ServicesLayer.reportService.getReport(params.reportID);

			if (per !== undefined) {
				report.permission = per.type;
			} else if (ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				report.permission = "OWNER";
			} else {
				report.permission = "VIEWER";
			}

			delete report.apiKey;

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ report })
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

// Pubishing of reports
export const publishReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				await ServicesLayer.reportService.updateReportStatus("PUBLISHED", params.reportID);
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Only owner can publish a report.")
				};
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

// Unpubishing of reports
export const unpublishReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				await ServicesLayer.reportService.updateReportStatus("DRAFT", params.reportID);
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Only owner can unpublish a report")
				};
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

// Deleting a report
export const deleteReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				await ServicesLayer.reportService.updateReportStatus("DELETED", params.reportID);
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Only owner can delete a report")
				};
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

// get share report
export const getSharedReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const re = await ServicesLayer.reportService.getSharedReports(params.apiKey);

			re.map(async (report) => {
				delete report.apiKey;
				delete report.resultSetID;
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(re)
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

// Adding a custom tweet
export const getAllMyPublishedReports = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const reports = await ServicesLayer.reportService.getPublishedReports(params.apiKey);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(reports)
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
