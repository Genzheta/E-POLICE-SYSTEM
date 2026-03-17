describe("Admin User Management", () => {

  it("Admin creates a new user", () => {

    cy.visit("/login");

    // Login as admin
    cy.get('input[name="email"]').type("admin@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('button[type="submit"]').click();

    cy.contains("Dashboard");

    // Go to users page
    cy.visit("/admin/users");

    // Click add user
    cy.get('button').contains("Add User").click();

    // Fill form
    cy.get('input[name="name"]').type("Test Police");
    cy.get('input[name="email"]').type("testpolice@test.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('select[name="role"]').select("police");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Verify user created
    cy.contains("User created");

  });

});