export const ResultSetTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ResultSetTable",
        AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"
        },
        {
            AttributeName: "apiKey",
            AttributeType: "S"
        }],
        KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
        }, 
        {
            AttributeName: "apiKey",
            KeyType: "RANGE"
        }],
        GlobalSecondaryIndexes: [{
            IndexName: "resultSetIndex",
            KeySchema: [{
                AttributeName: "apiKey",
                KeyType: "HASH"
            },
            {
                AttributeName: "id",
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
}