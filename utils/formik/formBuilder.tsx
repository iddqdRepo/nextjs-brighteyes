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

export const formBuilder: FormBuilderInterface = {
  aboutQuestions: {
    title: "",
    name: "",
    address: "",
    postcode: "",
    phone: "",
    mobile: "",
    email: "",
  },
  dogMatchingQuestions: {
    dogName: { title: "Name of dog (optional)", type: "text" },
    dogSize: {
      title: "What SIZE of dog are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Small e.g. a Terrier", "Small"],
        ["Medium (e.g. Collie)", "Medium"],
        ["Large (e.g. Labrador)", "Large"],
        ["Any Size", "Any Size"],
      ],
    },
    dogType: {
      title: "What TYPE of dog are you looking for?",
      type: "text",
    },
    dogAge: {
      title: "What AGE of dog are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Less than 2 years", "Less than 2 years"],
        ["2-8 years", "2-8 years"],
        ["8+ years", "8+ years"],
        ["Any age", "Any age"],
      ],
    },
    dogSex: {
      title: "What SEX of dog are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Male", "Male"],
        ["Female", "Female"],
        ["Either", "Either"],
      ],
    },
  },
  catMatchingQuestions: {
    catName: { title: "Name of cat (optional)", type: "text" },
    catAge: {
      title: "What SEX of cat are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Kitten", "Kitten"],
        ["Less than 2 years", "Less than 2 years"],
        ["2-8 years", "2-8 years"],
        ["8+ years", "8+ years"],
        ["Any age", "Any age"],
      ],
    },
    catType: {
      title: "What TYPE of cat are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Short Haired", "Short Haired"],
        ["Semi Long Haired", "Semi Long Haired"],
        ["Long Haired", "Long Haired"],
      ],
    },
    catColour: {
      title: "What COLOUR of cat are you looking for?",
      type: "text",
    },
    catSex: {
      title: "What SEX of cat are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Male", "Male"],
        ["Female", "Female"],
        ["Either", "Either"],
      ],
    },
    catAllergy: {
      title: "What SEX of cat are you looking for?",
      type: "select",
      values: [
        ["Select", ""],
        ["Yes", "Yes"],
        ["No", "No"],
      ],
    },
  },
};
