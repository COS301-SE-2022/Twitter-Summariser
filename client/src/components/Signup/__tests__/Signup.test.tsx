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
});
