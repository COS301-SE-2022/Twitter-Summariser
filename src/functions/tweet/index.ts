import { handlerPath } from '@libs/handler-resolver';

export const searchTweets = {
    handler: `${handlerPath(__dirname)}/handler.searchTweets`,
    description: 'Function that allows for the searcing of tweets on the twitter API',
    events: [
        {
            http: {
                method: 'post',
                path: 'searchTweets/',
                cors: true
            },
        },
    ],
};
