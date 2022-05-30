export const CreatorTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "CreatorTable",
        AttributeDefinitions: [{
            AttributeName: "apiKey",
            AttributeType: "S",
        },
        {
            AttributeName: "email",
            AttributeType: "S"
        }],
        KeySchema: [{
            AttributeName: "apiKey",
            KeyType: "HASH"
        },
        {
            AttributeName: "email",
            KeyType: "RANGE"
        }],
        GlobalSecondaryIndexes: [{
            IndexName: "gsiIndex",
            KeySchema: [{
                AttributeName: "email",
                KeyType: "HASH"
            },
            {
                AttributeName: "apiKey",
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
        },

    }
};