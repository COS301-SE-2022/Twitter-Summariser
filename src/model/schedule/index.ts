export const ScheduleTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "ScheduleTable",
		AttributeDefinitions: [
			{
				AttributeName: "id",
				AttributeType: "S"
			},
			{
				AttributeName: "apiKey",
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
				IndexName: "scheduleIndex",
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
