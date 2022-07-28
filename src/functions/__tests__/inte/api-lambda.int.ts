import * as request from "superagent";

const apiAcesspoint = {
	development: "https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/"
};

// Tests using super agent
describe("Given an authorised request WHEN the post editBlock endpoint is called", () => {
	test("THEN it should respond with a 200", async () => {
		const { statusCode } = await request.post(apiAcesspoint.development + "signup");
		expect(statusCode).toBe(200);
	});

	test("THEN it should respond with a healthy body", async () => {
		const { body } = await request.post(apiAcesspoint.development + "signup");
		expect(body).toBeTruthy;
	});
});

describe("Given an authorised request WHEN the post generateReport endpoint is called", () => {
	test("THEN it should respond with a 200", async () => {
		const { statusCode } = await request.post(apiAcesspoint.development + "signin");
		expect(statusCode).toBe(200);
	});

	test("THEN it should respond with a healthy body", async () => {
		const { body } = await request.post(apiAcesspoint.development + "signin");
		expect(body).toBeTruthy;
	});
});
