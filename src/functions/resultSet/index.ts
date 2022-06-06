import { handlerPath } from "@libs/handler-resolver";

export const getAllResultSet = {
    handler: `${handlerPath(__dirname)}/handler.getAllResultSet`,
    events: [
        {
            http: {
                method: 'post',
                path: 'getAllResultSet/',
                cors: true
            },
        },
    ],
};

export const getResultSet = {
    handler: `${handlerPath(__dirname)}/handler.getResultSet`,
    events: [
        {
            http: {
                method: 'post',
                path: 'getResultSet/',
                cors: true
            },
        },
    ],
};