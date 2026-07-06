/// <reference types="cypress" />

//The one failure the charity cares about most: a visitor submits a form and
//it silently vanishes. This spec submits the contact form for real (no
//intercepts), then logs in as the seeded test admin and confirms the
//submission is actually in the database via the admin API.
//
//Requires the app to be running against the seeded test database
//(node scripts/seedTestDb.js first — CI does this automatically).
describe("Contact form persistence", () => {
  const uniqueMessage = `Persistence check ${Date.now()}`;

  it("a submitted contact form is stored and visible to an admin", () => {
    cy.visit("http://localhost:3000/");

    cy.get('input[name="aboutQuestions.name"]')
      .scrollIntoView()
      .type("Cypress Tester");
    cy.get('input[name="aboutQuestions.email"]').type("cypress@example.com");
    cy.get('textarea[name="message"]').type(uniqueMessage);
    cy.contains("button", "Send Message").click();

    //The button flips to "Submitted message" only after the API returns 201.
    cy.contains("Submitted message", { timeout: 10000 });

    //Log in as the seeded admin; cy.request stores the session cookie.
    cy.request("POST", "http://localhost:3000/api/auth/login", {
      username: "testadmin",
      password: "test-password-123",
    })
      .its("body.success")
      .should("eq", true);

    //The admin-only forms API must contain the exact message just submitted.
    cy.request("http://localhost:3000/api/forms?type=contactus").then(
      (response) => {
        expect(response.body.success).to.eq(true);
        const messages = response.body.data.map((form) => form.message);
        expect(messages).to.include(uniqueMessage);
      }
    );
  });
});
