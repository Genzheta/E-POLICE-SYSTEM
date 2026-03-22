describe("Police Complaint Management", () => {
  it("Police logs in and views complaints", () => {
    cy.visit("/");
    
    // Login as police
    cy.contains("Police Login").click();
    cy.get("#email").type("officer@police.gov");
    cy.get("#password").type("police123");
    cy.get('button[type="submit"]').click();
    
    // Verify dashboard
    cy.contains("Officer Dashboard").should("exist");
    
    // Go to complaints tab
    cy.contains("button", "Complaints").click();
    
    // Check complaints list appears
    cy.contains("Complaint Management").should("exist");
    cy.contains("Emma Wilson").should("exist"); // One of the mock complaints
    
    // Take screenshot evidence
    cy.screenshot("evidence-police-complaints");
  });
});