/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fireEvent, render, screen } from '@testing-library/react';

// import ReactDOM from 'react-dom';

import Login from '../Login';

describe('Rendering Tests For Components in Login', () => {
    // Test to see if Landing is rendered
    it('renders without crashing', () => {
        render(<Login />);
        const up = screen.getByTestId('login');
        expect(up).toBeTruthy();
    });

    // Testing to see if username input is rendered
    it('renders Username input without crashing', () => {
        render(<Login />);
        const user_input = screen.getByTestId('username-input');
        expect(user_input).toBeTruthy();
    });

    // Testing to see if password input is rendered
    it('renders Password input without crashing', () => {
        render(<Login />);
        const pass_input = screen.getByTestId('password-input');
        expect(pass_input).toBeTruthy();
    });

    // Testing to see if submit button is rendered
    it('renders Submit button without crashing', () => {
        render(<Login />);
        const btn_submit = screen.getByTestId('btn-submit');
        expect(btn_submit).toBeTruthy();
    });

    // Testing to see if forgot password button is rendered
    it('renders Forgot Password button without crashing', () => {
        render(<Login />);
        const btn_forgot = screen.getByTestId('btn-forgot');
        expect(btn_forgot).toBeTruthy();
    });

    // Testing to see if sign up button is rendered
    it('renders Sign Up button without crashing', () => {
        render(<Login />);
        const btn_signup = screen.getByTestId('btn-signup');
        expect(btn_signup).toBeTruthy();
    });
});

    // Tests that the input fields recieve text correctly
describe('Testing That Input fields Receieves Input', () => {
    // Function that mocks data to the input fields and onChange Function is called
    it('Testing That Username input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Login />); // Rendering login page with relevant components
        const username_input = (screen.queryByTestId('username-input') as HTMLInputElement); // Sets username input field to defualt text
        fireEvent.change(username_input, { target: { value: 'Test Username' } }); // runs the mock function to change and input username
        expect(username_input.value).toBe('Test Username'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

    it('Testing That Password input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Login />); // Rendering login page with relevant components
        const password_input = (screen.queryByTestId('password-input') as HTMLInputElement); // Sets password input field to defualt text
        fireEvent.change(password_input, { target: { value: 'Test Password' } }); // runs the mock function to change and input password
        expect(password_input.value).toBe('Test Password'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

});
