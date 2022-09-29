import { handlerPath } from "@libs/handler-resolver";

export const profileImageUpload = {
	handler: `${handlerPath(__dirname)}/handler.profileImageUpload`,
	description: "A function that uploads a profile image.",
	events: [
		{
			http: {
				method: "post",
				path: "profileImageUpload/",
				cors: true,
				authorizer: {
					name: "verifyJWT",
					type: "Token"
				}
			}
		}
	]
};
