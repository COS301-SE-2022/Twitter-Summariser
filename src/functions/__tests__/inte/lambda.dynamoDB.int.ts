import * as AWS from "aws-sdk";
import serviceLayer from "../../../services/index";

const lambda = new AWS.Lambda();

/* describe(" ", async () => {
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
}); */

describe("Checks the correct writing of a creator to a database.", async () => {
	// Envoking Lambda function
	const creator = await lambda
		.invoke({
			FunctionName: "addCreator",
			Payload: JSON.stringify({
				email: "test@gmail.com",
				username: "Integration Test",
				password: "IntegrationTest@",
				dateOfBirth: "2001/01/01"
			})
		})
		.promise();

	// reading from database
	const databaseRead = await serviceLayer.creatorService.getCreator("test@gmail.com");

	// Checking return status
	expect(creator.StatusCode === 200);

	// Checks if write was valid
	expect(creator.$response.data === databaseRead);
});
