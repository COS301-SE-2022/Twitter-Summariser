export const ReportTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        TableName: "ReportTable",
        AttributeDefinition: [{
            AttributeName: "id",
            AttributeType: "S"
        },
        ],
        KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
        },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
};