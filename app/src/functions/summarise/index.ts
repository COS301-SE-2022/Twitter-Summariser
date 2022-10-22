import { handlerPath } from "@libs/handler-resolver";

export const summarize = {
	handler: `${handlerPath(__dirname)}/handler.summarize`,
	description: "A function that generates a summary.",
	events: [
		{
			http: {
				method: "post",
				path: "summarize/",
				cors: true
			}
		}
	]
};
