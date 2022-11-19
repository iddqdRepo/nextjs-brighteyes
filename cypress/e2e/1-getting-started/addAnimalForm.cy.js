/// <reference types="cypress" />

describe("Add Animal Form", () => {
  it("Log in navigate to Add Animal", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get("#username").type("a");
    cy.get("#password").type("a");
    cy.get("#LoginButton").click();

    cy.get("#icon-Animals").should("be.visible");
    cy.get("#icon-Animals").click();
    cy.get("#AddAnimal").should("be.visible").click();
  });

  it("Fill in animal form and submit", () => {
    cy.intercept(
      {
        method: "POST",
        url: "**/api/pets",
      },
      {
        statusCode: 201,
        body: { success: true }, // stub returns above message
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("addPet");

    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        console.log("$el[0].children[1].type", $el[0].children[1].type);
        if ($el[0].children[1].name === "age") {
          let input = cy.wrap($el[0]).find("input");
          input.type("55").blur();
        } else if ($el[0].children[1].type === "text") {
          let input = cy.wrap($el[0]).find("input");
          input.type("hh").blur();
        }
        if ($el[0].children[1].type === "textarea") {
          let input = cy.wrap($el[0]).find("textarea");
          input.type("hh").blur();
        }

        if ($el[0].children[1].type === "select-one") {
          let input = cy.wrap($el[0]).find("select");
          input.select(1).blur();
        }
      }
    );

    cy.fixture("CardImage.png", { encoding: null }).as("myFixture");
    cy.get("input[type=file]").selectFile("@myFixture");

    cy.get("button[type=submit]").click();
    cy.wait("@addPet");
    cy.contains("Submitted hh");
  });
});
