import { handlerPath } from '@libs/handler-resolver';

export const search = {
    handler: `${handlerPath(__dirname)}/handler.search`,
    events: [
        {
            http: {
                method: 'get',
                path: 'search/',
            },
        },
    ],
};

/*export const getTweetsInTopic = {
    handler: `${handlerPath(__dirname)}/handler.getTweetsInTopic`,
    events: [
        {
            http: {
                method: 'get',
                path: 'trending/',
            },
        },
    ],
};*/