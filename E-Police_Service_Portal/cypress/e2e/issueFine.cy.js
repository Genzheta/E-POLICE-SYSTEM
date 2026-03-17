describe("Police Issues Fine", () => {

  it("Police issues a fine for a complaint", () => {

    cy.visit("/login");

    // Login as police
    cy.get('input[name="email"]').type("police@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.visit("/police/complaints");

    // Open first complaint
    cy.get(".complaint-card").first().click();

    // Issue fine
    cy.get('input[name="amount"]').type("5000");

    cy.get('button[type="submit"]').click();

    // Verify fine issued
    cy.contains("Fine issued successfully");

  });

});