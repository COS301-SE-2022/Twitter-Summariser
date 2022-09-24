import { render, screen } from "@testing-library/react";
import AuthLink from "../../components/AuthLink";

const mockHandler = (event: any) => {
	event.preventDefault();
};

const mockLinkData = {
	page: "login",
	label: "Don't have an account?",
	handler: mockHandler,
	text: "Sign Up"
};

describe("Rendering Tests For all types of Links to other authentication pages in the app", () => {
	// Test to see if loading button is rendered for login page
	it("renders auth link button for login", () => {
		render(<AuthLink linkData={mockLinkData} />);
		const link = screen.getByTestId("link_login_signup");
		expect(link).toBeTruthy();
	});
});
