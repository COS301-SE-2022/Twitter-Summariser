import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Lambda } from "aws-sdk";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";
import TextStyle from "@model/textStyles/textStyles.model";
import Notification from "@model/notification/notification.model";
import { clientV2 } from "@functions/resources/twitterV2.client";

const lambda = new Lambda();

// Generation of reports
export const generateReport = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			let params;
			if (event.apiKey) params = event;
			else if (event.body.apiKey) params = event.body;
			else params = JSON.parse(event.body);

			const title = await ServicesLayer.resultSetServices.getResultSet(
				params["resultSetID"],
				params["apiKey"]
			);

			const { tweets } = title;

			let id: string = "RT-" + randomUUID();
			const d = new Date();

			const { data } = await clientV2.get("tweets", { ids: tweets });

			let twts = "";
			for (let tweet in data) {
				twts += " " + data[tweet].text;
			}

			let sText: string = "";

			if (process.env.NODE_ENV === "development") {
				sText = "This is test text";
			} else {
				//	Summarizing text
				const lambdaParams = {
					FunctionName: "text-summarisation-dev-summarise",
					InvocationType: "RequestResponse",
					Payload: JSON.stringify({
						text: twts,
						min: 100,
						max: 200
					})
				};

				const responseTS = await lambda
					.invoke(lambdaParams, function (data, err) {
						if (err) {
							console.log(err);
						} else {
							console.log(data);
						}
					})
					.promise();
				sText = JSON.parse(JSON.parse(responseTS.Payload.toLocaleString()).body).text;
			}

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
			});

			const report = await ServicesLayer.reportService.addReport({
				reportID: id,
				resultSetID: params["resultSetID"],
				status: "DRAFT",
				title: title.searchPhrase,
				apiKey: params["apiKey"],
				dateCreated: d.toString(),
				author: params["author"]
			});

			const tb = `BK-${randomUUID()}`;
			await ServicesLayer.reportBlockService.addReportBlock({
				reportBlockID: tb,
				reportID: id,
				blockType: "RICHTEXT",
				position: 0,
				richText: sText
			});

			const sid = `ST-${randomUUID()}`;
			await ServicesLayer.textStyleService.addStyle({
				textStylesID: sid,
				reportBlockID: tb,
				align: " text-left",
				bold: " font-bold",
				colour: " text-black",
				italic: "",
				size: " text-xs"
			});

			return {
				statusCode: statusCodes.Successful,
				body: JSON.stringify({ Report: report, summarisedText: sText })
			};
		} catch (e) {
			return {
				statusCode: statusCodes.internalError,
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

			reports.map(async (report) => {
				delete report.apiKey;
			});

			reports.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
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

		for (let report of reports) {
			const user = await ServicesLayer.creatorService.getCreatorByKey(report.apiKey);
			report.profileKey = user.profileKey;
			delete report.apiKey;
		}

		reports.sort((a, b) => {
			return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
		});

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

					// const report = await ServicesLayer.reportService.getReport(params.reportID);

					const notification: Notification = {
						id: "NT-" + randomUUID(),
						sender: params.apiKey,
						receiver: shareTo.apiKey,
						type: "SHARE",
						content: params.reportID,
						isRead: false,
						dateCreated: new Date().toString()
					};

					await ServicesLayer.notificationService.addNotification(notification);
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

			re.forEach(async (report, index) => {
				if (report.status === "DELETED") {
					re.splice(index, 1);
				} else {
					const user = await ServicesLayer.creatorService.getCreatorByKey(report.apiKey);
					report.profileKey = user.profileKey;
					delete report.apiKey;
					delete report.resultSetID;
				}
			});

			re.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
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

export const getAllMyPublishedReports = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			const reports = await ServicesLayer.reportService.getPublishedReports(params.apiKey);

			reports.map(async (report) => {
				delete report.apiKey;
			});

			reports.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			});

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

export const editTitle = middyfy(
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

			const reports = await ServicesLayer.reportService.updateReportTitle(
				params.title,
				params.reportID
			);

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
