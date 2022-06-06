import { handlerPath } from "@libs/handler-resolver";

export const generateReport = {
    handler: `${handlerPath(__dirname)}/handler.generateReport`,
    description: 'A function that generates a report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'generateReport/',
                cors: true
            },
        },
    ],
};