import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { clientV2 } from "../clients/twitterV2.client";
import { randomUUID } from "crypto";
import tweetTransService from "../../services"
import resultSetServices from "../../services";


export const search = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    let filter: string;
    if(params.filterBy=="noneReply"){
      filter = " -is:reply";
    }else if(params.filterBy=="verifiedTweets"){
      filter = " is:verified";
    }else{
      filter="";
    }

    const { meta, data, includes } = await clientV2.get(
      'tweets/search/recent',
      {
        query: params.keyword +' -is:retweet lang:en',
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

    const tweetlist = await tweetTransService.tweetTransService.addTweets(data, includes, meta["result_count"]);
    const sortedList = await tweetTransService.tweetTransService.sortTweets(tweetlist, params.sortBy);
    const result = sortedList.slice(0, params.numOfTweets);

    let id: string;
    id = "R-";
    id += randomUUID();

    resultSetServices.resultSetServices.addResultSet({id: id, apiKey: params.apiKey, dateCreated: new Date(), searchPhrase: params.keyword, sortOption: params.sortBy, filterOption: params.filterBy});

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({reportID: id, tweets: result})
    }

  } catch (e) {
    return formatJSONResponse({
     statusCode: 500,
      message: e
    });
  }
});
