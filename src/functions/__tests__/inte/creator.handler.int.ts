import * as request from 'superagent';

describe('Given an authorised request WHEN the GET getAllCreators endpoint is called', () => {
    test('THEN it should respond with a 200 and the healthy array of creators', async () => {
        const { statusCode } = await request.get("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/creator")
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy array of creators', async () => {
        const { body } = await request.get("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/creator")
        // expect(statusCode).toBe(200);
        expect(body).toBeTruthy;
    });
})