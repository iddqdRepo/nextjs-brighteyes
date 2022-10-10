export interface FormBuilderInterface {
  aboutQuestions: aboutQuestionsInterface;
  dogMatchingQuestions: dogMatchingQuestionsInterface;
  catMatchingQuestions: catMatchingQuestionsInterface;
  homeQuestions: homeQuestionsInterface;
  dogQuestions: dogQuestionsInterface;
  catQuestions: catMatchingQuestionsInterface;
  hearAboutUsInfo: hearAboutUsInfoInterface;
}

export interface aboutQuestionsInterface {
  title: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  name: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  address: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  postcode: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  phone: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  mobile: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  email: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
}

export interface dogMatchingQuestionsInterface {
  dogName: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  dogSize: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  dogType: {
    title: string;
    type: string;
    values?: any;
  }[];
  dogAge: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  dogSex: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
}

export interface catMatchingQuestionsInterface {
  catName: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  catAge: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  catType: {
    title: string;
    type: string;
    values?: any;
  }[];
  catColour: {
    title: string;
    type: string;
    values?: any;
  }[];
  catSex: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  catAllergy: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
}

export interface homeQuestionsInterface {
  homeType: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  rentOrOwn: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  townOrCountry: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  nextToRoad: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  gardenOrYard: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
    exposes: {
      [key: string]: string[] | string[][];
    };
  }[];
  gardenOrYardInfo: {
    gardenOrYardSize: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
      hidden: boolean;
    }[];
    fullyEnclosed: {
      title: string;
      type: string;
      values: string[][];
      hidden: boolean;
      exposes: {
        [key: string]: string[] | string[][];
      };
    }[];
    fenceHeight: {
      title: string;
      type: string;
      values: string[][];
      hidden: boolean;
    }[];
  };
  numAdults: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  numChildren: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  childrenAges: {
    title: string;
    type: string;
    values?: any;
    placeholder: string;
  }[];
  otherChildrenVisitInfo: {
    otherChildrenVisit: {
      title: string;
      type: string;
      values: string[][];
      exposes: {
        [key: string]: string[] | string[][];
      };
    }[];
    otherChildrenAges: {
      title: string;
      type: string;
      values?: any;
      hidden: boolean;

      placeholder?: string | undefined;
    }[];
    otherChildrenVisitFrequency: {
      title: string;
      type: string;
      values?: any;
      hidden: boolean;

      placeholder?: string | undefined;
    }[];
  };
  retired: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  planning: {
    baby: {
      title: string;
      type: string;
    }[];
    moving: {
      title: string;
      type: string;
    }[];
    workHoursChange: {
      title: string;
      type: string;
    }[];
    holiday: {
      title: string;
      type: string;
    }[];
  };
}

export interface dogQuestionsInterface {
  dogReason: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  dogHomeAloneInfo: {
    dogHomeAlone: {
      title: string;
      type: string;
      values: string[][];
    }[];
    dogHomeAloneHours: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
    dogHomeAloneFrequency: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };

  exerciseType: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  exerciseTime: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  dogSleepLocation: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];

  ownOtherDogsCurrentInfo: {
    ownOtherCurrentDogs: {
      title: string;
      type: string;
      values: string[][];
    }[];
    otherCurrentDogBreed: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
    otherCurrentDogNeutered: {
      title: string;
      type: string;
      values: string[][];
    }[];
    otherCurrentDogTime: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };
  dogOwnOtherPetsCurrentInfo: {
    dogOwnOtherCurrentPets: {
      title: string;
      type: string;
      values: string[][];
    }[];
    dogOtherCurrentPetTypes: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };
  ownOtherDogsPastInfo: {
    ownOtherPastDogs: {
      title: string;
      type: string;
      values: string[][];
    }[];
    otherPastDogTime: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
    otherDogFate: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };

  dogAwareOfCostsAndLegal: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
  dogHowSoon: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  dogFurtherInfo: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
}

export interface catMatchingQuestionsInterface {
  catReason: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  catHomeAloneInfo: {
    catHomeAlone: {
      title: string;
      type: string;
      values: string[][];
    }[];
    catHomeAloneHours: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
    catHomeAloneFrequency: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };
  catSleepLocation: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];

  ownOtherCatsCurrentInfo: {
    ownOtherCurrentCats: {
      title: string;
      type: string;
      values: string[][];
    }[];
  };
  ownOtherPetsCurrentInfo: {
    ownOtherCurrentPets: {
      title: string;
      type: string;
      values: string[][];
    }[];
    otherCurrentPetTypes: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };
  ownOtherCatsPastInfo: {
    ownOtherPastCats: {
      title: string;
      type: string;
      values: string[][];
    }[];
    otherPastCatTime: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
    otherCatFate: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string | undefined;
    }[];
  };

  catAwareOfCostsAndLegal: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  catHowSoon: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  catFurtherInfo: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
}
export interface hearAboutUsInfoInterface {
  hearAboutUs: {
    title: string;
    type: string;
    values: string[][];
    placeholder?: string | undefined;
  }[];
  other: {
    title: string;
    type: string;
    values?: any;
    placeholder?: string | undefined;
  }[];
}
