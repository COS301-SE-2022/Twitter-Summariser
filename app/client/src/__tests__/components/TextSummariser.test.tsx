
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TextSummariser from "../../components/TextSummariser";

describe("Rendering Tests For Components in TextSummariser", () => {
	it("renders TextSummariser without crashing", () => {
		render(
			<BrowserRouter>
				<TextSummariser />
			</BrowserRouter>
		);
		const summariser = screen.getByTestId("summariser");
		expect(summariser).toBeTruthy();
	})




});

