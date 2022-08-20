import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { randomUUID } from "crypto";
import { header, statusCodes } from "@functions/resources/APIresponse";
import { clientV2 } from "../resources/twitterV2.client";
import ServicesLayer from "../../services";

export const searchTweets = middyfy(
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);

			let filter: string;
			if (params.filterBy === "noneReply") {
				filter = " -is:reply";
			} else if (params.filterBy === "verifiedTweets") {
				filter = " is:verified";
			} else {
				filter = "";
			}

			const { meta, data, includes } = await clientV2.get("tweets/search/recent", {
				query: `${params.keyword + filter} -is:retweet lang:en`,
				max_results: "100",
				tweet: {
					fields: ["public_metrics", "author_id", "created_at"]
				},
				expansions: "author_id",
				user: {
					fields: ["id", "username", "name"]
				},
				sort_order: "relevancy"
			});

			const dd = new Date();
			const d = new Date(`${dd.toLocaleString()}-02:00`);

			let id: string;
			id = "RS-";
			id += randomUUID();

			const tweetlist = await ServicesLayer.tweetService.addTweets(
				data,
				includes,
				meta.result_count
			);

			const sortedList = await ServicesLayer.tweetService.sortTweets(
				tweetlist,
				params.sortBy
			);
			const result = sortedList.slice(0, params.numOfTweets);
			const tweetIDs = await ServicesLayer.tweetService.createArray(result);

			await ServicesLayer.resultSetServices.addResultSet({
				id,
				apiKey: params.apiKey,
				dateCreated: d.toString(),
				searchPhrase: params.keyword,
				sortOption: params.sortBy,
				filterOption: params.filterBy,
				tweets: tweetIDs
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify({ resultSetID: id, tweets: result })
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
	async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		try {
			const params = JSON.parse(event.body);
			const lastS = params.url.lastIndexOf("/") + 1;
			const id = params.url.substring(lastS);

			const { data } = await clientV2.get("tweets", { ids: id });

			if(data.author_id==undefined){
				return {
					statusCode: statusCodes.Successful,
					headers: header,
					body: JSON.stringify("Invalid Tweet url.")
				};
			}

			const tweets = await ServicesLayer.reportService.getReport(params.reportID);

			const position = tweets.numOfBlocks + 1;

			await ServicesLayer.reportBlockService.addReportBlock({
				blockType: "TWEET",
				position,
				reportBlockID: `BK-${randomUUID()}`,
				reportID: params.reportID,
				tweetID: id
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(id)
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

// reordering tweets
export const reorderTweets = middyfy(
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

			/*const tweet1 = await ServicesLayer.reportBlockService.getReportBlock(
				params.reportBlockID1
			);

			const tweet2 = await ServicesLayer.reportBlockService.getReportBlock(
				params.reportBlockID2
			);

			await ServicesLayer.reportBlockService.updatePosition(
				tweet1.reportBlockID,
				tweet2.position
			);

			await ServicesLayer.reportBlockService.updatePosition(
				tweet2.reportBlockID,
				tweet1.position
			);*/

			// Retrieving Blocks
			let blocks = await ServicesLayer.reportBlockService.getReportBlocks(params.reportID);
			blocks = await ServicesLayer.reportBlockService.sortReportBlocks(blocks);

			// If I don't get the position:
			const tweet1 = blocks.find((tweet) => {
				return tweet.position === params.pos;
			});

			let pos2: number;

			if (params.newPlace === "UP") {
				pos2 = params.pos - 2;
			} else {
				pos2 = params.pos + 2;
			}

			const tweet2 = blocks.find((tweet) => {
				return tweet.position === pos2;
			});

			await ServicesLayer.reportBlockService.updatePosition(
				tweet1.reportBlockID,
				tweet2.position
			);

			await ServicesLayer.reportBlockService.updatePosition(
				tweet2.reportBlockID,
				tweet1.position
			);

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
