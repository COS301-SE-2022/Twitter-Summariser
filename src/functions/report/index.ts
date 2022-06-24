import { handlerPath } from "@libs/handler-resolver";

//report generation
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

//retreival of all reports
export const getAllReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllReports`,
    description: 'A function that returns all of the reports in the system.',
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

//retrieval of drafts
export const getAllMyReports = {
    handler: `${handlerPath(__dirname)}/handler.getAllMyReports`,
    description: 'A function that returns all the users reports.',
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

//retrevial of a report
export const getReport = {
    handler: `${handlerPath(__dirname)}/handler.getReport`,
    description: 'A function that returns the content of a specific report.',
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

//cloning of a report
export const cloneReport = {
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