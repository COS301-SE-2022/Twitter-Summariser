import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {clientV2} from "../clients/twitterV2.client";
import TweetServices from "@functions/TweetTransServices/tweet.service";




export const search = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try{
        const params = JSON.parse(event.body);
        const {meta, data, includes} = await clientV2.get(
            'tweets/search/recent',
            {
              query: params.keyword + ' -is:retweet lang:en',
              max_results: '100',
              tweet: {
                fields: [
                  'public_metrics',
                  'author_id',
                  'created_at',
                ],
              },
              expansions: 'author_id',
              user: {
                  fields: [
                      'id',
                      'username',
                      'name',
                  ],
              },
            }
          );

        const tweetService = new TweetServices();
        const tweetlist = await tweetService.addTweets(data, includes, meta["result_count"]);
        const sortedList = await tweetService.sortTweets(tweetlist, params.sortBy);
        const result = sortedList.slice(0, params.numOfTweets);
        const numOfTweets = result.length;
        
        return formatJSONResponse({
            status: 200,
            params,
            number_of_Tweets: numOfTweets,
            result,
        });
    } catch (e){
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
