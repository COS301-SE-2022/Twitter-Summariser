// Tests with post requests Testing integration of API --> Lambda --> DynamodbDB

import axios from "../../../../client/src/api/ConfigAxios";
import axio from "axios";

// Using Function SignUp
describe("Testing Intgeration of API with Lambda Back-end using signup", () => {
	// Making api call and Testing API -> Lambda
	let response: any;

	it("Make an a valid API Call", async() =>{
		response = await axios.post(
			"signup",
			JSON.stringify({ username: "test", email: "test@gmail.com", password: "M@1c01mm" })
		);
	})

	test("Test that API receieves request", async () => {
		expect(response).toBeDefined;
	});

	test("Test that backend was able to process the data", async () => {
		expect(response.status).toBe(200);
	});

	test("Test backend has correctly processed data and return avlid data", async () => {
		// Expect The correct output
		expect(response.data["apiKey"]).toBeDefined;
		expect(response.data["email"]).toBeDefined;
		expect(response.data["username"]).toBeDefined;
	});

	test("Test that backend has correctly processed data and return correct data", async () => {
		//Expect the Correct details to be returned
		expect(response.data["username"]).toEqual("test");
		expect(response.data["email"]).toEqual("test@gmail.com");
	});
});

describe("Testing Intgeration Lambda Back-end with DynamoDB using login", () => {
	// Invoking Lambda function directly
	let response: any;

	it("Make an a valid API Call", async() =>{
		response = await axio.post(
			'https://cwbeugfbqrab76zokjldcp76da0urokn.lambda-url.us-east-1.on.aws/',
			JSON.stringify({ email: "test@gmail.com", password: "M@1c01mm" })
		);
	})

	test("Test that API receieves request", async () => {
		expect(response).toBeDefined;
	});

	test("Test that backend was able to process the data", async () => {
		expect(response.status).toBe(200);
	});

	test("Test backend has correctly processed data and return avlid data", async () => {
		// Expect The correct output
		expect(response.data["apiKey"]).toBeDefined;
		expect(response.data["email"]).toBeDefined;
		expect(response.data["username"]).toBeDefined;
	});

	test("Test that backend has correctly processed data and return correct data", async () => {
		//Expect the Correct details to be returned
		expect(response.data["username"]).toEqual("test");
		expect(response.data["email"]).toEqual("test@gmail.com");
	});
});