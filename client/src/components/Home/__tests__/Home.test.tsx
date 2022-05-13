import { fireEvent, queryByRole, render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '../Home';

describe('Rendering Tests For Components in Landing', () => {
    // Test to see if Landing is rendered
    it('renders landing without crashing', () => {
        const { getByTestId } = screen.render(<Home />);
        const home = screen.getByTestId('home');
        expect(home).toBeTruthy();
    });

    // Testing to see if Search bar is rendered
    it('renders search bar without crashing', () => {
        const { getByTestId } = screen.render(<Home />);
        const input = screen.getByTestId('search');
        expect(input).toBeTruthy();
    });

    // Testing to see if Results are render on to page is rendered
    it('renders without crashing', () => {
        const { getByTestId } = screen.render(<Home />);
        const inpt = screen.getByTestId('results');
        expect(inpt).toBeTruthy();
    });
});

// Tests that the search bar recieves text correctly
describe('Testing That Search Bar Receieves Input', () => {
    // Function that mocks data to the search bar and onChange Function is called
    it('Testing typing results are recieved', () => {
        const onchange = jest.fn(); // Mock function from jest to provide props
        const { queryByTestId } = screen.render(<Home />); // Rendering search bar to search
        const searchInput = screen.queryByTestId('search'); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(searchInput.value).toBe('Test Search'); // Checking The condition
        expect(onchange).toHaveBeenCalled();
    });

    // Function that tests that when typing in Search an onChange Function is called
    test('Testing onChange is called as typing happens', () => {
        const onChange = jest.fn(); // Mock function from jest to provide props
        const { queryByTestId } = screen.render(<Home />); // Rendering search bar to search
        const srchInput = screen.queryByTestId('search'); // Sets search bar defualt text
        fireEvent.change(srchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(onChange).toHasBeenCalled();
    });
});
