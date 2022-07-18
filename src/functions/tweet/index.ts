import { handlerPath } from "@libs/handler-resolver";

export const searchTweets = {
	handler: `${handlerPath(__dirname)}/handler.searchTweets`,
	description: "Function that allows for the searcing of tweets on the twitter API",
	events: [
		{
			http: {
				method: "post",
				path: "searchTweets/",
				cors: true
			}
		}
	]
};

// Adding a custom tweet
export const addCustomTweet = {
	handler: `${handlerPath(__dirname)}/handler.addCustomTweet`,
	description: "A function that adds customer tweets.",
	events: [
		{
			http: {
				method: "post",
				path: "addCustomTweet/",
				cors: true
			}
		}
	]
};
