/// <reference types="cypress" />

describe('Landing(e2e)', () => {
  it ('should load and redirect to /splash', () => {
    cy.visit('http://localhost:3000/splash');
    cy.url().should('include', '/splash');
  });

});
