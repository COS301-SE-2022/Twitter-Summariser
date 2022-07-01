import { fireEvent, render, screen } from '@testing-library/react';
// import React from 'react';
import Home from '../Home';

describe('Rendering Tests For Components in Home', () => {
    // Test to see if Home is rendered
    // it('renders Home without crashing', () => {
    //     expect(home).toBeTruthy();
    // });

    it('renders Home without crashing', () => {
        render(<Home />);
        const home = screen.getByTestId('home');
        expect(home).toBeTruthy();
    });

    // Testing to see if Search bar is rendered
    it('renders Search bar without crashing', () => {
        render(<Home />);
        const input = screen.getByTestId('search');
        expect(input).toBeTruthy();
    });

    // Testing to see if Results are render on to page is rendered
    it('renders result div without crashing', () => {
        render(<Home />);
        const input = screen.getByTestId('result');
        expect(input).toBeTruthy();
    });

    // Testing to see if Search button is rendered
    it('renders Submit button without crashing', () => {
        render(<Home />);
        const btn_search = screen.getByTestId('btn-search');
        expect(btn_search).toBeTruthy();
    });

    // Testing to see if Generate button is rendered
    it('renders Generate button without crashing', () => {
        render(<Home />);
        const btn_generate = screen.getByTestId('btn-generate');
        expect(btn_generate).toBeTruthy();
    });

    // Testing to see if Generated report button is rendered
    // it('renders Generated report button without crashing', () => {
    //     const { getByTestId } = render(<Home />);
    //     const btn_report = screen.getByTestId('btn-report');
    //     expect(btn_report).toBeTruthy();
    // });

    // Testing to see if Num Tweets dropdown is rendered
    it('renders Num Tweets filter without crashing', () => {
        render(<Home />);
        const select_num_tweets = screen.getByTestId('select-num-tweets');
        expect(select_num_tweets).toBeTruthy();
    });

    // Testing to see if filter dropdown is rendered
    it('renders filter options without crashing', () => {
        render(<Home />);
        const select_filter = screen.getByTestId('select-filter');
        expect(select_filter).toBeTruthy();
    });

    // Testing to see if sort dropdown is rendered
    it('renders sort options without crashing', () => {
        render(<Home />);
        const select_sort = screen.getByTestId('select-sort');
        expect(select_sort).toBeTruthy();
    });
});

// Tests that the search bar recieves text correctly
describe('Testing That Search Bar Receieves Input', () => {
    // Function that mocks data to the search bar and onChange Function is called
    it('Testing That Search bar Updates on User Input', () => {
        // const onChange = jest.fn(); // Mock function from jest to provide props
        render(<Home />); // Rendering search bar to search
        const searchInput = (screen.queryByTestId('search') as HTMLInputElement); // Sets search bar defualt text
        fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
        expect(searchInput.value).toBe('Test Search'); // Checking The condition
        // expect(onChange).toHaveBeenCalled;
    });

    // // Function that tests that when typing in Search an onChange Function is called
    // it('Testing That onChange is called us user types into input', () => {
    //     // const onChange = jest.fn(); // Mock function from jest to provide props
    //     render(<Home />); // Rendering search bar to search
    //     const searchInput = (screen.queryByTestId('search') as HTMLInputElement); // Sets search bar defualt text
    //     fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
    //     // expect(onChange).toHasBeenCalled;
    // });
});
