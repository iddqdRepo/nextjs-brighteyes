/// <reference types="cypress" />

describe("Dog Adoption Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/forms/adoptionForm?type=Dog");
  });

  it("shows correct dog specific fields", () => {
    cy.contains("Adopt a Dog Form");
    cy.contains("Dog Questions");
    cy.contains("Name of dog (optional)");
    cy.contains("What SIZE of dog are you looking for?");
    cy.contains("What TYPE of dog are you looking for?");
    cy.contains("What AGE of dog are you looking for?");
    cy.contains("What SEX of dog are you looking for?");
    cy.contains("Do you want a dog for");
    cy.contains("Will your dog be left at home alone?");
    cy.contains("How much daily exercise will you give your dog?");
    cy.contains("What type of exercise will your dog receive?");
    cy.contains("Where will your dog sleep at night?");
    cy.contains("Do you own other dogs?");
    cy.contains(
      "Are you fully aware of the costs and legal implications of keeping a dog?"
    );
    cy.contains("How soon do you want a dog?");
    cy.contains(
      "Any further information to help us match a dog to your home and lifestyle?"
    );
    cy.contains("A MINIMUM REHOMING DONATION OF £125 IS REQUESTED");
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

  it("exposes correct fields on selecting specific values - Dog Questions", () => {
    //dogQuestions.dogHomeAloneInfo>dogHomeAlone - Yes
    cy.contains("How many hours per day?").should("not.exist");
    cy.contains("How often?").should("not.exist");

    //dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs - Yes
    cy.contains("Dog Breeds?").should("not.exist");
    cy.contains("Neutered?").should("not.exist");

    //dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs - No
    cy.contains("Have you owned a dog before?").should("not.exist");
    //dogQuestions.ownOtherDogsPastInfo>ownOtherPastDogs - As a Child/As an Adult
    cy.contains("How long did you have it?").should("not.exist");
    cy.contains("What happened to it?").should("not.exist");

    //dogQuestions.dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets - Yes
    cy.contains("What types of pets do you have?").should("not.exist");

    //^ Select: dogQuestions.dogHomeAloneInfo>dogHomeAlone - Yes
    cy.get('select[name="dogQuestions.dogHomeAloneInfo>dogHomeAlone"]').select(
      "Yes"
    );
    //^ Exposes:
    cy.contains("How many hours per day?");
    cy.contains("How often?");

    //^ Select: dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs - Yes
    cy.get(
      'select[name="dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs"]'
    ).select("Yes");
    //^ Exposes:
    cy.contains("Dog Breeds?");
    cy.contains("Neutered?");

    //^ Select: dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs - Yes
    cy.get(
      'select[name="dogQuestions.ownOtherDogsCurrentInfo>ownOtherCurrentDogs"]'
    ).select("No");
    //^ Hides:
    cy.contains("Dog Breeds?").should("not.exist");
    cy.contains("Neutered?").should("not.exist");

    //^ Exposes:
    cy.contains("Have you owned a dog before?");

    //dogQuestions.ownOtherDogsPastInfo>ownOtherPastDogs - As a Child/As an Adult
    cy.get(
      'select[name="dogQuestions.ownOtherDogsPastInfo>ownOtherPastDogs"]'
    ).select("As a Child");
    //^ Exposes:
    cy.contains("How long did you have it?");
    cy.contains("What happened to it?");
    cy.get(
      'select[name="dogQuestions.ownOtherDogsPastInfo>ownOtherPastDogs"]'
    ).select("As an Adult");
    cy.contains("How long did you have it?");
    cy.contains("What happened to it?");

    cy.get(
      'select[name="dogQuestions.dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets"]'
    ).select("Yes");
    //dogQuestions.dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets - Yes
    cy.contains("What types of pets do you have?");
  });

  it("exposes correct fields on selecting specific values - How did you hear about us", () => {
    //dogQuestions.dogHomeAloneInfo>dogHomeAlone - Yes
    cy.contains("We'd love to know where you heard of us!").should("not.exist");

    //^ Select: dogQuestions.dogHomeAloneInfo>dogHomeAlone - Yes
    cy.get('select[name="hearAboutUsInfo.hearAboutUs"]').select("Other");
    //^ Exposes:
    cy.contains("We'd love to know where you heard of us!");
  });
});
