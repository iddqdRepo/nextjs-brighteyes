/// <reference types="cypress" />

describe("Dog Adoption Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/forms/adoptionForm?type=Dog");
  });

  it("shows correct error messages all input fields", () => {
    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        const optional = { "dogMatchingQuestions.dogName": true };
        if ($el[0].children[1].type === "email") {
          let input = cy.wrap($el[0]).find("input");
          input.click().blur();
          cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
          input.type("h").blur();
          cy.wrap($el[0])
            .find("[id^=err-]")
            .should("have.text", "Invalid email");
        }

        if ($el[0].children[1].type === "text") {
          let input = cy.wrap($el[0]).find("input");
          if (!optional[$el.children()[1].name]) {
            console.log(
              "!optional[$el.children()[1].name]",
              $el.children()[1].name
            );
            input.click().blur();
            cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
            input.type("h").blur();
            cy.wrap($el[0])
              .find("[id^=err-]")
              .should("have.text", "Too Short!");
          }
        }
      }
    );
  });

  it("shows correct error messages all select fields", () => {
    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        const optional = { "hearAboutUsInfo.hearAboutUs": true };

        if ($el[0].children[1].localName === "select") {
          if (!optional[$el.children()[1].name]) {
            cy.wrap($el).find("select").select("Select").blur();
            cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
          }
        }
      }
    );
  });
});
