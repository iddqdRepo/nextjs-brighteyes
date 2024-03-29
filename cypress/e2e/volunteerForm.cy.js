// /// <reference types="cypress" />

// describe("Volunteer Form", () => {
//   it("shows correct header", () => {
//     cy.visit("http://localhost:3000/forms/volunteerForm");
//     cy.contains("Volunteer Form");
//   });

//   it("shows correct error messages all input fields", () => {
//     cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
//       ($el) => {
//         const optional = {
//           "aboutQuestions.homePhone": true,
//           "aboutQuestions.workPhone": true,
//           "emergencyContactInfo.emergencyContactPhoneSecondary": true,
//           "refereeInfo.refereeEmail": true,
//         };
//         if ($el[0].children[1].type === "email") {
//           let input = cy.wrap($el[0]).find("input");
//           if (!optional[$el.children()[1].name]) {
//             input.click().blur();
//             cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
//             input.type("h").blur();
//             cy.wrap($el[0])
//               .find("[id^=err-]")
//               .should("have.text", "Invalid email");
//           }
//         }

//         if ($el[0].children[1].type === "text") {
//           let input = cy.wrap($el[0]).find("input");
//           if (!optional[$el.children()[1].name]) {
//             input.click().blur();
//             cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
//             input.type("h").blur();
//             cy.wrap($el[0])
//               .find("[id^=err-]")
//               .should("have.text", "Too Short!");
//           }
//         }
//       }
//     );
//   });

//   it("shows correct error messages all select fields", () => {
//     cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
//       ($el) => {
//         const optional = { "hearAboutUsInfo.hearAboutUs": true };

//         if ($el[0].children[1].localName === "select") {
//           if (!optional[$el.children()[1].name]) {
//             cy.wrap($el).find("select").select("Select").blur();
//             cy.wrap($el[0]).find("[id^=err-]").should("have.text", "Required");
//           }
//         }
//       }
//     );
//   });

//   it("exposes correct fields on selecting specific values", () => {
//     cy.visit("http://localhost:3000/forms/volunteerForm");

//     cy.contains(
//       "Please give brief details of the health condition or special needs"
//     ).should("not.exist");
//     cy.contains("Please briefly state the convictions:").should("not.exist");

//     //^ Select:
//     cy.get('select[name="healthInfo.healthConditionSpecialNeeds"]').select(
//       "Yes"
//     );
//     cy.contains(
//       "Please give brief details of the health condition or special needs"
//     );

//     cy.get('select[name="offenderInfo.offender"]').select("Yes");
//     cy.contains("Please briefly state the convictions:");
//   });

//   it("selects all required fields and submits form", () => {
//     cy.visit("http://localhost:3000/forms/volunteerForm");

//     cy.intercept(
//       {
//         method: "POST",
//         url: "**/api/forms?type=volunteer",
//       },
//       {
//         statusCode: 201,
//         body: { success: true }, // stub returns above message
//         headers: { "access-control-allow-origin": "*" },
//         delayMs: 500,
//       }
//     ).as("addForm");

//     //^Select all the dropdown fields so they are not "reqired"
//     cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
//       ($el) => {
//         if ($el[0].children[1].type === "select-one") {
//           let input = cy.wrap($el[0]).find("select");
//           input.select(1).blur();
//         }
//       }
//     );

//     //^Finally type into all the input fields, text boxes, text-areas and select the final exposed select fields
//     cy.get(".flex.flex-col.items-center.justify-end.mb-4.ml-1.mr-1").each(
//       ($el) => {
//         const optional = {
//           "dogMatchingQuestions.dogName": true,
//           "homeQuestions.childrenAges": true,
//         };
//         console.log($el[0].children[1].type);
//         if ($el[0].children[1].type === "email") {
//           let input = cy.wrap($el[0]).find("input");
//           input.type("hh@hh.com").blur();
//         }

//         if ($el[0].children[1].type === "text") {
//           let input = cy.wrap($el[0]).find("input");
//           if (!optional[$el.children()[1].name]) {
//             input.type("hh").blur();
//           }
//         }
//         if ($el[0].children[1].type === "textarea") {
//           let input = cy.wrap($el[0]).find("textarea");
//           if (!optional[$el.children()[1].name]) {
//             input.type("hh").blur();
//           }
//         }
//         if ($el[0].children[1].type === "select-one") {
//           let input = cy.wrap($el[0]).find("select");
//           input.select(1).blur();
//         }
//       }
//     );
//     cy.get("button[type=submit]").click();
//     cy.wait("@addForm");
//     cy.contains("Submitted form");
//   });
// });
