export const TweetTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "TweetTable",
        AttributeDefinitions: [{
            AttributeName: "tweetId",
            AttributeType: "S",
        },
        {
            AttributeName: "resultSetId",
            AttributeType: "S",
        }],
        KeySchema: [{
            AttributeName: "tweetId",
            KeyType: "HASH"
        },
        {
            AttributeName: "resultSetId",
            KeyType: "RANGE"
        }], 
        GlobalSecondaryIndexes: [{
            IndexName: "tweetIndex",
            KeySchema: [{
                AttributeName: "resultSetId",
                KeyType: "HASH"
            },
            {
                AttributeName: "tweetId",
                KeyType: "RANGE"
            }],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }

        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
};