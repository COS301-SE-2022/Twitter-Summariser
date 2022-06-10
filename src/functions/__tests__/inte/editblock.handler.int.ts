import * as request from 'superagent';

describe('Given an authorised request WHEN the post editBlock endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/editBlock");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/editBlock");
        expect(body).toBeTruthy;
    });
})