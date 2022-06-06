import { handlerPath } from "@libs/handler-resolver";

export const getAllReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllReports`,
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