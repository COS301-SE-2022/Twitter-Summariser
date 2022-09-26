import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Explore from "../../components/Explore";

describe("Rendering Tests For Components in Explore", () => {
	it("renders Explore without crashing", () => {
		render(
			<BrowserRouter>
				<Explore />
			</BrowserRouter>
		);
		const explore = screen.getByTestId("report");
		expect(explore).toBeTruthy();
	});
});
