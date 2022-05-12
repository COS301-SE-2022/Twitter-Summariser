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
describe("Testing That Search Bar Receieves Input", () =>{
    //Function that mocks data to the search bar
    it("Testing That it Updates on Change", () => {
        const search = jest.fn((value) => {})                                           //Mock function from jest to provide props
        const { queryByPlaceholderText } = render(<Landing setSearch={search}/>)        //Rendering search bar to search
        const searchInput = queryByPlaceholderText("search twitter...")                 //Sets search bar defualt text 
        fireEvent.change(searchInput, { target: {value: "Test Search" }})               //runs the mock function to change and search text
        expect(searchInput.value).toBe("Test Search")                                   //Checking The condition
    })
})