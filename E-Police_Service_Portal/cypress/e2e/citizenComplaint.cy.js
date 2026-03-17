describe("Citizen Complaint Workflow", () => {

  it("Citizen logs in and submits a complaint", () => {

    // Visit login page
    cy.visit("/login");

    // Login as citizen
    cy.get('input[name="email"]').type("citizen@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    // Verify login success
    cy.contains("Dashboard");

    // Go to complaint page
    cy.visit("/complaint");

    // Fill complaint form
    cy.get('textarea[name="description"]').type("Illegal parking near school");

    // Submit complaint
    cy.get('button[type="submit"]').click();

    // Verify success message
    cy.contains("Complaint submitted");

  });

});