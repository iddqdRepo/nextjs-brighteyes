export interface AdoptionFormBuilderInterface {
  aboutQuestions: aboutQuestionsInterface;
  dogMatchingQuestions: dogMatchingQuestionsInterface;
  catMatchingQuestions: catMatchingQuestionsInterface;
  homeQuestions: homeQuestionsInterface;
  dogQuestions: dogQuestionsInterface;
  catQuestions: catQuestionsInterface;
  hearAboutUsInfo: hearAboutUsInfoInterface;
}

interface FieldTemplateInterface {
  title: string;
  type: string;
  values?: string[][];
  placeholder?: string | undefined;
  hidden?: boolean;
  exposes?: {
    [key: string]: string[] | string[][];
  };
}

export interface aboutQuestionsInterface {
  title: FieldTemplateInterface[];
  name: FieldTemplateInterface[];
  address: FieldTemplateInterface[];
  postcode: FieldTemplateInterface[];
  phone: FieldTemplateInterface[];
  mobile: FieldTemplateInterface[];
  email: FieldTemplateInterface[];
}

export interface dogMatchingQuestionsInterface {
  dogName: FieldTemplateInterface[];
  dogSize: FieldTemplateInterface[];
  dogType: FieldTemplateInterface[];
  dogAge: FieldTemplateInterface[];
  dogSex: FieldTemplateInterface[];
}

export interface catMatchingQuestionsInterface {
  catName: FieldTemplateInterface[];
  catAge: FieldTemplateInterface[];
  catType: FieldTemplateInterface[];
  catColour: FieldTemplateInterface[];
  catSex: FieldTemplateInterface[];
  catAllergy: FieldTemplateInterface[];
}

export interface homeQuestionsInterface {
  homeType: FieldTemplateInterface[];
  rentOrOwn: FieldTemplateInterface[];
  townOrCountry: FieldTemplateInterface[];
  nextToRoad: FieldTemplateInterface[];
  gardenOrYard: FieldTemplateInterface[];
  gardenOrYardInfo: {
    gardenOrYardSize: FieldTemplateInterface[];
    fullyEnclosed: FieldTemplateInterface[];
    fenceHeight: FieldTemplateInterface[];
  };
  numAdults: FieldTemplateInterface[];
  numChildren: FieldTemplateInterface[];
  childrenAges: FieldTemplateInterface[];
  otherChildrenVisitInfo: {
    otherChildrenVisit: FieldTemplateInterface[];
    otherChildrenAges: FieldTemplateInterface[];
    otherChildrenVisitFrequency: FieldTemplateInterface[];
  };
  retired: FieldTemplateInterface[];
  planning: {
    baby: FieldTemplateInterface[];
    moving: FieldTemplateInterface[];
    workHoursChange: FieldTemplateInterface[];
    holiday: FieldTemplateInterface[];
  };
}

export interface dogQuestionsInterface {
  dogReason: FieldTemplateInterface[];
  dogHomeAloneInfo: {
    dogHomeAlone: FieldTemplateInterface[];
    dogHomeAloneHours: FieldTemplateInterface[];
    dogHomeAloneFrequency: FieldTemplateInterface[];
  };

  exerciseType: FieldTemplateInterface[];
  exerciseTime: FieldTemplateInterface[];
  dogSleepLocation: FieldTemplateInterface[];

  ownOtherDogsCurrentInfo: {
    ownOtherCurrentDogs: FieldTemplateInterface[];
    otherCurrentDogBreed: FieldTemplateInterface[];
    otherCurrentDogNeutered: FieldTemplateInterface[];
    otherCurrentDogTime: FieldTemplateInterface[];
  };
  dogOwnOtherPetsCurrentInfo: {
    dogOwnOtherCurrentPets: FieldTemplateInterface[];
    dogOtherCurrentPetTypes: FieldTemplateInterface[];
  };
  ownOtherDogsPastInfo: {
    ownOtherPastDogs: FieldTemplateInterface[];
    otherPastDogTime: FieldTemplateInterface[];
    otherDogFate: FieldTemplateInterface[];
  };

  dogAwareOfCostsAndLegal: FieldTemplateInterface[];
  dogHowSoon: FieldTemplateInterface[];
  dogFurtherInfo: FieldTemplateInterface[];
}

export interface catQuestionsInterface {
  catReason: FieldTemplateInterface[];
  catHomeAloneInfo: {
    catHomeAlone: FieldTemplateInterface[];
    catHomeAloneHours: FieldTemplateInterface[];
    catHomeAloneFrequency: FieldTemplateInterface[];
  };
  catSleepLocation: FieldTemplateInterface[];

  ownOtherCatsCurrentInfo: {
    ownOtherCurrentCats: FieldTemplateInterface[];
  };
  ownOtherPetsCurrentInfo: {
    ownOtherCurrentPets: FieldTemplateInterface[];
    otherCurrentPetTypes: FieldTemplateInterface[];
  };
  ownOtherCatsPastInfo: {
    ownOtherPastCats: FieldTemplateInterface[];
    otherPastCatTime: FieldTemplateInterface[];
    otherCatFate: FieldTemplateInterface[];
  };

  catAwareOfCostsAndLegal: FieldTemplateInterface[];
  catHowSoon: FieldTemplateInterface[];
  catFurtherInfo: FieldTemplateInterface[];
}
export interface hearAboutUsInfoInterface {
  hearAboutUs: FieldTemplateInterface[];
  other: FieldTemplateInterface[];
}
