export const ReportTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ReportTable",
        AttributeDefinitions: [{
            AttributeName: "reportID",
            AttributeType: "S"
        },
        
        {
            AttributeName: "apiKey",
            AttributeType: "S"
        },
        {
            AttributeName: "status",
            AttributeType: "S"
        }
        
        ],
        KeySchema: [{
            AttributeName: "reportID",
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
        },
        {
            IndexName: "statusIndex",
            KeySchema: [{
                AttributeName: "status",
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