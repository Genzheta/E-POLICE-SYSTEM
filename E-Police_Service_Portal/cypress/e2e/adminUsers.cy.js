describe("Admin User Management", () => {
  it("Admin can view user management", () => {
    cy.visit("/");
    
    // Login as admin
    cy.contains("Admin Access").click();
    cy.get("#email").type("admin@epolice.gov");
    cy.get("#password").type("admin123");
    cy.get('button[type="submit"]').click();
    
    cy.contains("Admin Control Panel").should("exist");
    
    // Go to user management
    cy.contains("button", "User Management").click();
    
    // Verify user list
    cy.contains("Officer Davis").should("exist");
    cy.contains("John Doe").should("exist");
    
    // Verify "Add New User" button exists
    cy.contains("Add New User").should("exist");
    
    // Take screenshot evidence
    cy.screenshot("evidence-admin-users");
  });
});