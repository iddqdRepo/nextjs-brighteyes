import { VolunteerFormBuilderInterface } from "../../interfaces/volunteerFormBuilderInterface";

/* 
^ AN OBJECT THAT IS USED TO BUILD THE FORMS. 
^ E.G. IT IS MAPPED OVER AND THE TITLES ARE ADDED TO LABELS  
^ AND THE VALUES ARE ADDED TO THE DROPDOWNS
*/

/*
 * title: name shown on label on form page
 * values: dropdown text and their values
 * type: type of form item e.g. checkbox, select, text
 */

export const volunteerFormBuilder: VolunteerFormBuilderInterface = {
  aboutQuestions: {
    title: { title: "Title", type: "text" },
    name: { title: "Name", type: "text" },
    address: { title: "Address", type: "text" },
    postcode: { title: "Postcode", type: "text" },
    homePhone: { title: "Home Phone", type: "text" },
    workPhone: { title: "Work Phone", type: "text" },
    mobile: { title: "Mobile", type: "text" },
    email: { title: "Email", type: "text" },
    occupation: { title: "Occupation", type: "text" },
    overSixteen: { title: "I am over 16", type: "checkbox" },
  },
  emergencyContactInfo: {
    emergencyContactTitle: { title: "Title", type: "text" },
    emergencyContactName: { title: "Name", type: "text" },
    emergencyContactRelationship: {
      title: "Relationship to you?",
      type: "textarea",
    },

    emergencyContactPhonePrimary: { title: "Phone (primary)", type: "text" },
    emergencyContactPhoneSecondary: {
      title: "Phone (seconadry)",
      type: "text",
    },
  },
  healthInfo: {
    physicallyFit: { title: "Are you physically fit?", type: "text" },
    tetanus: {
      title: "Have you had a Tetanus Booster in the last 10 years",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
    },

    healthConditionSpecialNeeds: {
      title:
        "Do you have any health conditions or special needs that could affect your ability to volunteer?",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
      exposes: {
        Yes: ["healthConditionSpecialNeedsDetails"],
      },
    },
    healthConditionSpecialNeedsDetails: {
      title:
        "Please give brief details of the health condition or special needs",
      type: "textarea",
      hidden: true,
    },
  },

  volunteeringInfo: {
    workInterestedIn: {
      title: "What area of the sanctuary you would like to work in",
      type: "text",
      placeholder: "e.g. Kennels, Dog Walking, Catteries",
    },

    maxHours: {
      title: "What are the maximum hours you can commit to each week?",
      type: "text",
      placeholder: "e.g. 4 hours per week",
    },

    timeSlot: {
      title: "Can you commit to a specific time slot each week?",
      type: "text",
      placeholder: "e.g. Yes, 2 hours Saturday and Sunday",
    },

    daysOfTheWeek: {
      title: "What days of the week could you help?",
      type: "text",
      placeholder: "e.g. Mon, Tues and Thurs",
    },

    employeeOrVolunteerAnimals: {
      title:
        "Are you an employee or volunteer eith any other charity/organization involved with the care of animals?",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
    },
  },
  refereeInfo: {
    refereeTitle: { title: "Title", type: "text" },
    refereeName: { title: "Name", type: "text" },
    refereeRelationship: {
      title: "Relationship to you?",
      type: "textarea",
      placeholder: "e.g. Father, Mother",
    },
    refereeAddress: { title: "Address", type: "text" },
    refereePostcode: { title: "Postcode", type: "text" },
    refereePhone: { title: "Phone", type: "text" },
    refereeEmail: { title: "Email", type: "text" },
  },
  offenderInfo: {
    offender: {
      title:
        "Have you any unspent criminal convictions registered against you?",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
      exposes: {
        Yes: ["offenderDetails"],
      },
    },

    offenderDetails: {
      title: "Please briefly state the convictions:",
      hidden: true,
      type: "textarea",
    },
  },
};
