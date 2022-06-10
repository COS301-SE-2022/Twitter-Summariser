import { handlerPath } from '@libs/handler-resolver';

export const search = {
    handler: `${handlerPath(__dirname)}/handler.search`,
    description: 'Function that allows for the searcing of tweets on the twitter API',
    events: [
        {
            http: {
                method: 'post',
                path: 'search/',
                cors: true
            },
        },
    ],
};
