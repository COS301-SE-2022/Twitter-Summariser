/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fireEvent, render, screen } from '@testing-library/react';

// import ReactDOM from 'react-dom';

import Signup from '../Signup';

describe('Rendering Tests For Components Signup', () => {
    // Test to see if Signup is rendered
    it('renders Signup without crashing', () => {
        render(<Signup />);
        const up = screen.getByTestId('signup');
        expect(up).toBeTruthy();
    });

    // Testing to see if name input is rendered
    it('renders Name input without crashing', () => {
        render(<Signup />);
        const name_input = screen.getByTestId('name-input');
        expect(name_input).toBeTruthy();
    });

    // Testing to see if email input is rendered
    it('renders Email input without crashing', () => {
        render(<Signup />);
        const email_input = screen.getByTestId('email-input');
        expect(email_input).toBeTruthy();
    });

    // Testing to see if date input is rendered
    it('renders Date input without crashing', () => {
        render(<Signup />);
        const date_input = screen.getByTestId('date-input');
        expect(date_input).toBeTruthy();
    });

    // Testing to see if password input is rendered
    it('renders Password input without crashing', () => {
        render(<Signup />);
        const pass_input = screen.getByTestId('password-input');
        expect(pass_input).toBeTruthy();
    });

    // Testing to see if confirm password input is rendered
    it('renders Confirm Password input without crashing', () => {
        render(<Signup />);
        const confirmPass_input = screen.getByTestId('confirm-password-input');
        expect(confirmPass_input).toBeTruthy();
    });

    // Testing to see if submit button is rendered
    it('renders Submit button without crashing', () => {
        render(<Signup />);
        const btn_submit = screen.getByTestId('btn-submit');
        expect(btn_submit).toBeTruthy();
    });

    // Testing to see if sign in button is rendered
    it('renders Sign Up without crashing', () => {
        render(<Signup />);
        const btn_signin = screen.getByTestId('btn-signin');
        expect(btn_signin).toBeTruthy();
    });
});

    // Tests that the input fields recieve text correctly
describe('Testing That Input fields Receieves Input', () => {
    // Function that mocks data to the input fields and onChange Function is called
    it('Testing That Name input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Signup />); // Rendering signup page with relevant components
        const name_input = (screen.queryByTestId('name-input') as HTMLInputElement); // Sets name input field to defualt text
        fireEvent.change(name_input, { target: { value: 'Test Name' } }); // runs the mock function to change and input name
        expect(name_input.value).toBe('Test Name'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

    it('Testing That Email input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Signup />); // Rendering signup page with relevant components
        const email_input = (screen.queryByTestId('email-input') as HTMLInputElement); // Sets email input field to defualt text
        fireEvent.change(email_input, { target: { value: 'Test Email' } }); // runs the mock function to change and input email
        expect(email_input.value).toBe('Test Email'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

    // it('Testing That Date input Updates on User Input', () => {
    //     const onChange = jest.fn(); // Mock function from jest to provide props
    //     const { queryByTestId } = render(<Signup />); // Rendering signup page with relevant components
    //     const date_input = screen.queryByTestId('date-input'); // Sets date input field to defualt text
    //     fireEvent.change(date_input, { target: { value: '20/05/2022' } }); // runs the mock function to change and input date
    //     expect(date_input.value).toBe('20/05/2022'); // Checking The condition
    //     expect(onChange).toHaveBeenCalled;
    // });

    it('Testing That Password input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Signup />); // Rendering login page with relevant components
        const password_input = (screen.queryByTestId('password-input') as HTMLInputElement); // Sets password input field to defualt text
        fireEvent.change(password_input, { target: { value: 'Test Password' } }); // runs the mock function to change and input password
        expect(password_input.value).toBe('Test Password'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

    it('Testing That Confirm Password input Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Signup />); // Rendering login page with relevant components
        const confirm_password_input = (screen.queryByTestId('confirm-password-input') as HTMLInputElement); // Sets confirm password input field to defualt text
        fireEvent.change(confirm_password_input, { target: { value: 'Test Confirm Password' } }); // runs the mock function to change and input password
        expect(confirm_password_input.value).toBe('Test Confirm Password'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

});
