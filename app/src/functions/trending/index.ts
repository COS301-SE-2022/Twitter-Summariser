import { handlerPath } from "@libs/handler-resolver";

export const getTrendingTopics = {
	handler: `${handlerPath(__dirname)}/handler.getTrendingTopics`,
	description: "Function that return trending topics",
	events: [
		{
			http: {
				method: "post",
				path: "getTrendingTopics/",
				cors: true
			}
		}
	]
};
