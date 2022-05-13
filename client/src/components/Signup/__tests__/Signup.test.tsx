import { render, screen } from '@testing-library/react';

import Signup from '../Signup';

describe('Rendering Tests For Components Signup', () => {
    // Test to see if Landing is rendered
    it('renders without crashing', () => {
        const { getByTestId } = screen.render(<Signup />);
        const up = screen.getByTestId('signup');
        expect(up).toBeTruthy();
    });
});
