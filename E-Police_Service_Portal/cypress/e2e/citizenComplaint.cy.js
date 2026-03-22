describe("Citizen Complaint Workflow", () => {
  it("Citizen logs in and submits a complaint", () => {
    cy.visit("/");
    
    // Login as citizen
    cy.contains("Citizen Portal").click();
    cy.get("#email").type("demo@citizen.com");
    cy.get("#password").type("demo123");
    cy.get('button[type="submit"]').click();
    
    // Verify dashboard
    cy.contains("Welcome back").should("exist");
    
    // Go to complaints tab
    cy.contains("button", "Complaints").click();
    
    // Wait for the form to appear
    cy.contains("Submit New Complaint").should("exist");
    
    // The select component from Radix is hard to interact with via naive cy.get, 
    // but the location and description are standard inputs.
    cy.contains("Select type").click({force: true});
    cy.get('[role="option"]').contains("Noise Complaint").click({force: true});
    
    cy.get("#location").type("Main Street");
    cy.get("textarea#description").type("Illegal parking near school");
    
    // Submit
    cy.contains('button', 'Submit Complaint').click();
    
    // Verify success toast
    cy.contains("Complaint submitted successfully").should("exist");
    
    // Take screenshot evidence
    cy.screenshot("evidence-citizen-complaint");
  });
});