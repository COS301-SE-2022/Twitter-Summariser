import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import middy from "@middy/core";
import { header, statusCodes } from "@functions/resources/APIresponse";
import * as AWS from "aws-sdk";

const Comprehend = new AWS.Comprehend();

export const analyse = middy(async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    const body = JSON.parse(event.body);

    if (!body || !body.text) {
        return {
            statusCode: statusCodes.badRequest,
            headers: header,
            body: JSON.stringify({
                message: "Not text field on the body"
            })
        };
    }

    const text = body.text;

    const params = {
        LanguageCode: "en",
        TextList: [text]
    };

    try {
        // Entity Extraction
        const entityResults = await Comprehend.batchDetectEntities(params).promise();
        const entities = entityResults.ResultList[0]
        
        // Sentiment Analysis
        const sentimentResults = await Comprehend.batchDetectSentiment(params).promise();
        const sentiment = sentimentResults.ResultList[0];

        return {
            statusCode: statusCodes.Successful,
            headers: header,
            body: JSON.stringify({
                entities,
                sentiment
            })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: statusCodes.badRequest,
            headers: header,
            body: JSON.stringify({
                message: "Failed to generate sentiment analysis with AWS Comprehend"
            })
        };
    }
});