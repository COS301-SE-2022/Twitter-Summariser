export const TweetTable = {
	Type: "AWS::DynamoDB::Table",
	Properties: {
		TableName: "TweetTable",
		AttributeDefinitions: [
			{
				AttributeName: "tweetId",
				AttributeType: "S"
			},
			{
				AttributeName: "resultSetId",
				AttributeType: "S"
			}
		],
		KeySchema: [
			{
				AttributeName: "tweetId",
				KeyType: "HASH"
			}
		],
		GlobalSecondaryIndexes: [
			{
				IndexName: "tweetIndex",
				KeySchema: [
					{
						AttributeName: "resultSetId",
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
