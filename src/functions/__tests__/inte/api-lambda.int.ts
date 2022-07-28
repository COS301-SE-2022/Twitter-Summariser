import * as request from "superagent";

const apiAcesspoint = {
	development: "https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/"
};

// Tests using super agent
describe("Given an authorised request WHEN the post editBlock endpoint is called", () => {
	
	it('it should make a valid ', async () => {
		const response = await request.post(apiAcesspoint.development + "searchTweets");

		test("THEN it should respond with a 200", async () => {
			expect(response.statusCode).toBe(200);
		});

		test("THEN it should respond with a healthy body", async () => {
			expect(response.body).toBe(' Unauthorized');
		});
	});
});

describe("Given an authorised request WHEN the post generateReport endpoint is called", () => {
	it('it should make a valid ', async () => {
		const response = await request.post(apiAcesspoint.development + "getReport");

		test("THEN it should respond with a 200", async () => {
			expect(response.statusCode).toBe(200);
		});

		test("THEN it should respond with a healthy body", async () => {
			expect(response.body).toBe(' Unauthorized');
		});
	});
});