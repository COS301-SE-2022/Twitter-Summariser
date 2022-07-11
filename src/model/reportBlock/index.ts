export const ReportBlockTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "ReportBlockTable",
		AttributeDefinitions: [
			{
				AttributeName: "reportBlockID",
				AttributeType: "S"
			},
			{
				AttributeName: "reportID",
				AttributeType: "S"
			}
		],
		KeySchema: [
			{
				AttributeName: "reportBlockID",
				KeyType: "HASH"
			}
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: "reportBlockIndex",
				KeySchema: [
					{
						AttributeName: "reportID",
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
