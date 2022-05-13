import { fireEvent, queryByRole, render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '../Home';

describe('Rendering Tests For Components in Landing', () => {
    // Test to see if Landing is rendered
    it('renders Landing without crashing', () => {
        const { getByTestId } = render(<Home />);
        const home = getByTestId('home');
        expect(home).toBeTruthy();
    });

    // Testing to see if Search bar is rendered
    it('renders Search bar without crashing', () => {
        const { getByTestId } = render(<Home />);
        const input = getByTestId('search');
        expect(input).toBeTruthy();
    });

    // Testing to see if Results are render on to page is rendered
    it('renders result div without crashing', () => {
        const { getByTestId } = render(<Home />);
        const input = getByTestId('result');
        expect(input).toBeTruthy();
    });
});

// Tests that the search bar recieves text correctly
describe('Testing That Search Bar Receieves Input', () => {
    // Function that mocks data to the search bar and onChange Function is called
    it('Testing That Search bar Updates on Change', () => {
        const onChange = jest.fn((value) => {}); // Mock function from jest to provide props
        const { queryByTestId } = render(<Home />); // Rendering search bar to search
        const searchInput = queryByTestId ('search'); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(searchInput.value).toBe('Test Search'); // Checking The condition
        expect(onChange).toHaveBeenCalled;
    });

    // Function that tests that when typing in Search an onChange Function is called
    it('Testing That search changes div(With results that are found)', () => {
        const onChange = jest.fn((value) => {}); // Mock function from jest to provide props
        const { queryByTestId } = render(<Home />); // Rendering search bar to search
        const searchInput = queryByTestId('search'); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(onChange).toHasBeenCalled;
    });
});
