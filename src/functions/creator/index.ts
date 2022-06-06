import { handlerPath } from '@libs/handler-resolver';
export const getAllCreators = {
    handler: `${handlerPath(__dirname)}/handler.getAllCreators`,
    describe: 'A function that returns all the creators in the system.',
    events: [
        {
            http: {
                method: 'get',
                path: 'creator/'
            },
        },
    ],
};

export const addCreator = {
    handler: `${handlerPath(__dirname)}/handler.addCreator`,
    describe: 'A function that handles the signup.',
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
    describe: 'A function that handles the login.',
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


