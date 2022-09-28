import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Reports from "../../components/Reports";

describe("Rendering Tests For Components in Reports", () => {
	it("renders Reports without crashing", () => {
		render(
			<BrowserRouter>
				<Reports />
			</BrowserRouter>
		);
		const report = screen.getByTestId("report");
		expect(report).toBeTruthy();
	});
});
