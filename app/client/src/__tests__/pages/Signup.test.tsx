/* eslint-disable  @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from "@testing-library/react";
// import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Signup from "../../pages/Signup";
import axios from "../../api/ConfigAxios";

describe("Rendering Tests For Components Signup", () => {
	// Test to see if Signup is rendered
	it("renders Signup without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);

		const up = screen.getByTestId("signup");
		expect(up).toBeTruthy();
	});

	//     // Testing to see if name input is rendered
	it("renders username input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const nameInput = screen.getByTestId("name-input");
		expect(nameInput).toBeTruthy();
	});

	//     // Testing to see if email input is rendered
	it("renders Email input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const emailInput = screen.getByTestId("email-input");
		expect(emailInput).toBeTruthy();
	});

	//     // Testing to see if password input is rendered
	it("renders Password input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const passInput = screen.getByTestId("password-input");
		expect(passInput).toBeTruthy();
	});

	//     // Testing to see if confirm password input is rendered
	it("renders Confirm Password input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const confirmPassInput = screen.getByTestId("confirm-password-input");
		expect(confirmPassInput).toBeTruthy();
	});

	//     // Testing to see if submit button is rendered
	it("renders Submit button without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const btnSubmit = screen.getByTestId("btn-submit");
		expect(btnSubmit).toBeTruthy();
	});

	//     // Testing to see if sign in button is rendered
	it("renders Sign Up without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const btnSignIn = screen.getByTestId("btn-signin");
		expect(btnSignIn).toBeTruthy();
	});
});

// // Tests that the input fields recieve text correctly
describe("Testing That Input fields Receieves Input", () => {
	// Function that mocks data to the input fields and onChange Function is called
	it("Testing That Name input Updates on User Input", () => {
		const onChange = jest.fn(); // Mock function from jest to provide props
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		); // Rendering signup page with relevant components
		const nameInput2 = screen.queryByTestId("name-input") as HTMLInputElement; // Sets name input field to defualt text
		fireEvent.change(nameInput2, { target: { value: "Test Name" } }); // runs the mock function to change and input name
		expect(nameInput2.value).toBe("Test Name"); // Checking The condition
		expect(onChange).toHaveBeenCalled;
	});

	it("Testing That Email input Updates on User Input", () => {
		const onChange = jest.fn(); // Mock function from jest to provide props
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		); // Rendering signup page with relevant components
		const emailInput2 = screen.queryByTestId("email-input") as HTMLInputElement; // Sets email input field to defualt text
		fireEvent.change(emailInput2, { target: { value: "Test Email" } }); // runs the mock function to change and input email
		expect(emailInput2.value).toBe("Test Email"); // Checking The condition
		expect(onChange).toHaveBeenCalled;
	});

	//     // it('Testing That Date input Updates on User Input', () => {
	//     //     const onChange = jest.fn(); // Mock function from jest to provide props
	//     //     const { queryByTestId } = render(<Signup />); // Rendering signup page with relevant components
	//     //     const date_input = screen.queryByTestId('date-input'); // Sets date input field to defualt text
	//     //     fireEvent.change(date_input, { target: { value: '20/05/2022' } }); // runs the mock function to change and input date
	//     //     expect(date_input.value).toBe('20/05/2022'); // Checking The condition
	//     //     expect(onChange).toHaveBeenCalled;
	//     // });

	it("Testing That Password input Updates on User Input", () => {
		const onChange = jest.fn(); // Mock function from jest to provide props
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		); // Rendering login page with relevant components
		const passwordInput2 = screen.queryByTestId("password-input") as HTMLInputElement; // Sets password input field to defualt text
		fireEvent.change(passwordInput2, { target: { value: "Test Password" } }); // runs the mock function to change and input password
		expect(passwordInput2.value).toBe("Test Password"); // Checking The condition
		expect(onChange).toHaveBeenCalled;
	});

	it("Testing That Confirm Password input Updates on User Input", () => {
		const onChange = jest.fn(); // Mock function from jest to provide props
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		); // Rendering login page with relevant components
		const confirmPasswordInput = screen.queryByTestId(
			"confirm-password-input"
		) as HTMLInputElement; // Sets confirm password input field to defualt text
		fireEvent.change(confirmPasswordInput, { target: { value: "Test Confirm Password" } }); // runs the mock function to change and input password
		expect(confirmPasswordInput.value).toBe("Test Confirm Password"); // Checking The condition
		expect(onChange).toHaveBeenCalled;
	});
});

describe("Rendering Tests For Components Signup", () => {
	// Test to see if Signup is rendered
	it("renders Signup without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);

		const up = screen.getByTestId("signup");
		expect(up).toBeTruthy();
	});

	//     // Testing to see if name input is rendered
	it("renders username input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const nameInput = screen.getByTestId("name-input");
		expect(nameInput).toBeTruthy();
	});

	//     // Testing to see if email input is rendered
	it("renders Email input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const emailInput = screen.getByTestId("email-input");
		expect(emailInput).toBeTruthy();
	});

	//     // Testing to see if password input is rendered
	it("renders Password input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const passInput = screen.getByTestId("password-input");
		expect(passInput).toBeTruthy();
	});

	//     // Testing to see if confirm password input is rendered
	it("renders Confirm Password input without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const confirmPassInput = screen.getByTestId("confirm-password-input");
		expect(confirmPassInput).toBeTruthy();
	});

	//     // Testing to see if submit button is rendered
	it("renders Submit button without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const btnSubmit = screen.getByTestId("btn-submit");
		expect(btnSubmit).toBeTruthy();
	});

	//     // Testing to see if sign in button is rendered
	it("renders Sign Up without crashing", () => {
		render(
			<BrowserRouter>
				<Signup />
			</BrowserRouter>
		);
		const btnSignIn = screen.getByTestId("btn-signin");
		expect(btnSignIn).toBeTruthy();
	});
});

// // Tests that the input fields recieve text correctly
// 	describe("SignUp integration tests", () => {
// 	    // Function that mocks data to the input fields and onChange Function is called
// 	    it("Testing That Response is received from API", async () => {
// 	        // render(
// 					// <BrowserRouter>
// 					// 	<Signup />
// 					// </BrowserRouter>); // Rendering signup page with relevant components

// 					const controller = new AbortController();
// 					const userValidatedData = {email: "tester@gmail.com", username: "tester", password: "Password@123"}

// 					const response = await axios.post("signup", JSON.stringify(userValidatedData), {
// 					withCredentials: true,
// 					signal: controller.signal
// 					});

// 					test("Test that API receieves input", async () => {
// 						expect(response).toBeDefined;
// 					});

// 	    });

// });
