import { handlerPath } from '@libs/handler-resolver';
export const getAllCreators = {
    handler: `${handlerPath(__dirname)}/handler.getAllCreators`,
    events: [
        {
            http: {
                method: 'get',
                path: 'creator/',
                cors: true
            },
        },
    ],
};

export const addCreator = {
    handler: `${handlerPath(__dirname)}/handler.addCreator`,
    events: [
        {
            http: {
                method: 'post',
                path: 'signup',
                cors: true
            },
        },
    ],
};

export const loginCreator = {
    handler: `${handlerPath(__dirname)}/handler.loginCreator`,
    events: [
        {
            http: {
                method: 'post',
                path: 'login',
                cors: true
            }
        }
    ]
};


