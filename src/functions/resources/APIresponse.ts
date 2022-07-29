const link = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://d3n7sg52ssug4.cloudfront.net";

export const header = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Methods": "*",
	"Access-Control-Allow-Origin": link,
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Credentials": true
};

export const statusCodes = {
	// Sucess:
	Successful: 200,
	created: 201,
	accepted: 202,
	no_content: 204,

	// client errors:
	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notfound: 404,
	timeOut: 408,
	gone: 410,
	notAcceptiable: 406,

	// Server errors:
	internalError: 500,
	notImplemented: 501,
	badGateway: 502
};

export const AWSDetails = {
	region: "",
	account_id: ""
};
