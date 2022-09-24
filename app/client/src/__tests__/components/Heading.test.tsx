import { render, screen } from "@testing-library/react";
import Heading from "../../components/Heading";

describe("Rendering Tests For all types of Headings in the app", () => {
	// Test to see if Heading is rendered for login page
	it("renders logo for authentication", () => {
		render(
			<Heading
				page="login"
				type={1}
				hasSecond
				text="Sign in to "
				text2="Twitter Summariser"
			/>
		);
		const logo = screen.getByTestId("heading_login");
		expect(logo).toBeTruthy();
	});

	// Test to see if Heading is rendered for signup page
	it("renders logo for authentication", () => {
		render(<Heading page="signUp" type={1} hasSecond={false} text="Create new account" />);
		const logo = screen.getByTestId("heading_signUp");
		expect(logo).toBeTruthy();
	});
});
