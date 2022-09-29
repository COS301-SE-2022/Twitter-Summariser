import { handlerPath } from "@libs/handler-resolver";

export const reportScheduler = {
	handler: `${handlerPath(__dirname)}/handler.reportScheduler`,
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

export const genScheduledReport = {
	handler: `${handlerPath(__dirname)}/handler.genScheduledReport`,
	description: "Function that checks which scheduled reports to make"
};

export const deleteEventRules = {
	handler: `${handlerPath(__dirname)}/handler.deleteEventRules`,
	description: "Function that deletes schedules",
	events: [
		{
			http: {
				method: "post",
				path: "deleteSchedule/",
				cors: true
			}
		}
	]
};
