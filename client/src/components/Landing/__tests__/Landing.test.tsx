import { fireEvent, render, screen } from "@testing-library/react"
import React from "react";
import ReactDOM from "react-dom/client"
import Landing from "../Landing"


describe("Rendering Tests For Components in Landing", () =>{
    //Test to see if Landing is rendered
    it("renders without crashing", () => {
        const { getByTestId } = render(<Landing />);
        const landing = getByTestId("landing");
        expect(landing).toBeTruthy();
    });

    //Testing to see if Input is rendered
    it("renders without crashing", () => {
        const { getByTestId } = render(<Landing />);
        const input = getByTestId("search");
        expect(input).toBeTruthy();
    })
})


//Tests that the search bar recieves text correctly
describe("Testing Search Bar Input", () =>{
    //checking to see that
    
})