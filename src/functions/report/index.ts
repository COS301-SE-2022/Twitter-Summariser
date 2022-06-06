import { handlerPath } from "@libs/handler-resolver";

export const getAllReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllReports`,
    describe: 'A function that returns all of the reports in the system.',
    events: [
        {
            http: {
                method: 'get',
                path: 'getAllReports/',
                cors: true
            },
        },
    ],
};

export const getAllMyReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllMyReports`,
    describe: 'A function that returns all the users reports.',
    events: [
        {
            http: {
                method: 'post',
                path: 'getAllMyReports/',
                cors: true
            },
        },
    ],
};

export const getReport = {
    handler: `${handlerPath(__dirname)}/handler.getReport`,
    describe: 'A function that returns the content of a specific report.',
    events: [
        {
            http: {
                method: 'post',
                path: 'getReport/',
                cors: true
            },
        },
    ],
};