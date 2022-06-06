import { handlerPath } from "@libs/handler-resolver";

export const getAllResultSet = {
    handler: `${handlerPath(__dirname)}/handler.getAllResultSet`,
    describe: 'Function that returns all the resultsets a specific user has.',
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
    describe: 'Function that returns the contents of a result set, e.g tweets and resultset info.',
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