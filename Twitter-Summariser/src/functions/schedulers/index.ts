import { handlerPath } from "@libs/handler-resolver";

export const reportScheduler = {
	handler: `${handlerPath(__dirname)}/handler.reportSceduler`,
	description: "Function that schedules a report to be made.",
	events: [
		{
			http: {
				method: "post",
				path: "reportScheduler/",
				cors: true,
				authorizer: {
					name: "verifyJWT",
					type: "Token"
				}
			}
		}
	]
};
