import { render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom';

import Logo from '../Logo';

describe('Rendering Tests For Components in Landing', () => {
    // Test to see if Landing is rendered
    it('renders without crashing', () => {
        const { getByTestId } = screen.render(<Logo />);
        const landing = screen.getByTestId('logo');
        expect(landing).toBeTruthy();
    });
});
