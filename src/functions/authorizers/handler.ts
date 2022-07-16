import jwt from "jsonwebtoken";

function authorizationResponse(principalId: string, effect: string, arn: string): object {
	return {
		principalId,
		policyDocument: {
			Version: "2012-10-17",
			Statement: [
				{
					Action: "execute-api:Invoke",
					Effect: effect,
					Resource: arn
				}
			]
		}
	};
}

export const verifyJWT = (event, _context, callback) => {
	const methodARN = event.methodArn;
	try {
		const jwtToken = event.authorizationToken;
		if (!jwtToken || !methodARN)
			return callback(null, authorizationResponse("MissingElements", "Deny", methodARN));

		const secret = process.env.ACCESS_TOKEN_SECRET;
		const decoded = jwt.verify(jwtToken, secret);

		if (decoded && decoded.email)
			return callback(null, authorizationResponse(decoded.email, "Allow", methodARN));
		return callback(null, authorizationResponse(decoded.email, "Deny", methodARN));
	} catch (e) {
		return callback(null, authorizationResponse("ExpiredToken", "Deny", methodARN));
	}
};
