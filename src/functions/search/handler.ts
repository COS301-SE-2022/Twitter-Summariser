import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
//import Twitter from "twitter-v2"
//import Tweet from "../model/tweet.model";
import {clientV2} from "../clients/twitterV2.client"


export const search = middyfy(async (/*event: APIGatewayProxyEvent*/): Promise<APIGatewayProxyResult> => {
    //const params = JSON.parse(event.body)
    try{
        const {data, meta} = await clientV2.get(
            'tweets/search/recent',
            {
              query: '"run to the shop" lang:en',
              max_results: '15',
              tweet: {
                fields: [
                  'public_metrics',
                  'author_id',
                ],
              },
              sort_by: "public"
            }
          );
        return formatJSONResponse({
            status: 200,
            data,
            meta
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

