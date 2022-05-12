import { fireEvent, queryByRole, render, screen } from "@testing-library/react"
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

    //Testing to see if Search bar is rendered
    it("renders without crashing", () => {
        const { getByTestId } = render(<Landing />);
        const input = getByTestId("search");
        expect(input).toBeTruthy();
    })

    //Testing to see if Results are render on to page is rendered
    it("renders without crashing", () => {
        const { getByTestId } = render(<Landing />);
        const input = getByTestId("results");
        expect(input).toBeTruthy();
    })
})


//Tests that the search bar recieves text correctly
describe("Testing That Search Bar Receieves Input", () =>{

    //Function that mocks data to the search bar
    it("Testing That Search bar Updates on Change", () => {
        const search = jest.fn((value) => {})                                           //Mock function from jest to provide props
        const { queryByTestId } = render(<Landing setSearch = {search}/>)                 //Rendering search bar to search
        const searchInput = queryByTestId("search")                                     //Sets search bar defualt text 
        fireEvent.change(searchInput, { target: {value: "Test Search" }})               //runs the mock function to change and search text
        expect(searchInput.value).toBe("Test Search")                                   //Checking The condition
    })

    //Function that tests that typing in Search Bar changes div if tweets are found
    test("Testing That search changes div(With results that are found)", () =>{
        const search = jest.fn((value) => {})                                           //Mock function from jest to provide props
        const { queryByTestId } = render(<Landing onChange={search}/>)                //Rendering search bar to search
        const searchInput = queryByTestId("search")                                     //Sets search bar defualt text 
        fireEvent.change(searchInput, { target: {value: "" }})                     //Inputing Search tag
        
        //This renders the div for displaying
        const { getAllByTestId } = render(<Landing />);
        const res = getAllByTestId("results");

        //expect(res.values).toBe("")
    })

    //Function that tests that typing in Search Bar doesn't change div if tweets are not found
    test("Testing That search changes div(With results that are found)", () =>{
        const search = jest.fn((value) => {})                                           //Mock function from jest to provide props
        const { queryByTestId } = render(<Landing setSearch={search}/>)        //Rendering search bar to search
        const searchInput = queryByTestId("search")                 //Sets search bar defualt text 
        fireEvent.change(searchInput, { target: {value: "Rabbit" }})

        //This renders the div for displaying
        const { getAllByTestId } = render(<Landing />);
        const res = getAllByTestId("results");
    })
})
