import { handlerPath } from "@libs/handler-resolver";

export const generateReport = {
    handler: `${handlerPath(__dirname)}/handler.generateReport`,
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