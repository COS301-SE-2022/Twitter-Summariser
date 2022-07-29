import { handlerPath } from "@libs/handler-resolver";

export const getAllCreators = {
	handler: `${handlerPath(__dirname)}/handler.getAllCreators`,
	description: "A function that returns all the creators in the system.",
	events: [
		{
			http: {
				method: "get",
				path: "creator/",
				cors: true
				// authorizer: {
				// 	name: "verifyJWT",
				// 	type: "Token"
				// }
			}
		}
	]
};

export const deleteUser = {
	handler: `${handlerPath(__dirname)}/handler.deleteUser`,
	description: "A function that returns all the creators in the system.",
	events: [
		{
			http: {
				method: "get",
				path: "deleteUser/",
				cors: true
			}
		}
	]
};

export const refreshToken = {
	handler: `${handlerPath(__dirname)}/handler.refreshToken`,
	description: "A function that handles the refresh token.",
	events: [
		{
			http: {
				method: "get",
				path: "refresh/",
				cors: true
			}
		}
	]
};

export const addCreator = {
	handler: `${handlerPath(__dirname)}/handler.addCreator`,
	description: "A function that handles the signup.",
	events: [
		{
			http: {
				method: "post",
				path: "signup",
				cors: true
			}
		}
	]
};

export const loginCreator = {
	handler: `${handlerPath(__dirname)}/handler.loginCreator`,
	description: "A function that handles the login.",
	events: [
		{
			http: {
				method: "post",
				path: "login",
				cors: true
			}
		}
	]
};

export const logoutCreator = {
	handler: `${handlerPath(__dirname)}/handler.logoutCreator`,
	description: "A function that logouts the creator.",
	events: [
		{
			http: {
				method: "get",
				path: "logout/",
				cors: true
			}
		}
	]
};
