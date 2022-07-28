// Tests with post requests Testing integration of API --> Lambda --> DynamodbDB

import axios from "../../../../client/src/api/ConfigAxios";

/*const apiAcesspoint = {
	development: "https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/"
};*/

describe("Given a valid API request to add a user", () => {
	// Making api call
	let response: any;

	test("Make sure api recevies request and returns success status", async () => {
		const response = await axios.post(
			"signup",
			JSON.stringify({ username: "test", email: "test@gmail.com", password: "test" })
		);

		expect(response).toBeDefined;

		expect(response).toBeDefined;
	});

	test("Make sure api returns success status", async () => {
		const response = await axios.post(
			"signup",
			JSON.stringify({ username: "test", email: "test@gmail.com", password: "test" })
		);

		expect(response).toBeDefined;

		expect(response.status).toBe(200);
	});

	it("it should make a valid ", async () => {
		try {
			response = await axios.post(
				"signup",
				JSON.stringify({ username: "test", email: "test@gmail.com", password: "test" })
			);
		} catch (error) {
			response = "error";
		}

		test("Make sure that backend has correctly processed data and return avlid data", async () => {
			// Expect The correct output
			expect(response.data["apiKey"]).toBeDefined;
			expect(response.data["email"]).toBeDefined;
			expect(response.data["username"]).toBeDefined;
		});
	});

	it("it should make a valid ", async () => {
		try {
			response = await axios.post(
				"signup",
				JSON.stringify({ username: "test", email: "test@gmail.com", password: "test" })
			);
		} catch (error) {
			response = "error";
		}

		test("Make sure that backend has correctly processed data and return correct data", async () => {
			//Expect the Correct details to be returned
			expect(response.data["username"]).toEqual("test");
		});
	});
});
