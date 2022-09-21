import { handlerPath } from "@libs/handler-resolver";


export const warmupTextSummariser = {
	handler: `${handlerPath(__dirname)}/handler.warmupTextSummariser`,
	description: "A function that warms up the text summariser.",
	events: [
		{
			schedule: "rate(5 minutes)"
		}
	]
};