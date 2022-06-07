export const ReportTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ReportTable",
        AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"
        },
        {
            AttributeName: "apiKey",
            AttributeType: "S"
        }
        ],
        KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
        },],
        GlobalSecondaryIndexes: [{
            IndexName: "reportIndex",
            KeySchema: [{
                AttributeName: "apiKey",
                KeyType: "HASH"
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