export const PermissionsTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "PermissionsTable",
        AttributeDefinitions: [{
            AttributeName: "reportID",
            AttributeType: "S"
        },
        {
            AttributeName: "apiKey",
            AttributeType: "S"
        }],
        KeySchema: [{
            AttributeName: "reportID",
            KeyType: "HASH"
        },
        {
            AttributeName: "apiKey",
            KeyType: "RANGE"
        }],
        GlobalSecondaryIndexes: [{
            IndexName: "permissionsIndex",
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
}