export const ResultSetTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ResultSetTable",
        AttributeDefinitions: [{
            AttributeName: "id",
            AtrributeType: "S"
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
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
}