describe("Login Test", () => {

  it("should login as admin", () => {

    cy.visit("/login");

    cy.get('input[name="email"]').type("admin@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.contains("Dashboard");

  });

});
