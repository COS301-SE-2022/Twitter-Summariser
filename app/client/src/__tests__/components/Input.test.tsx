import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../../components/Input";

// mock functions for testing
const onChange = jest.fn(); // Mock function from jest to provide props

const mockValue = "";

const mockHandler = (event: any) => {
  event;
}

const mockFocus = () => {
  true;
}

const mockBlur = () => {
  false;
}

describe("Rendering Tests For all types of Inputs in the app", () => {


  // Test to see if email input is rendered for login page
	it("renders input for login", () => {
		render(<Input page="login" type="auth" inpFor="email" changeHandler={mockHandler} inputValue={mockValue} focus={mockFocus} blur={mockBlur} place="Email"/>);
		const input = screen.getByTestId("input_login_email");
		expect(input).toBeTruthy();
	});

  // Test to see if password input is rendered for login page
	it("renders input for login", () => {
		render(<Input page="login" type="auth" inpFor="password" changeHandler={mockHandler} inputValue={mockValue} place="Password"/>);
		const input = screen.getByTestId("input_login_password");
		expect(input).toBeTruthy();
	});
});

describe("On change Tests For all types of Inputs in the app", () => {

  // Test to see if email input is changed after receiving input for login page
	it("tests onChange on email input for login", () => {
		render(<Input page="login" type="auth" inpFor="email" changeHandler={mockHandler} inputValue={mockValue} focus={mockFocus} blur={mockBlur} place="Email"/>);
		const input = screen.getByTestId("input_login_email");
		fireEvent.change(input, { target: { value: "mockEmail" } }); // runs the mock function to change and input email
    expect(onChange).toHaveBeenCalled;
	});

  // Test to see if password input is rendered for login page
	it("tests onChange on password input for login", () => {
		render(<Input page="login" type="auth" inpFor="password" changeHandler={mockHandler} inputValue={mockValue} place="Password"/>);
		const input = screen.getByTestId("input_login_password");
		fireEvent.change(input, { target: { value: "mockPassword" } }); // runs the mock function to change and input email
    expect(onChange).toHaveBeenCalled;
	});
});


