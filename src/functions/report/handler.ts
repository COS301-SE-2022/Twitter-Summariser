import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";

// Generation of reports
export const generateReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const tweets = await ServicesLayer.tweetService.getTweets(params.resultSetID);
			const title = await ServicesLayer.resultSetServices.getResultSet(
				params.resultSetID,
				params.apiKey
			);

			// console.log(tweets);

			let id: string;
			id = "RT-";
			id += randomUUID();
			const dd = new Date();
			const d = new Date(`${dd.toLocaleString()}-02:00`);

			let x = -1;
			tweets.map(async (tweet) => {
				await ServicesLayer.reportBlockService.addReportBlock({
					reportBlockID: `BK-${randomUUID()}`,
					reportID: id,
					blockType: "TWEET",
					position: (x += 2),
					tweetID: tweet.tweetId
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

			delete report.apiKey;

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
			const owner = report.apiKey;

			if (
				await ServicesLayer.permissionService.verifyReportRetr(
					report.status,
					params.apiKey,
					report.reportID
				)
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
			report.apiKey = params.apiKey;
			report.author = params.author;
			report.status = "DRAFT";
			report.dateCreated = d.toString();

			await ServicesLayer.reportService.addReport(report);

			// Getting and Cloning blocks
			const blocks = await ServicesLayer.reportBlockService.getReportBlocks(oldReportId);

			blocks.map(async (block) => {
				const temp = { ...block };
				temp.reportID = id;
				temp.reportBlockID = `BK-${randomUUID()}`;

				// Getting and cloning text
				if (temp.blockType === "RICHTEXT") {
					const style = await ServicesLayer.textStyleService.getStyle(
						block.reportBlockID
					)[0];
					style.textStylesID = `ST-${randomUUID()}`;
					style.reportBlockID = temp.reportBlockID;
					await ServicesLayer.textStyleService.addStyle(style);
				}

				await ServicesLayer.reportBlockService.addReportBlock(temp);
				return temp;
			});

			// Cloning result set
			const resultSet = await ServicesLayer.resultSetServices.getResultSet(
				oldReportId,
				owner
			);
			resultSet.apiKey = params.apiKey;
			const oldRSid = resultSet.id;
			resultSet.id = `RS-${randomUUID}`;
			await ServicesLayer.resultSetServices.addResultSet(resultSet);

			// cloning tweets
			const tweets = await ServicesLayer.tweetService.getTweets(oldRSid);
			tweets.map(async (tweet) => {
				tweet.resultSetId = resultSet.id;

				await ServicesLayer.tweetService.addTweet(tweet);
			});

			delete report.apiKey;

			return {
				statusCode: statusCodes.notImplemented,
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
						statusCode: statusCodes.badRequest,
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
				statusCode: statusCodes.notImplemented,
				headers: header,
				body: JSON.stringify("Not Yet done")
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

			const report = await ServicesLayer.reportService.getReport(params.reportID);

			if (
				await ServicesLayer.permissionService.verifyReportRetr(
					report.status,
					params.apiKey,
					report.reportID
				)
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
			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ report: report, permission: per.type })
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
			let report;

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				report = await ServicesLayer.reportService.updateReportStatus(
					"PUBLISHED",
					params.reportID
				);
				delete report.apiKey;
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

// Unpubishing of reports
export const unpublishReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			let result;

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				result = await ServicesLayer.reportService.updateReportStatus(
					"DRAFT",
					params.reportID
				);
				delete result.apiKey;
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
				body: JSON.stringify(result)
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
export const addCustomTweet = middyfy(
	async (/* event: APIGatewayProxyEvent */): Promise<APIGatewayProxyResult> => {
		try {
			// const params = JSON.parse(event.body);

			return {
				statusCode: statusCodes.notImplemented,
				headers: header,
				body: JSON.stringify("Still working on")
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

// Deleting a result set
export const deleteResultSet = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			const result = await ServicesLayer.resultSetServices.deleteResultSet(
				params.resultSetID
			);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(result)
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
export const deleteDraftReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			let report;

			if (await ServicesLayer.reportService.verifyOwner(params.reportID, params.apiKey)) {
				report = await ServicesLayer.reportService.getReport(params.reportID);

				if (report.status === "DRAFT") {
					report = await ServicesLayer.reportService.updateReportStatus(
						"DELETED",
						params.reportID
					);
				} else {
					return {
						statusCode: statusCodes.forbidden,
						headers: header,
						body: JSON.stringify("Only a draft report can be deleted")
					};
				}
			} else {
				return {
					statusCode: statusCodes.unauthorized,
					headers: header,
					body: JSON.stringify("Only owner can delete a draft report")
				};
			}

			delete report.apiKey;

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
