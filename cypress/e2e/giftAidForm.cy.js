/// <reference types="cypress" />

describe("GiftAid Form", () => {
  it("shows correct GiftAid fields", () => {
    cy.visit("http://localhost:3000/forms/giftAidForm");
    cy.contains("Gift Aid Form");
    cy.contains("Name");
    cy.contains("Address");
    cy.contains("Postcode");
    cy.contains("Phone");
    cy.contains("Mobile");
    cy.contains(
      "I would like to Gift Aid future donations until further notice."
    );
    cy.contains(
      "I would like to Gift Aid previous donations for the current year, and all the previous four tax years."
    );
  });

  it("shows correct error messages all input fields", () => {
    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        if ($el[0].children[1].type === "text") {
          let input = cy.wrap($el[0]).find("input");
          input.click().blur();
          cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
          input.type("h").blur();
          cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Too Short!");
        }
      }
    );
  });
  it("should allow form submit the form when all inputs are entered", () => {
    cy.visit("http://localhost:3000/forms/giftAidForm");
    cy.intercept(
      {
        method: "POST",
        url: "**/api/forms?type=giftaid",
      },
      {
        statusCode: 201,
        body: { success: true }, // stub returns above message
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("addForm");

    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        if ($el[0].children[1].type === "text") {
          let input = cy.wrap($el[0]).find("input");
          input.click().type("hi").blur();
        }
      }
    );

    cy.get("button[type=submit]").click();
    cy.wait("@addForm");
    cy.contains("Submitted form");
  });
});
