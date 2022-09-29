import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

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

		const decoded = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
		if (decoded && decoded.username)
			return callback(null, authorizationResponse(decoded.username, "Allow", methodARN));
		return callback(null, authorizationResponse(decoded.username, "Deny", methodARN));
	} catch (e) {
		return callback(null, authorizationResponse("ExpiredToken", "Deny", methodARN));
	}
};
