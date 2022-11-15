/// <reference types="cypress" />

describe("Cat Adoption Form", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000/forms/adoptionForm?type=Cat");
  // });
  it("shows correct cat specific fields", () => {
    cy.visit("http://localhost:3000/forms/adoptionForm?type=Cat");
    cy.contains("Adopt a Cat Form");
    cy.contains("Cat Questions");
    cy.contains("Name of cat (optional)");
    cy.contains("What AGE of cat are you looking for?");
    cy.contains("What TYPE of cat are you looking for?");
    cy.contains("What COLOUR of cat are you looking for?");
    cy.contains("What SEX of cat are you looking for?");
    cy.contains("Do you want a cat for");
    cy.contains("Will your cat be left at home alone?");
    cy.contains("Where will your cat sleep at night?");
    cy.contains("Do you own other cats?");
    cy.contains("Are you fully aware of the costs of keeping a cat?");
    cy.contains("How soon do you want a cat?");
    cy.contains(
      "Any further information to help us match a cat to your home and lifestyle?"
    );
    cy.contains("A MINIMUM REHOMING DONATION OF £30 IS REQUESTED");
  });

  it("shows correct error messages all input fields", () => {
    cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
      ($el) => {
        const optional = {
          "catMatchingQuestions.catName": true,
          "homeQuestions.childrenAges": true,
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

  it("exposes correct fields on selecting specific values - Home Questions", () => {
    cy.contains("Please estimate the size of your garden/yard?").should(
      "not.exist"
    );
    cy.contains("Is your garden/yard fully enclosed?").should("not.exist");
    cy.contains("Ages of visiting children?").should("not.exist");
    cy.contains("What types of pets do you have?").should("not.exist");
    cy.contains("What height is the fence?").should("not.exist");
    cy.contains("Ages of visiting children?").should("not.exist");
    cy.contains("How often do they visit?").should("not.exist");

    //^ Select:
    cy.get('select[name="homeQuestions.gardenOrYard"]').select("Yes");
    cy.get(
      'select[name="homeQuestions.gardenOrYardInfo>fullyEnclosed"]'
    ).select("Yes");
    cy.get(
      'select[name="homeQuestions.otherChildrenVisitInfo>otherChildrenVisit"]'
    ).select("Yes");

    //^ Exposes:
    cy.contains("What height is the fence?");
    cy.contains("Please estimate the size of your garden/yard?");
    cy.contains("Is your garden/yard fully enclosed?");
    cy.contains("Ages of visiting children?");
    cy.contains("How often do they visit?");
  });

  it("exposes correct fields on selecting specific values - Cat Questions", () => {
    //catQuestions.catHomeAloneInfo>catHomeAlone - Yes
    cy.contains("How many hours per day?").should("not.exist");
    cy.contains("How often?").should("not.exist");

    //catQuestions.ownOthercatsCurrentInfo>ownOtherCurrentcats - No
    cy.contains("Have you owned a cat before?").should("not.exist");
    //catQuestions.ownOthercatsPastInfo>ownOtherPastcats - As a Child/As an Adult
    cy.contains("How long did you have it?").should("not.exist");
    cy.contains("What happened to it?").should("not.exist");

    //catQuestions.catOwnOtherPetsCurrentInfo>catOwnOtherCurrentPets - Yes
    cy.contains("What types of pets do you have?").should("not.exist");

    //^ Select: catQuestions.catHomeAloneInfo>catHomeAlone - Yes
    cy.get('select[name="catQuestions.catHomeAloneInfo>catHomeAlone"]').select(
      "Yes"
    );
    //^ Exposes:
    cy.contains("How many hours per day?");
    cy.contains("How often?");

    //^ Select: catQuestions.ownOtherCatsCurrentInfo>ownOtherCurrentCats - No
    cy.get(
      'select[name="catQuestions.ownOtherCatsCurrentInfo>ownOtherCurrentCats"]'
    ).select("No");

    //^ Exposes:
    cy.contains("Have you owned a cat before?");

    //catQuestions.ownOtherCatsPastInfo>ownOtherPastCats - As a Child/As an Adult
    cy.get(
      'select[name="catQuestions.ownOtherCatsPastInfo>ownOtherPastCats"]'
    ).select("As a Child");
    //^ Exposes:
    cy.contains("How long did you have it?");
    cy.contains("What happened to it?");
    cy.get(
      'select[name="catQuestions.ownOtherCatsPastInfo>ownOtherPastCats"]'
    ).select("As an Adult");
    cy.contains("How long did you have it?");
    cy.contains("What happened to it?");

    cy.get(
      'select[name="catQuestions.ownOtherPetsCurrentInfo>ownOtherCurrentPets"]'
    ).select("Yes");
    //catQuestions.OwnOtherPetsCurrentInfo>OwnOtherCurrentPets - Yes
    cy.contains("What types of pets do you have?");
  });

  it("exposes correct fields on selecting specific values - How did you hear about us", () => {
    cy.contains("We'd love to know where you heard of us!").should("not.exist");
    cy.get('select[name="hearAboutUsInfo.hearAboutUs"]').select("Other");
    cy.contains("We'd love to know where you heard of us!");
  });
});
