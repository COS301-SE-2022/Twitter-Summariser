export const CreatorTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "CreatorTable",
		AttributeDefinitions: [
			{
				AttributeName: "apiKey",
				AttributeType: "S"
			},
			{
				AttributeName: "email",
				AttributeType: "S"
			}
		],
		KeySchema: [
			{
				AttributeName: "email",
				KeyType: "HASH"
			}
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: "gsiIndex",
				KeySchema: [
					{
						AttributeName: "apiKey",
						KeyType: "HASH"
					}
				],
				Projection: {
					ProjectionType: "ALL"
				},
				ProvisionedThroughput: {
					ReadCapacityUnits: 5,
					WriteCapacityUnits: 5
				}
			}
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: 5,
			WriteCapacityUnits: 5
		}
	}
};
