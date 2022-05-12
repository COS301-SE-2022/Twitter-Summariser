import { render, screen } from "@testing-library/react"
import React from "react";
import ReactDOM from "react-dom/client"
import Landing from "../Landing"


//Test to see if Landing is rendered
it("renders without crashing", () => {
    const { getByTestId } = render(<Landing />);
    const landing = getByTestId("landing");
    expect(landing).toBeTruthy();
});

it("renders button correctly", () => {
})