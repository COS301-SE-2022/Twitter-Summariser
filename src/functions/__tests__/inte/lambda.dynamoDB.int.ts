import { dynamoDB, lambda } from "@functions/__tests__/inte/resources";

describe(" ", async () => {
	await dynamoDB
		.put({
			TableName: "Users",
			Item: {
				HashKey: "userID",
				isAmin: true
			}
		})
		.promise();

    await dynamoDB.delete({
        TableName: "Users",
        Key: { HashKey: "userID"}
    }).promise();
});
