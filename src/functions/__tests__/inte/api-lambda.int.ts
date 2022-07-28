import * as request from 'superagent';
import fetch from 'node-fetch'

const apiAcesspoint = {
    'development': 'https://pgxz0lthzj.execute-api.us-east-1.amazonaws.com/dev/'
}

// Tests using super agent
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

describe('Given an authorised request WHEN the post generateReport endpoint is called', () => {
    test('THEN it should respond with a 200', async () => {
        const { statusCode } = await request.post(apiAcesspoint.development+"generateReport");
        expect(statusCode).toBe(200);
        
    });

    test('THEN it should respond with a healthy body', async () => {
        const { body } = await request.post(apiAcesspoint.development+"generateReport");
        expect(body).toBeTruthy;
    });
})

// Tests with post requests

describe('Given ', () => {
    test('',async () => {
        const response = await fetch(apiAcesspoint+'signup', {
            method: 'POST',
            body: JSON.stringify({'email': 'test@gmail.com', 'username': 'test', 'password': 'test'}),
            headers:{'content-Type': 'application/json'}
        })

        expect(response.ok);
    })
})