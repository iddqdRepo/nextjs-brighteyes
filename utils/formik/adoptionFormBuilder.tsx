import { AdoptionFormBuilderInterface } from "../../interfaces/adoptionFormBuilderInterface";

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

export const adoptionFormBuilder: AdoptionFormBuilderInterface = {
  aboutQuestions: {
    title: [{ title: "Title", type: "text" }],
    name: [{ title: "Name", type: "text" }],
    address: [{ title: "Address", type: "text" }],
    postcode: [{ title: "Postcode", type: "text" }],
    phone: [{ title: "Phone", type: "text" }],
    mobile: [{ title: "Mobile", type: "text" }],
    email: [{ title: "Email", type: "text" }],
  },
  dogMatchingQuestions: {
    dogName: [{ title: "Name of dog (optional)", type: "text" }],
    dogSize: [
      {
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
    ],
    dogType: [
      {
        title: "What TYPE of dog are you looking for?",
        type: "text",
      },
    ],
    dogAge: [
      {
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
    ],
    dogSex: [
      {
        title: "What SEX of dog are you looking for?",
        type: "select",
        values: [
          ["Select", ""],
          ["Male", "Male"],
          ["Female", "Female"],
          ["Either", "Either"],
        ],
      },
    ],
  },
  catMatchingQuestions: {
    catName: [{ title: "Name of cat (optional)", type: "text" }],
    catAge: [
      {
        title: "What AGE of cat are you looking for?",
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
    ],
    catType: [
      {
        title: "What TYPE of cat are you looking for?",
        type: "select",
        values: [
          ["Select", ""],
          ["Short Haired", "Short Haired"],
          ["Semi Long Haired", "Semi Long Haired"],
          ["Long Haired", "Long Haired"],
        ],
      },
    ],
    catColour: [
      {
        title: "What COLOUR of cat are you looking for?",
        type: "text",
      },
    ],
    catSex: [
      {
        title: "What SEX of cat are you looking for?",
        type: "select",
        values: [
          ["Select", ""],
          ["Male", "Male"],
          ["Female", "Female"],
          ["Either", "Either"],
        ],
      },
    ],
    catAllergy: [
      {
        title: "Does anyone in the household have an allergy to cat fur?",
        type: "select",
        values: [
          ["Select", ""],
          ["Yes", "Yes"],
          ["No", "No"],
        ],
      },
    ],
  },

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
            "gardenOrYardInfo>gardenOrYardSize",
            "gardenOrYardInfo>fullyEnclosed",
          ],
        },
      },
    ],
    gardenOrYardInfo: {
      gardenOrYardSize: [
        {
          title: "Please estimate the size of your garden/yard?",
          type: "text",
          hidden: true,
          placeholder: "e.g. 50 x 50ft",
        },
      ],
      fullyEnclosed: [
        {
          title: "Is your garden/yard fully enclosed?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          hidden: true,
          exposes: {
            Yes: ["gardenOrYardInfo>fenceHeight"],
          },
        },
      ],
      fenceHeight: [
        {
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
      ],
    },
    numAdults: [
      {
        title: "How many adults live at your home?",
        type: "text",
      },
    ],
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
              "otherChildrenVisitInfo>otherChildrenAges",
              "otherChildrenVisitInfo>otherChildrenVisitFrequency",
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
    planning: {
      baby: [
        {
          title: "A baby?",
          type: "checkbox",
        },
      ],
      moving: [
        {
          title: "Moving house?",
          type: "checkbox",
        },
      ],
      workHoursChange: [
        {
          title: "A change in work hours?",
          type: "checkbox",
        },
      ],
      holiday: [
        {
          title: "A holiday (in the next month)?",
          type: "checkbox",
        },
      ],
    },
  },

  dogQuestions: {
    dogReason: [
      {
        title: "Do you want a dog for:",
        type: "select",
        values: [
          ["Select", ""],
          ["Indoors", "Indoors"],
          ["Outdoors", "Outdoors"],
          ["Both", "Both"],
        ],
      },
    ],
    dogHomeAloneInfo: {
      dogHomeAlone: [
        {
          title: "Will your dog be left at home alone?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: [
              "dogHomeAloneInfo>dogHomeAloneHours",
              "dogHomeAloneInfo>dogHomeAloneFrequency",
            ],
          },
        },
      ],
      dogHomeAloneHours: [
        {
          title: "How many hours per day?",
          type: "text",
          placeholder: "e.g. 4 Hours",
          hidden: true,
        },
      ],
      dogHomeAloneFrequency: [
        {
          title: "How often?",
          type: "text",
          placeholder: "e.g. Every day",
          hidden: true,
        },
      ],
    },
    exerciseTime: [
      {
        title: "How much daily exercise will you give your dog?",
        type: "text",
        placeholder: "e.g. 2 Hours",
      },
    ],
    exerciseType: [
      {
        title: "What type of exercise will your dog receive?",
        type: "text",
        placeholder: "e.g. Walking, playing fetch",
      },
    ],

    dogSleepLocation: [
      {
        title: "Where will your dog sleep at night?",
        type: "text",
        placeholder: "e.g. In the kitchen",
      },
    ],

    ownOtherDogsCurrentInfo: {
      ownOtherCurrentDogs: [
        {
          title: "Do you own other dogs?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: [
              "ownOtherDogsCurrentInfo>otherCurrentDogBreed",
              "ownOtherDogsCurrentInfo>otherCurrentDogNeutered",
              "ownOtherDogsCurrentInfo>otherCurrentDogTime",
            ],
            No: ["ownOtherDogsPastInfo>ownOtherPastDogs"],
          },
        },
      ],
      otherCurrentDogBreed: [
        {
          title: "Dog Breeds?",
          type: "text",
          placeholder: "e.g. Collie, Labrador",
          hidden: true,
        },
      ],
      otherCurrentDogNeutered: [
        {
          title: "Neutered?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          hidden: true,
        },
      ],
      otherCurrentDogTime: [
        {
          title: "How long have you had them?",
          hidden: true,
          type: "text",
        },
      ],
    },

    ownOtherDogsPastInfo: {
      ownOtherPastDogs: [
        {
          title: "Have you owned a dog before?",
          type: "select",
          values: [
            ["Select", ""],
            ["As a Child", "As a Child"],
            ["As an Adult", "As an Adult"],
            ["No", "No"],
          ],
          hidden: true,
          exposes: {
            "As an Adult": [
              "ownOtherDogsPastInfo>otherPastDogTime",
              "ownOtherDogsPastInfo>otherDogFate",
            ],
            "As a Child": [
              "ownOtherDogsPastInfo>otherPastDogTime",
              "ownOtherDogsPastInfo>otherDogFate",
            ],
          },
        },
      ],
      otherPastDogTime: [
        {
          title: "How long did you have it?",
          type: "text",
          hidden: true,
          placeholder: "e.g. 2 Hours",
        },
      ],
      otherDogFate: [
        {
          title: "What happened to it?",
          type: "text",
          hidden: true,
          placeholder: "e.g. Died of old age",
        },
      ],
    },
    dogOwnOtherPetsCurrentInfo: {
      dogOwnOtherCurrentPets: [
        {
          title: "Do you own other pets?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: ["dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes"],
          },
        },
      ],
      dogOtherCurrentPetTypes: [
        {
          title: "What types of pets do you have?",
          type: "text",
          placeholder: "e.g. 2 Cats, A snake",
          hidden: true,
        },
      ],
    },
    dogAwareOfCostsAndLegal: [
      {
        title:
          "Are you fully aware of the costs and legal implications of keeping a dog?",
        type: "select",
        values: [
          ["Select", ""],
          ["Yes", "Yes"],
          ["No", "No"],
        ],
      },
    ],
    dogHowSoon: [
      {
        title: "How soon do you want a dog?",
        type: "select",
        values: [
          ["Select", ""],
          ["Immediately", "Immediately"],
          ["Wait for the right one", "Wait for the right one"],
        ],
      },
    ],
    dogFurtherInfo: [
      {
        title:
          "Any further information to help us match a dog to your home and lifestyle?",
        type: "textarea",
        placeholder: "Enter further information here",
      },
    ],
  },

  catQuestions: {
    catReason: [
      {
        title: "Do you want a cat for:",
        type: "select",
        values: [
          ["Select", ""],
          ["Indoors", "Indoors"],
          ["Outdoors", "Outdoors"],
          ["Both", "Both"],
        ],
      },
    ],
    catHomeAloneInfo: {
      catHomeAlone: [
        {
          title: "Will your cat be left at home alone?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: [
              "catHomeAloneInfo>catHomeAloneHours",
              "catHomeAloneInfo>catHomeAloneFrequency",
            ],
          },
        },
      ],
      catHomeAloneHours: [
        {
          title: "How many hours per day?",
          type: "text",
          placeholder: "e.g. 4 Hours",
          hidden: true,
        },
      ],
      catHomeAloneFrequency: [
        {
          title: "How often?",
          type: "text",
          placeholder: "e.g. Every day",
          hidden: true,
        },
      ],
    },
    catSleepLocation: [
      {
        title: "Where will your cat sleep at night?",
        type: "text",
        placeholder: "e.g. In the kitchen",
      },
    ],

    ownOtherCatsCurrentInfo: {
      ownOtherCurrentCats: [
        {
          title: "Do you own other cats?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            No: ["ownOtherCatsPastInfo>ownOtherPastCats"],
          },
        },
      ],
    },
    ownOtherCatsPastInfo: {
      ownOtherPastCats: [
        {
          title: "Have you owned a cat before?",
          type: "select",
          values: [
            ["Select", ""],
            ["As a Child", "As a Child"],
            ["As an Adult", "As an Adult"],
            ["No", "No"],
          ],
          hidden: true,

          exposes: {
            "As an Adult": [
              "ownOtherCatsPastInfo>otherPastCatTime",
              "ownOtherCatsPastInfo>otherCatFate",
            ],
            "As a Child": [
              "ownOtherCatsPastInfo>otherPastCatTime",
              "ownOtherCatsPastInfo>otherCatFate",
            ],
          },
        },
      ],
      otherPastCatTime: [
        {
          title: "How long did you have it?",
          type: "text",
          placeholder: "e.g. 2 Hours",
          hidden: true,
        },
      ],
      otherCatFate: [
        {
          title: "What happened to it?",
          type: "text",
          placeholder: "e.g. Died of old age",
          hidden: true,
        },
      ],
    },
    ownOtherPetsCurrentInfo: {
      ownOtherCurrentPets: [
        {
          title: "Do you own other pets?",
          type: "select",
          values: [
            ["Select", ""],
            ["Yes", "Yes"],
            ["No", "No"],
          ],
          exposes: {
            Yes: ["ownOtherPetsCurrentInfo>otherCurrentPetTypes"],
          },
        },
      ],
      otherCurrentPetTypes: [
        {
          title: "What types of pets do you have?",
          type: "text",
          hidden: true,
          placeholder: "e.g. 2 Cats, A snake",
        },
      ],
    },

    catAwareOfCostsAndLegal: [
      {
        title: "Are you fully aware of the costs of keeping a cat?",
        type: "select",
        values: [
          ["Select", ""],
          ["Yes", "Yes"],
          ["No", "No"],
        ],
      },
    ],
    catHowSoon: [
      {
        title: "How soon do you want a cat?",
        type: "select",
        values: [
          ["Select", ""],
          ["Immediately", "Immediately"],
          ["Wait for the right one", "Wait for the right one"],
        ],
      },
    ],
    catFurtherInfo: [
      {
        title:
          "Any further information to help us match a cat to your home and lifestyle?",
        type: "textarea",
        placeholder: "Enter further information here",
      },
    ],
  },

  hearAboutUsInfo: {
    hearAboutUs: [
      {
        title: "How did you hear about Bright Eyes?",
        type: "select",
        values: [
          ["Select", ""],
          ["From a friend", "From a friend"],
          ["Newspaper", "Newspaper"],
          ["Vet", "Vet"],
          ["I live locally", "I live locally"],
          ["Event", "Event"],
          ["Radio", "Radio"],
          ["Facebook", "Facebook/Instagram"],
          ["Web Search (e.g. Google)", "Web Search (e.g. Google)"],
          ["Other", "Other"],
        ],
        exposes: {
          Other: ["other"],
        },
      },
    ],
    other: [
      {
        title: "We'd love to know where you heard of us!",
        type: "text",
        hidden: true,
        placeholder: "",
      },
    ],
  },
};
