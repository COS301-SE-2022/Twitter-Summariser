import { handlerPath } from "@libs/handler-resolver";

export const getAllResultSet = {
	handler: `${handlerPath(__dirname)}/handler.getAllResultSet`,
	description: "Function that returns all the resultsets a specific user has.",
	events: [
		{
			http: {
				method: "post",
				path: "getAllResultSet/",
				cors: true,
				authorizer: {
					name: "verifyJWT",
					type: "Token"
				}
			}
		}
	]
};

export const getResultSet = {
	handler: `${handlerPath(__dirname)}/handler.getResultSet`,
	description:
		"Function that returns the contents of a result set, e.g tweets and resultset info.",
	events: [
		{
			http: {
				method: "post",
				path: "getResultSet/",
				cors: true,
				authorizer: {
					name: "verifyJWT",
					type: "Token"
				}
			}
		}
	]
};

// Deleting a result set
export const deleteResultSet = {
	handler: `${handlerPath(__dirname)}/handler.deleteResultSet`,
	description: "A function that deletes a resultSet.",
	events: [
		{
			http: {
				method: "post",
				path: "deleteResultSet/",
				cors: true,
				authorizer: {
					name: "verifyJWT",
					type: "Token"
				}
			}
		}
	]
};
