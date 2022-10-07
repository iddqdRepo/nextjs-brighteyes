import { FormBuilderInterface } from "../../interfaces/formBuilderInterface";

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

export const flatFormBuilder: FormBuilderInterface = {
  homeQuestions: {
    homeType: [
      {
        title: "Your home is a:",
        type: "select",
        values: [
          ["Select", ""],
          ["House", "House"],
          ["Flat", "Flat"],
          ["Other", "Other"],
        ],
      },
    ],
    rentOrOwn: [
      {
        title: "Do you:",
        type: "select",
        values: [
          ["Select", ""],
          ["Own", "Own"],
          ["Rent", "Rent"],
          ["Other", "Other"],
        ],
      },
    ],
    townOrCountry: [
      {
        title: "Do you live in the:",
        type: "select",
        values: [
          ["Select", ""],
          ["Town", "Town"],
          ["Country", "Country"],
        ],
      },
    ],
    nextToRoad: [
      {
        title: "Is your home next to a:",
        type: "select",
        values: [
          ["Select", ""],
          ["Main Road", "Main Road"],
          ["Side Road", "Side Road"],
          ["Neither", "Neither"],
        ],
      },
    ],
    gardenOrYard: [
      {
        title: "Do you have a garden or yard?",
        type: "select",
        values: [
          ["Select", ""],
          ["Yes", "Yes"],
          ["No", "No"],
          ["Communal", "Communal"],
        ],
        exposes: {
          Yes: [
            "gardenOrYardInfo.gardenOrYardSize",
            "gardenOrYardInfo.fullyEnclosed",
          ],
        },
      },
    ],
    "gardenOrYardInfo.gardenOrYardSize": [
      {
        title: "Please estimate the size of your garden/yard?",
        type: "text",
        hidden: true,
      },
    ],
    "gardenOrYardInfo.fullyEnclosed": {
      title: "FULLY ENCLOSED",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
      //   hidden: true,
      exposes: {
        Yes: ["gardenOrYardInfo.fenceHeight"],
      },
    },
    "gardenOrYardInfo.fenceHeight": {
      title: "What height is the fence?",
      type: "select",
      hidden: true,
      values: [
        ["Select", ""],
        ["Less than 4ft", "Less than 4ft"],
        ["4ft-5ft", "4ft-5ft"],
        ["5ft-6ft", "5ft-6ft"],
        ["Over 6ft", "Over 6ft"],
      ],
    },

    numAdults: {
      title: "How many adults live at your home?",
      type: "text",
    },

    numChildren: [
      {
        title: "How many children live at your home?",
        type: "text",
      },
    ],
    childrenAges: [
      {
        title: "Childrens ages?",
        type: "text",
        placeholder: "Leave Blank if no children",
      },
    ],
    otherChildrenVisitInfo: {
      otherChildrenVisit: [
        {
          title: "Do other children visit your home?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: [
              "otherChildrenVisitInfo.otherChildrenAges",
              "otherChildrenVisitInfo.otherChildrenVisitFrequency",
            ],
          },
        },
      ],
      otherChildrenAges: [
        {
          title: "Ages of visiting children?",
          type: "text",
          hidden: true,

          placeholder: "e.g. 7 & 10",
        },
      ],
      otherChildrenVisitFrequency: [
        {
          title: "How often do they visit?",
          type: "text",
          hidden: true,
          placeholder: "e.g. Once a week",
        },
      ],
    },
    retired: [
      {
        title: "Are you retired?",
        type: "select",
        values: [
          ["Select", ""],
          ["Yes", "Yes"],
          ["No", "No"],
        ],
      },
    ],
  },
};
