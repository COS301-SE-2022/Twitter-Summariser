import { handlerPath } from "@libs/handler-resolver";

export const getAllReports = {
    handler: `${handlerPath(__dirname)}/handler.cloneReport`,
    description: 'A function that clones a report.',
    events: [
        {
            http: {
                method: 'get',
                path: 'cloneReport/',
                cors: true
            },
        },
    ],
};