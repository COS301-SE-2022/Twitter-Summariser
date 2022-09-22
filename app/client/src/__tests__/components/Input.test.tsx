import { render, screen } from "@testing-library/react";
import Input from "../../components/Input";

describe("Rendering Tests For all types of Inputs in the app", () => {
  // mock functions for testing
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


