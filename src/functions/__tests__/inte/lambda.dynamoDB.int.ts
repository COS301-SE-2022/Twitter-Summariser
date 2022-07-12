import { dynamoDB, lambda } from "@functions/__tests__/inte/resources";

describe(" ", async () => {
	// Creation of table
	await dynamoDB
		.put({
			TableName: "Users",
			Item: {
				HashKey: "userID",
				isAmin: true
			}
		})
		.promise();

	// Invoking Lambda function
	await lambda
		.invoke({
			FunctionName: "createAdminFile",
			Payload: JSON.stringify({
				userID: "userId",
				filename: "sample.txt",
				content: "ok"
			})
		})
		.promise();

	// Deleting table
	await dynamoDB
		.delete({
			TableName: "Users",
			Key: { HashKey: "userID" }
		})
		.promise();
});
