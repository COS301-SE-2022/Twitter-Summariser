import { render, screen } from "@testing-library/react"

import ReactDOM from "react-dom"

import Navigation from "../Navigation"

//Test to see if Navigation is rendered
it("renders without crashing", () => {
    const { getByTestId } = render(<Navigation />);
    const navi = getByTestId("navi");
    expect(navi).toBeTruthy();
});