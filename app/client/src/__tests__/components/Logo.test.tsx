import { render, screen } from "@testing-library/react";
import Logo from "../../components/Logo";

describe("Rendering Tests For Components in Landing", () => {
	// Test to see if Logo is rendered
	it("renders without crashing", () => {
		render(<Logo />);
		const landing = screen.getByTestId("logo");
		expect(landing).toBeTruthy();
	});
});
