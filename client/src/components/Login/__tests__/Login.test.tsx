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
});
