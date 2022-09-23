import { render, screen } from "@testing-library/react";
import LogoComponent from "../../components/LogoComponent";

describe("Rendering Tests For all types of logos in the ", () => {
	// Test to see if Logo is rendered for authentication pages login and signup
	it("renders logo for authentication", () => {
		render(<LogoComponent page="auth" width = {136} height = {121} />);
		const logo = screen.getByTestId("logo_auth");
		expect(logo).toBeTruthy();
	});

	// Test to see if Logo is rendered for splash page
	it("renders logo for splash without crashing", () => {
		render(<LogoComponent page="splash" width = {150} height = {135} />);
		const logo = screen.getByTestId("logo_splash");
		expect(logo).toBeTruthy();
	});

	// Test to see if Logo is rendered for landing page
	it("renders logo for landing without crashing", () => {
		render(<LogoComponent page="landing" width = {150} height = {135} />);
		const logo = screen.getByTestId("logo_landing");
		expect(logo).toBeTruthy();
	});

	// Test to see if Logo is rendered for default page
	it("renders logo for default without crashing", () => {
		render(<LogoComponent page="default" width = {150} height = {135} />);
		const logo = screen.getByTestId("logo_default");
		expect(logo).toBeTruthy();
	});
});

// describe("Rendering Tests For Components in Landing", () => {
// 	// Test to see if Logo is rendered
// 	it("renders without crashing", () => {
// 		render(<Logo />);
// 		const landing = screen.getByTestId("logo");
// 		expect(landing).toBeTruthy();
// 	});
// });
