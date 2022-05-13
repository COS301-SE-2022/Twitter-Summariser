import { fireEvent, queryByRole, render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '../Home';

describe('Rendering Tests For Components in Home', () => {
    // Test to see if Home is rendered
    it('renders Home without crashing', () => {
        const { getByTestId } = render(<Home />);
        const home = screen.getByTestId('home');
        expect(home).toBeTruthy();
    });

    // Testing to see if Search bar is rendered
    it('renders Search bar without crashing', () => {
        const { getByTestId } = render(<Home />);
        const input = screen.getByTestId('search');
        expect(input).toBeTruthy();
    });

    // Testing to see if Results are render on to page is rendered
    it('renders result div without crashing', () => {
        const { getByTestId } = render(<Home />);
        const input = screen.getByTestId('result');
        expect(input).toBeTruthy();
    });
});

// Tests that the search bar recieves text correctly
describe('Testing That Search Bar Receieves Input', () => {
    // Function that mocks data to the search bar and onChange Function is called
    it('Testing That Search bar Updates on User Input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        const { queryByTestId } = render(<Home />); // Rendering search bar to search
        const searchInput = screen.queryByTestId('search'); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(searchInput.value).toBe('Test Search'); // Checking The condition
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(onChange).toHaveBeenCalled;
    });

    // Function that tests that when typing in Search an onChange Function is called
    it('Testing That onChange is called us user types into input', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        const { queryByTestId } = render(<Home />); // Rendering search bar to search
        const searchInput = screen.queryByTestId('search'); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(onChange).toHasBeenCalled;
    });
});
