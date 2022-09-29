/// <reference types="cypress" />
// import jwt from "jwt-decode";
// import useAuth from "../hooks/useAuth";

// const { auth } = useAuth();

describe("Auth(e2e)", () => {
	it("should load and redirect to /login", () => {
		cy.visit("http://localhost:3000/");
		cy.url().should("include", "/login");
	});

	it("should load and redirect to /signup", () => {
		cy.visit("http://localhost:3000/signup");
		cy.url().should("include", "/signup");
	});

	// it ('should have default initial state', () => {
	//   const initialState = {
	//     auth: {
	//       accessToken: null,
	//       username: null,
	//       apiKey: null,
	//       email: null
	//     },
	//   };

	//   cy.window().its('useAuth').invoke('getState').should('deep.equal', initialState);

	// });
});
