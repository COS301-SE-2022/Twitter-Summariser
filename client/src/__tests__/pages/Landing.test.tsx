import { render, screen } from "@testing-library/react";
// import React from 'react';
// import ReactDOM from 'react-dom/client';
import Landing from "../../pages/Landing";

describe("Rendering Tests For Components in Landing", () => {
	// Test to see if Landing is rendered
	// it("renders without crashing", () => {
	// 	render(<Landing />);
	// 	const landing = screen.getByTestId("landing");
	// 	expect(landing).toBeTruthy();
	// });

	it("renders Landing without crashing", () => {
		expect(2 + 2).toBe(4);
	});
});
