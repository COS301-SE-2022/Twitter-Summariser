import { lambda } from "@functions/__tests__/inte/resources";
import CreatorService from "src/services/creator.service";

/*describe(" ", async () => {
	// Creation of table
	await dynamoDB
		.put({
			TableName: "Users",
			Item: {
				HashKey: "userID"
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

	// Creating S3 Bucket Object
	const s3Object = await s3
		.getObject({
			Bucket: "admin-files",
			Key: "sample.txt"
		})
		.promise();

	// Deleting table
	await dynamoDB
		.delete({
			TableName: "Users",
			Key: { HashKey: "userID" }
		})
		.promise();

	// Deleting s3 Object
	await s3
		.deleteObject({
			Bucket: "admin-files",
			Key: "sample.txt"
		})
		.promise();
});*/

describe("",async () => {
    await lambda.invoke({
        FunctionName: "addCreator",
        
    })
})