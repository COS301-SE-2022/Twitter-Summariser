export const ReportBlockTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ReportBlockTable",
        AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"
        },
        {
            AttributeName: "reportID",
            AttributeType: "S"
        }],
        KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
        }],
        GlobalSecondaryIndex: [{
            IndexName: "reportBlockIndex",
            KeySchema: [{
                AttributeName: "reportID",
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
}