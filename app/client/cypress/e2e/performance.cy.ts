
it("Lighthouse Testing", () => {
  cy.visit("http://localhost:3000");
  cy.lighthouse();
  });
