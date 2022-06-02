import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Tweet from "@model/tweet/tweet.model";

export default class TweetService {
    private TableName: string = "TweetTable";

    constructor (private docClient: DocumentClient) {};

    async getTweets(rsId: string) : Promise<Tweet[]> {
        const result = await this.docClient.query({
            TableName: this.TableName,
            IndexName: "tweetIndex",
            KeyConditionExpression: 'resultSetId = :resultSetId',

            ExpressionAttributeValues: {
                ":resultSetId": rsId
            }
        }).promise();

        return result.Items as Tweet[];
    }

    async addTweet(tweet: Tweet): Promise<Tweet> {
        await this.docClient.put({
            TableName: this.TableName,
            Item: tweet
        }).promise();

        return tweet as Tweet;
    }

}