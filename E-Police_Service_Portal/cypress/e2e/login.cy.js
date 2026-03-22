describe("Login Test", () => {
  it("should login as admin", () => {
    cy.visit("/");
    
    // Select Admin Role
    cy.contains("Admin Access").click();
    
    // Fill login form
    cy.get("#email").type("admin@epolice.gov");
    cy.get("#password").type("admin123");
    
    // Submit
    cy.get('button[type="submit"]').click();
    
    // Verify success
    cy.contains("Admin Control Panel").should("exist");
    
    // Take screenshot evidence
    cy.screenshot("evidence-login-admin");
  });
});
