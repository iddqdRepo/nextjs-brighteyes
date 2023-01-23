/// <reference types="cypress" />

//^ Fix for cypress bug "unexpected token <>>"

describe("Add Animal Form", () => {
  it.skip("should allow login with correct credentials and be able to navigate to add animal", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      console.log(
        "error in should allow login with correct credentials and be able to navigate to add animal"
      );
      console.log(err, runnable);
      return false;
    });

    cy.visit("http://localhost:3000/admin");
    cy.get("#username").should("be.visible").type("a");
    cy.get("#password").should("be.visible").type("a");
    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.get("#icon-Animals").should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get("#AddAnimal").should("be.visible").click();
  });

  it.skip("shows error with add animal form when a required field is not filled in", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      console.log(
        "error in shows error with add animal form when a required field is not filled in"
      );
      console.log(err, runnable);
      return false;
    });

    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").should(
      "be.visible"
    );

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
        if ($el[0].children[1].type === "select-one") {
          let input = cy.wrap($el[0]).find("select");
          input.select(1).blur();
        }
      }
    );
    cy.get("textarea").click().blur();
    cy.contains("Required");
    cy.fixture("CardImage.png", { encoding: null }).as("myFixture");
    cy.get("input[type=file]").selectFile("@myFixture");
    cy.get("textarea").type("h").blur();
    cy.contains("Too Short!");
    cy.get("button[type=submit]").click();
    cy.contains("Add Animal");
  });

  it.skip("submits add animal form when all fields are correctly filled in", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      console.log(
        "error in submits add animal form when all fields are correctly filled in"
      );
      console.log(err, runnable);
      return false;
    });
    cy.intercept(
      {
        method: "POST",
        url: "**/api/pets",
      },
      {
        statusCode: 201,
        body: { success: true },
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("addPet");

    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").should(
      "be.visible"
    );

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
        if ($el[0].children[1].type === "select-one") {
          let input = cy.wrap($el[0]).find("select");
          input.select(1).blur();
        }
      }
    );

    cy.get("textarea").type("hh");

    cy.fixture("CardImage.png", { encoding: null }).as("myFixture");
    cy.get("input[type=file]").selectFile("@myFixture");

    cy.get("button[type=submit]").click();
    cy.wait("@addPet");
    cy.contains("Submitted hh");
  });
});
