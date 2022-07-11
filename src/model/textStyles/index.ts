export const TextStylesTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "TextStylesTable",
		AttributeDefinitions: [
			{
				AttributeName: "textStylesID",
				AttributeType: "S"
			},
			{
				AttributeName: "reportBlockID",
				AttributeType: "S"
			}
		],
		KeySchema: [
			{
				AttributeName: "textStylesID",
				KeyType: "HASH"
			}
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: "textStylesIndex",
				KeySchema: [
					{
						AttributeName: "reportBlockID",
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
