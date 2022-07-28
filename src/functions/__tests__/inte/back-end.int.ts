

// Tests with post requests Testing integration of API --> Lambda --> DynamodbDB

import axios from "axios";


const apiAcesspoint = {
	development: "https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/"
};

describe("Given a valid API request to add a user", async () => {
	// Making api call
	const response = await axios.post(
		apiAcesspoint.development+'signup',
		{ username: 'test', email: 'test@gmail.com', password: 'test' },
		{
		  headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		  },
		},
	  );

	test("Make sure api recevies request and returns success status", async () => {
		expect(response).toBeDefined;
	});

	test("Make sure api returns success status", async () => {
		expect(response.status).toBe(200);
	});

	test("Make sure that backend has correctly processed data and return avlid data", async () => {
		// Expect The correct output
		expect(response.data["apiKey"]).toBeDefined;
		expect(response.data["email"]).toBeDefined;
		expect(response.data["username"]).toBeDefined;
	});

	test("Make sure that backend has correctly processed data and return correct data", async () => {
		//Expect the Correct details to be returned
		expect(response.data["username"]).toEqual("test");
	});
    
});
