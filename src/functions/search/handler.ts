import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {clientV2} from "../clients/twitterV2.client";
import TweetServices from "@functions/TweetTransServices/tweet.service";




export const search = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try{
        const params = JSON.parse(event.body);
        const {data, includes} = await clientV2.get(
            'tweets/search/recent',
            {
              query: params.keyword + ' -is:retweet lang:en',
              max_results: params.numOfTweets,
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
        //const tweetlist = JSON.stringify(await TweetServices.tweetServices.addTweets(data, includes, 20));
        return formatJSONResponse({
            status: 200,
            data,
            includes,
            //tweetlist,
        });
    } catch (e){
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

/*export const addCreator = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = JSON.parse(event.body)
    try {
        const creator = await CreatorServices.creatorService.addCreator({
            username: params.username,
            password: params.password,
            displayName: params.displayName,
            dateRegistered: new Date().toISOString(),

        })
        return formatJSONResponse({
            creator
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: "Could not add creator"
        });
    }
})*/

