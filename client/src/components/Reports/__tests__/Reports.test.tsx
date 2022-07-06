import { /*fireEvent*/, render, screen } from "@testing-library/react";
// import React from 'react';
// import ReactDOM from 'react-dom/client';
import Reports from "../Reports";

describe("Rendering Tests For Components in Reports", () => {
	// Test to see if Report is rendered
	it("renders reports without crashing", () => {
		render(<Reports />);
		const home = screen.getByTestId("report");
		expect(home).toBeTruthy();
	});

	// Testing to see if Search bar is rendered
	// it("renders search bar without crashing", () => {
	// 	render(<Reports />);
	// 	const input = screen.getByTestId("search");
	// 	expect(input).toBeTruthy();
	// });

	// Testing to see if Results are render on to page is rendered
	it("renders results div without crashing", () => {
		render(<Reports />);
		const input = screen.getByTestId("reports");
		expect(input).toBeTruthy();
	});
});

// Tests that the search bar recieves text correctly
// describe("Testing That Search Bar Receieves Input", () => {
// 	// Function that mocks data to the search bar
// 	it("Testing That Search bar Updates on User Input", () => {
// 		// const onChange = jest.fn(); // Mock function from jest to provide props
// 		render(<Reports />); // Rendering search bar to search
// 		const searchInput = screen.queryByTestId("search") as HTMLInputElement; // Sets search bar defualt text
// 		fireEvent.change(searchInput, { target: { value: "Test Search" } }); // runs the mock function to change and search text
// 		expect(searchInput.value).toBe("Test Search"); // Checking The condition
// 		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
// 		// expect(onChange).toHaveBeenCalled;
// 	});

// 	// Function that tests that when typing in Search an onChange Function is called
// 	// test('Testing That search changes div(With results that are found)', () => {
// 	//     const onChange = jest.fn(); // Mock function from jest to provide props
// 	//     const { queryByTestId } = render(<Reports />); // Rendering search bar to search
// 	//     const searchInput = screen.queryByTestId('search'); // Sets search bar defualt text
// 	//     fireEvent.change(searchInput, { target: { value: 'Test Search' } }); // runs the mock function to change and search text
// 	//     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
// 	//     expect(onChange).toHasBeenCalled;
// 	// });
// });
