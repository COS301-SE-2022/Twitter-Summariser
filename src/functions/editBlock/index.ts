import { handlerPath } from "@libs/handler-resolver";

export const editBlock = {
    handler: `${handlerPath(__dirname)}/handler.editBlock`,
    description: 'A function that edits a Block.',
    events: [
        {
            http: {
                method: 'post',
                path: 'editBlock/',
                cors: true
            },
        },
    ],
};