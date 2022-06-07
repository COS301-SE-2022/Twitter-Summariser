export const ReportTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ReportTable",
        AttributeDefinition: [{
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
                KeyHash: "HASH"
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