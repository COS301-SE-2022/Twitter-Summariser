import jwt from "jsonwebtoken";

export const verifyJWT = async (event, callback) => {
    const methodARN = event.methodArn;
    try {
        const jwt_token = event.authorizationToken;
        const methodARN = event.methodArn;

        if (!jwt_token || !methodARN)
            return callback(null, authorizationResponse("MissingElements", "Deny", methodARN));

        const secret = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(jwt_token, secret);

        if (decoded && decoded.email)
            return callback(null, authorizationResponse(decoded.email, "Allow", methodARN));
        return callback(null, authorizationResponse(decoded.email, "Deny", methodARN));

    } catch (e) {
        return callback(null, authorizationResponse("ExpiredToken", "Deny", methodARN));
    }
}

function authorizationResponse(principalId: string, effect: string, arn: string): object {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: arn
            }]
        }
    };
}


