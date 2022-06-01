import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {clientV2} from "../clients/twitterV2.client";
import TweetServices from "@functions/TweetTransServices/tweet.service";




export const search = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //try{
        const params = JSON.parse(event.body);
        const {meta, data, includes} = await clientV2.get(
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
        const tweetService = new TweetServices();
        const tweetlist = JSON.stringify(await tweetService.addTweets(data, includes, meta["result_count"]));
        //const mt = meta["result_count"];
        //const dt = data[0]['public_metrics']['retweet_count'];
        return formatJSONResponse({
            status: 200,
            //mt,
            //dt,
            //includes,
            tweetlist,
        });
    /*} catch (e){
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }*/
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

