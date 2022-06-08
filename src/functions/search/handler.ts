import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { clientV2 } from "../clients/twitterV2.client";
import { randomUUID } from "crypto";
import ServicesLayer from "../../services";


export const search = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body);

    let filter: string;
    if (params.filterBy == "noneReply") {
      filter = " -is:reply";
    } else if (params.filterBy == "verifiedTweets") {
      filter = " is:verified";
    } else {
      filter = "";
    }

    const { meta, data, includes } = await clientV2.get(
      'tweets/search/recent',
      {
        query: params.keyword + filter + ' -is:retweet lang:en',
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
    
    var dd = new Date();
    var d = new Date(dd.toLocaleString()+"-02:00");

    let id: string;
    id = "RS-";
    id += randomUUID();

    const tweetlist = await ServicesLayer.tweetService.addTweets(data, includes, meta["result_count"], id);
    const sortedList = await ServicesLayer.tweetService.sortTweets(tweetlist, params.sortBy);
    const result = sortedList.slice(0, params.numOfTweets);

    ServicesLayer.resultSetServices.addResultSet({ id: id, apiKey: params.apiKey, dateCreated: d.toString(), searchPhrase: params.keyword, sortOption: params.sortBy, filterOption: params.filterBy });
    
    
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
      await ServicesLayer.tweetService.addTweet(result[i]);
    }
    

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": '*',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ resultSetID: id, tweets: result })
    }

  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: e
    });
  }
});
