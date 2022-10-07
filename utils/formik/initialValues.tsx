export const adoptionInitialValues = {
  type: "",
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
    dogName: "",
    dogSize: "",
    dogType: "",
    dogAge: "",
    dogSex: "",
  },
  catMatchingQuestions: {
    catName: "",
    catAge: "",
    catType: "",
    catColour: "",
    catSex: "",
    catAllergy: "",
  },
  homeQuestions: {
    homeType: "",
    rentOrOwn: "",
    townOrCountry: "",
    nextToRoad: "",
    gardenOrYard: "",
    // gardenOrYardInfo: {
    //   gardenOrYardSize: "",
    //   fullyEnclosed: "",
    //   fenceHeight: "",
    // },

    "gardenOrYardInfo>gardenOrYardSize": "",
    "gardenOrYardInfo>fullyEnclosed": "",
    "gardenOrYardInfo>fenceHeight": "",

    numAdults: "",
    numChildren: "",
    childrenAges: "",
    otherChildrenVisitInfo: {
      otherChildrenVisit: "",
      otherChildrenAges: "",
      otherChildrenVisitFrequency: "",
    },
    retired: "",
    planning: {
      baby: "",
      moving: "",
      workHoursChange: "",
      holiday: "",
    },
  },

  dogQuestions: {
    dogReason: "",
    dogHomeAloneInfo: {
      dogHomeAlone: "",
      dogHomeAloneHours: "",
      dogHomeAloneFrequency: "",
    },

    exerciseType: "",
    exerciseTime: "",
    dogSleepLocation: "",

    ownOtherDogsCurrentInfo: {
      ownOtherCurrentDogs: "",
      otherCurrentDogBreed: "",
      otherCurrentDogNeutered: "",
      otherCurrentDogTime: "",
    },
    dogOwnOtherPetsCurrentInfo: {
      dogOwnOtherCurrentPets: "",
      dogOtherCurrentPetTypes: "",
    },
    ownOtherDogsPastInfo: {
      ownOtherPastDogs: "",
      otherPastDogTime: "",
      otherDogFate: "",
    },

    dogAwareOfCostsAndLegal: "",
    dogHowSoon: "",
    dogFurtherInfo: "",
  },
  catQuestions: {
    catReason: "",
    catHomeAloneInfo: {
      catHomeAlone: "",
      catHomeAloneHours: "",
      catHomeAloneFrequency: "",
    },
    catSleepLocation: "",

    ownOtherCatsCurrentInfo: {
      ownOtherCurrentCats: "",
    },
    ownOtherPetsCurrentInfo: {
      ownOtherCurrentPets: "",
      otherCurrentPetTypes: "",
    },
    ownOtherCatsPastInfo: {
      ownOtherPastCats: "",
      otherPastCatTime: "",
      otherCatFate: "",
    },

    catAwareOfCostsAndLegal: "",
    catHowSoon: "",
    catFurtherInfo: "",
  },

  hearAboutUsInfo: {
    hearAboutUs: "",
    other: "",
  },
  //   updatedAt: {
  //     type: Date,
  //     default: new Date(),
  //   },
  //   archive: "No",
};
