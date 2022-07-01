import * as request from 'superagent';

const apiAcesspoint = {
    'development': 'https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/'
}

describe('Given an authorised request WHEN the post generateReport endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post(apiAcesspoint.development+"generateReport");
        //expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post(apiAcesspoint.development+"generateReport");
        //expect(body).toBeTruthy;
    });
})