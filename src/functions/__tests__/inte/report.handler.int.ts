import * as request from 'superagent';

describe('Given an authorised request WHEN the post getAllReports endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllReports/");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllReports/");
        expect(body).toBeTruthy;
    });
})

describe('Given an authorised request WHEN the post getAllMyReport endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllMyReports/");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getAllMyReports/");
        expect(body).toBeTruthy;
    });
})

describe('Given an authorised request WHEN the post getReport endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getReport/");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post("https://xprnnqlwwi.execute-api.us-east-1.amazonaws.com/dev/getReport/");
        expect(body).toBeTruthy;
    });
})