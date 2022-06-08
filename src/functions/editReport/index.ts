import { handlerPath } from "@libs/handler-resolver";

export const editReport = {
    handler: `${handlerPath(__dirname)}/handler.editReport`,
    description: 'A function that edits a report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'editReport/',
                cors: true
            },
        },
    ],
};