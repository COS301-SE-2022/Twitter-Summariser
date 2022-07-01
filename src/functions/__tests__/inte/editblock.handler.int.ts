import * as request from 'superagent';
import { apiAcesspoint } from '@functions/__tests__/inte/resources'


describe('Given an authorised request WHEN the post editBlock endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post(apiAcesspoint.development+"editBlock");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post(apiAcesspoint.development+"editBlock");
        expect(body).toBeTruthy;
    });
})