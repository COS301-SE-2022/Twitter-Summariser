import { handlerPath } from "@libs/handler-resolver";

export const analyse = {
	handler: `${handlerPath(__dirname)}/handler.analyse`,
	description: "A function that gets the sentiment and entity extraction of text.",
	events: [
		{
			http: {
				method: "post",
				path: "analyse/",
				cors: true
			}
		}
	]
};
