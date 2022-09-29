export const NotificationTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "NotificationTable",
		AttributeDefinitions: [
			{
				AttributeName: "id",
				AttributeType: "S"
			},
			{
				AttributeName: "receiver",
				AttributeType: "S"
			}
		],
		KeySchema: [
			{
				AttributeName: "id",
				KeyType: "HASH"
			}
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: "receiverIndex",
				KeySchema: [
					{
						AttributeName: "receiver",
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
