/* eslint-disable  @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

describe("Rendering Tests For Components in Login", () => {
	// Test to see if Landing is rendered
	it("renders without crashing", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const up = screen.getByTestId("login");
		expect(up).toBeTruthy();
	});

	//     // Testing to see if username input is rendered
	it("renders Username input without crashing", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const usernameInput = screen.getByTestId("username-input");
		expect(usernameInput).toBeTruthy();
	});

	//     // Testing to see if password input is rendered
	it("renders Password input without crashing", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const passwordInput = screen.getByTestId("password-input");
		expect(passwordInput).toBeTruthy();
	});

	//     // Testing to see if submit button is rendered
	it("renders Submit button without crashing", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const btnSubmit = screen.getByTestId("btn-submit");
		expect(btnSubmit).toBeTruthy();
	});

	//     // Testing to see if forgot password button is rendered
	// it("renders Forgot Password button without crashing", () => {
	// 	render(
	// 	<BrowserRouter>
	// 			<Login />
	// 		</BrowserRouter>);
	// 	const btnForgot = screen.getByTestId("btn-forgot");
	// 	expect(btnForgot).toBeTruthy();
	// });

	//     // Testing to see if sign up button is rendered
	it("renders Sign Up button without crashing", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const btnSignUp = screen.getByTestId("btn-signup");
		expect(btnSignUp).toBeTruthy();
	});
	// });

	// // Tests that the input fields recieve text correctly
	describe("Testing That Input fields Receieves Input", () => {
		// Function that mocks data to the input fields and onChange Function is called
		it("Testing That Username input Updates on User Input", () => {
			const onChange = jest.fn(); // Mock function from jest to provide props
			render(
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			); // Rendering login page with relevant components
			const userInput = screen.queryByTestId("username-input") as HTMLInputElement; // Sets username input field to defualt text
			fireEvent.change(userInput, { target: { value: "Test Username" } }); // runs the mock function to change and input username
			expect(userInput.value).toBe("Test Username"); // Checking The condition
			expect(onChange).toHaveBeenCalled;
		});

		it("Testing That Password input Updates on User Input", () => {
			const onChange = jest.fn(); // Mock function from jest to provide props
			render(
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			); // Rendering login page with relevant components
			const passInput = screen.queryByTestId("password-input") as HTMLInputElement; // Sets password input field to defualt text
			fireEvent.change(passInput, { target: { value: "Test Password" } }); // runs the mock function to change and input password
			expect(passInput.value).toBe("Test Password"); // Checking The condition
			expect(onChange).toHaveBeenCalled;
		});
	});
});
