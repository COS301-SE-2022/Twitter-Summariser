import { render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom';

import Login from '../Login';

describe('Rendering Tests For Components in Login', () => {
    // Test to see if Landing is rendered
    it('renders without crashing', () => {
        const { getByTestId } = render(<Login />);
        const up = screen.getByTestId('login');
        expect(up).toBeTruthy();
    });

    // Testing to see if username input is rendered
    it('renders Username input without crashing', () => {
        const { getByTestId } = render(<Login />);
        const user_input = screen.getByTestId('username-input');
        expect(user_input).toBeTruthy();
    });

    // Testing to see if password input is rendered
    it('renders Password input without crashing', () => {
        const { getByTestId } = render(<Login />);
        const pass_input = screen.getByTestId('password-input');
        expect(pass_input).toBeTruthy();
    });

    // Testing to see if submit button is rendered
    it('renders Submit without crashing', () => {
        const { getByTestId } = render(<Login />);
        const btn_submit = screen.getByTestId('btn-submit');
        expect(btn_submit).toBeTruthy();
    });

    // Testing to see if forgot password button is rendered
    it('renders Forgot Password without crashing', () => {
        const { getByTestId } = render(<Login />);
        const btn_forgot = screen.getByTestId('btn-forgot');
        expect(btn_forgot).toBeTruthy();
    });

    // Testing to see if sign up button is rendered
    it('renders Sign Up without crashing', () => {
        const { getByTestId } = render(<Login />);
        const btn_signup = screen.getByTestId('btn-signup');
        expect(btn_signup).toBeTruthy();
    });

});
