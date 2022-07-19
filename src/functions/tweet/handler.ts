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
				}
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

			ServicesLayer.resultSetServices.addResultSet({
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

			const { data } = await clientV2.get("tweets/search/recent", {
				query: `${params.keyword} -is:retweet lang:en`,
				tweet: {
					fields: ["public_metrics", "author_id", "created_at"]
				}
			});

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify(data)
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

			const tweet1 = await ServicesLayer.reportBlockService.getReportBlock(
				params.reportBlockID1
			);

			const tweet2 = await ServicesLayer.reportBlockService.getReportBlocks(
				params.reportBlockID2
			);

			return {
				statusCode: statusCodes.Successful,
				headers: header,
				body: JSON.stringify("Operation successful")
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
