export interface FormBuilderInterface {
  aboutQuestions: {
    title: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    name: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    address: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    postcode: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    phone: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    mobile: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    email: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
  };
  dogMatchingQuestions: {
    dogName: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    dogSize: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
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
      placeholder?: string;
    }[];
    dogSex: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
  };
  catMatchingQuestions: {
    catName: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    catAge: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
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
      placeholder?: string;
    }[];
    catAllergy: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
  };
  homeQuestions: {
    homeType: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    rentOrOwn: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    townOrCountry: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    nextToRoad: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    gardenOrYard: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
      exposes: {
        [key: string]: string[] | string[][];
      };
    }[];
    gardenOrYardInfo: {
      gardenOrYardSize: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
        hidden: boolean;
      }[];
      fullyEnclosed: {
        title: string;
        type: string;
        values: string[][];
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
      placeholder?: string;
    }[];
    numChildren: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
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
      }[];
      otherChildrenAges: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
      otherChildrenVisitFrequency: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
    };
    retired: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    planning: {
      baby: {
        title: string;
        type: string;
        values: string[][];
      }[];
      moving: {
        title: string;
        type: string;
        values: string[][];
      }[];
      workHoursChange: {
        title: string;
        type: string;
        values: string[][];
      }[];
      holiday: {
        title: string;
        type: string;
        values: string[][];
      }[];
    };
  };

  dogQuestions: {
    dogReason: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
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
        placeholder?: string;
      }[];
      dogHomeAloneFrequency: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
    };

    exerciseType: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    exerciseTime: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    dogSleepLocation: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
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
        placeholder?: string;
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
        placeholder?: string;
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
        placeholder?: string;
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
        placeholder?: string;
      }[];
      otherDogFate: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
    };

    dogAwareOfCostsAndLegal: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
    dogHowSoon: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    dogFurtherInfo: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
  };
  catQuestions: {
    catReason: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
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
        placeholder?: string;
      }[];
      catHomeAloneFrequency: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
    };
    catSleepLocation: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
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
        placeholder?: string;
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
        placeholder?: string;
      }[];
      otherCatFate: {
        title: string;
        type: string;
        values?: any;
        placeholder?: string;
      }[];
    };

    catAwareOfCostsAndLegal: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    catHowSoon: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    catFurtherInfo: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
  };

  hearAboutUsInfo: {
    hearAboutUs: {
      title: string;
      type: string;
      values: string[][];
      placeholder?: string;
    }[];
    other: {
      title: string;
      type: string;
      values?: any;
      placeholder?: string;
    }[];
  };
}
