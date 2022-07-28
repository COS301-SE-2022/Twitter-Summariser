const {fetch} = require('node-fetch');

// Tests with post requests Testing integration of API --> Lambda --> DynamodbDB


const apiAcesspoint = {
	development: "https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/"
};

describe("Given a valid API request to add a user", async () => {
	// Making api call
	const response = await fetch(apiAcesspoint + "signup", {
		method: "POST",
		body: JSON.stringify({ email: "test@gmail.com", username: "test", password: "test" }),
		headers: { "content-Type": "application/json" }
	});

	test("Make sure api recevies request and returns success status", async () => {
		expect(response.ok);
	});

	test("Make sure api returns success status", async () => {
		expect(response.status).toBe(200);
	});

	test("Make sure that backend has correctly processed data and return avlid data", async () => {
		// Expect The correct output
		expect(response.json["apiKey"]).toBeDefined;
		expect(response.json["email"]).toBeDefined;
		expect(response.json["username"]).toBeDefined;
	});

	test("Make sure that backend has correctly processed data and return correct data", async () => {
		//Expect the Correct details to be returned
		expect(response.json["username"]).toEqual("test");
	});
    
});
