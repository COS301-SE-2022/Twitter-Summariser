import { render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom';

import Signup from '../Signup';

describe('Rendering Tests For Components Signup', () => {
    // Test to see if Signup is rendered
    it('renders Signup without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const up = screen.getByTestId('signup');
        expect(up).toBeTruthy();
    });

    // Testing to see if name input is rendered
    it('renders Name input without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const name_input = screen.getByTestId('name-input');
        expect(name_input).toBeTruthy();
    });

    // Testing to see if email input is rendered
    it('renders Email input without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const email_input = screen.getByTestId('email-input');
        expect(email_input).toBeTruthy();
    });

    // Testing to see if date input is rendered
    it('renders Date input without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const date_input = screen.getByTestId('date-input');
        expect(date_input).toBeTruthy();
    });

    // Testing to see if password input is rendered
    it('renders Password input without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const pass_input = screen.getByTestId('password-input');
        expect(pass_input).toBeTruthy();
    });

    // Testing to see if confirm password input is rendered
    it('renders Confirm Password input without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const confirmPass_input = screen.getByTestId('confirm-password-input');
        expect(confirmPass_input).toBeTruthy();
    });

    // Testing to see if submit button is rendered
    it('renders Submit button without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const btn_submit = screen.getByTestId('btn-submit');
        expect(btn_submit).toBeTruthy();
    });

    // Testing to see if sign in button is rendered
    it('renders Sign Up without crashing', () => {
        const { getByTestId } = render(<Signup />);
        const btn_signin = screen.getByTestId('btn-signin');
        expect(btn_signin).toBeTruthy();
    });
});
