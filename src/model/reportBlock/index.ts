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
        },
        {
            AttributeName: "reportID",
            KeyType: "RANGE"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
}