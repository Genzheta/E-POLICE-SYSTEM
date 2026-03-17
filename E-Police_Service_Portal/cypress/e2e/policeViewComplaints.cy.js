describe("Police Complaint Management", () => {

  it("Police logs in and views complaints", () => {

    cy.visit("/login");

    // Login as police
    cy.get('input[name="email"]').type("police@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    // Verify dashboard
    cy.contains("Dashboard");

    // Go to complaints page
    cy.visit("/police/complaints");

    // Check complaints list appears
    cy.contains("Complaints");

  });

});