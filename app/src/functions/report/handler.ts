import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Lambda } from "aws-sdk";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import ServicesLayer from "../../services";
import TextStyle from "@model/textStyles/textStyles.model";
import Notification from "@model/notification/notification.model";
import { clientV2 } from "@functions/resources/twitterV2.client";
import * as AWS from "aws-sdk";

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

			// // Get All the drafts
			// const drafts = await ServicesLayer.reportService.getDraftReports(params["apiKey"]);

			// drafts.sort((a, b) => {
			// 	return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			// });

			// const diff = new Date().getTime() -	new Date(drafts[0].dateCreated).getTime();
			// if (drafts.length > 0  && drafts[0].title === title.searchPhrase && Math.abs(diff / 1000) < 5) {
			// 	return {
			// 		statusCode: statusCodes.accepted,
			// 		headers: header,
			// 		body: JSON.stringify({
			// 			message: "Report already generated",
			// 			reportID: drafts[0].reportID
			// 		})
			// 	};
			// }


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
					FunctionName: "text-summarisation-prod-summarise",
					InvocationType: "RequestResponse",
					Payload: JSON.stringify({
						text: twts,
						min: 100,
						max: 200
					})
				};

				const responseTS = await lambda.invoke(lambdaParams).promise();
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
				author: params["author"],
				blockNumber: tweets.length
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
				align: "",
				bold: "",
				colour: "",
				italic: "",
				size: ""
			});


			if (params["reportType"] && params["reportType"] === "SCHEDULED") {
				const notification = {
					id: "NT-" + randomUUID(),
					sender: "SYSTEM",
					receiver: params.apiKey,
					type: "SCHEDULER",
					content: report.reportID,
					isRead: false,
					dateCreated: new Date().toString()
				};

				await ServicesLayer.notificationService.addNotification(notification);
			}

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

			reports.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			});

			if (reports.length > 1) {
				const diff =
					new Date(reports[0].dateCreated).getTime() -
					new Date(reports[1].dateCreated).getTime();
				if (reports[0].title === reports[1].title && Math.abs(diff / 1000) < 5) {
					await ServicesLayer.reportService.deleteReport(reports[0].reportID);
					reports.shift();
				}
			}

			reports.map(async (report) => {
				delete report.apiKey;
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

			const d = new Date();

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

const Comprehend = new AWS.Comprehend();

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

			//report = await ServicesLayer.reportService.getReport(params.reportID);

			if (per !== undefined) {
				report.permission = per.type;
			} else if (params.apiKey === report.apiKey) {
				report.permission = "OWNER";
			} else {
				report.permission = "VIEWER";
			}

			const result = [];

			const reportBlocks = await ServicesLayer.reportBlockService.getReportBlocks(
				report.reportID
			);

			const promises = reportBlocks.map(async (block) => {
				const type = block.blockType;
				const ob = {} as any;

				ob.blockType = type;
				ob.position = block.position;
				ob.reportBlockID = block.reportBlockID;

				if (type === "TWEET") {
					ob.block = {
						tweetID: block.tweetID
					};
				} else if (type === "RICHTEXT") {
					const style = await ServicesLayer.textStyleService.getStyle(
						block.reportBlockID
					);
					ob.block = {
						text: block.richText,
						position: block.position,
						style
					};
				}
				result.push(ob);
			});

			await Promise.all(promises);
			await ServicesLayer.reportBlockService.sortReportBlocks(result);
			const rp = [];
			const tweets = [];
			let bl = false;
			let count = 0;
			let max;

			for (let y = 0; y < result.length; y++) {
				max = result[y].position;
			}

			let y = 0;
			for (let x = 0; x < max + 2; x++) {
				if (result[y] !== undefined) {
					if (result[y].position === x) {
						rp.push(result[y]);
						if (result[y].blockType === "TWEET") {
							tweets.push(result[y].block.tweetID);
						}
						bl = true;
						count++;
						y++;
					}
				}

				if (!bl && y > 0) {
					if (result[y - 1].blockType === "TWEET") {
						rp.push({ blockType: "RICHTEXT", position: x, block: null });
						count++;
					}
				} else if (!bl && x === 0) {
					rp.push({ blockType: "RICHTEXT", position: x, block: null });
				}
				bl = false;
			}

			const { data } = await clientV2.get("tweets", { ids: tweets });

			let twts = [];

			for (let x = 0; x < data.length; x++) {
				twts.push(data[x].text);
			}

			const param = {
				LanguageCode: "en",
				TextList: twts
			};
			const sentimentResults = await Comprehend.batchDetectSentiment(param).promise();

			for (let x = 0; x < data.length; x++) {
				rp[2 * x + 1].block.sentiment = {
					sentimentWord: sentimentResults.ResultList[x].Sentiment,
					sentiment: sentimentResults.ResultList[x].SentimentScore,
					id: data[x].id
				};
			}

			report.Report = rp;
			report.numOfBlocks = count;
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

			re.sort((a, b) => {
				return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
			});

			let responseArray = await re.reduce(async (result, report) => {
				let resultArray = await result;
				if (report.status !== "DELETED") {
					const user = await ServicesLayer.creatorService.getCreatorByKey(report.apiKey);
					report.profileKey = user.profileKey;
					delete report.apiKey;
					delete report.resultSetID;

					resultArray.push(report);
				} else {
					ServicesLayer.permissionService.deletePermission(
						report.reportID,
						params.apiKey
					);
				}
				return result;
			}, Promise.resolve([]));

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(responseArray)
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
