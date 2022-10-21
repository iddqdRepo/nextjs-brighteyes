/// <reference types="cypress" />

describe("Volunteer Form", () => {
  it("shows correct volunteer specific fields", () => {
    cy.visit("http://localhost:3000/forms/volunteerForm");
    cy.contains("Volunteer Form");
  });

  it("shows correct error messages all input fields", () => {
    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        const optional = {
          "aboutQuestions.homePhone": true,
          "aboutQuestions.workPhone": true,
          "emergencyContactInfo.emergencyContactPhoneSecondary": true,
          "refereeInfo.refereeEmail": true,
        };
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

  it("exposes correct fields on selecting specific values", () => {
    cy.visit("http://localhost:3000/forms/volunteerForm");

    cy.contains(
      "Please give brief details of the health condition or special needs"
    ).should("not.exist");
    cy.contains("Please briefly state the convictions:").should("not.exist");

    //^ Select:
    cy.get('select[name="healthInfo.healthConditionSpecialNeeds"]').select(
      "Yes"
    );
    cy.contains(
      "Please give brief details of the health condition or special needs"
    );

    cy.get('select[name="offenderInfo.offender"]').select("Yes");
    cy.contains("Please briefly state the convictions:");
  });
});
