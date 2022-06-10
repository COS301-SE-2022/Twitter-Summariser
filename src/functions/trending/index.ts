import { handlerPath } from '@libs/handler-resolver';

export const getTrendingTopics = {
    handler: `${handlerPath(__dirname)}/handler.getTrendingTopics`,
    events: [
        {
            http: {
                method: 'get',
                path: 'trending/',
                cors: true
            },
        },
    ],
};

export const getTweetsInTopic = {
    handler: `${handlerPath(__dirname)}/handler.getTweetsInTopic`,
    events: [
        {
            http: {
                method: 'get',
                path: 'trending/',
                cors: true
            },
        },
    ],
};