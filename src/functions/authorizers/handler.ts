import { APIGatewayProxyEventV2, APIGatewayProxyCallbackV2 } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { header, statusCodes } from "@functions/resources/APIresponse";
import jwt from "jsonwebtoken";

// export const verifyJWT = middyfy(async (event: APIGatewayProxyEventV2, callback: APIGatewayProxyCallbackV2): Promise<void> => {
//     // const jwt_token = event.headers.authorization;


//     return callback(null, { statusCode: statusCodes.unauthorized, headers: header, body: JSON.stringify({ message: "Lol" }) });





//     // const secret = process.env.ACCESS_TOKEN_SECRET;
//     // // const decoded = jwt.verify(jwt_token, secret);

//     // if (decoded && decoded.email)
//     //     return callback(null, authorizationResponse(decoded.email, "Allow"));
//     // return callback(null, authorizationResponse(decoded.email, "Deny"));
// })

export const verifyJWT = (event, context, callback) => {
    const methodARN = event.methodArn;
    try {
        const jwt_token = event.authorizationToken;
        const methodARN = event.methodArn;

        if (!jwt_token || !methodARN)
            return callback(null, authorizationResponse("MissingElements", "Deny", methodARN));

        const secret = process.env.ACCESS_TOKEN_SECRET;
        const decoded = jwt.verify(jwt_token, secret);
        // const jwt_token_payload = JSON.parse(jwt_token.split(".")[1]);
        // console.log(jwt_token_payload);



        if (decoded && decoded.email)
            return callback(null, authorizationResponse(decoded.email, "Allow", methodARN));
        return callback(null, authorizationResponse(decoded.email, "Deny", methodARN));

    } catch (e) {
        console.log(e);

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


