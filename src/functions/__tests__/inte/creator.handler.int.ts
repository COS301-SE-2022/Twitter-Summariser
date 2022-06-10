import * as request from 'superagent';

describe('Given an authorised request WHEN the GET getAllCreators endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.get("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/creator");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy array of creators', async () => {
        const { body } = await request.get("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/creator");
        expect(body).toBeTruthy;
    });
})

describe('Given an authorised request WHEN the post signin endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/login");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/login");
        expect(body).toBeTruthy;
    });
})
