describe("Police Issues Fine", () => {
  it("Police issues a fine for a traffic violation", () => {
    cy.visit("/");
    
    // Login as police
    cy.contains("Police Login").click();
    cy.get("#email").type("officer@police.gov");
    cy.get("#password").type(Cypress.env("POLICE_PASSWORD") || "police123");
    cy.get('button[type="submit"]').click();
    
    // Verify dashboard
    cy.contains("Officer Dashboard").should("exist");
    
    // Go to E-Ticketing
    cy.contains("button", "E-Ticketing").click();
    
    // Click Issue E-Ticket button
    cy.contains("button", "Issue E-Ticket").click();
    
    // Fill fine form
    cy.contains("Select violation").click({force: true});
    cy.get('[role="option"]').contains("Speeding").click({force: true});
    
    cy.get("#vehicle-number").type("ABC-1234");
    cy.get("#driver-license").type("DL123456789");
    cy.get("#location").type("Highway 5, Mile 23");
    cy.get("#fine-amount").type("150");
    cy.get("textarea#violation-details").type("Speeding");
    
    // Submit form
    cy.contains('button', 'Issue Ticket').click();
    
    // Verify fine issued success toast
    cy.contains("E-Ticket issued successfully!").should("exist");
    
    // Take screenshot evidence
    cy.screenshot("evidence-issue-fine");
  });
});