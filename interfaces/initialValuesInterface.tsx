export interface InitialValuesInterface {
  type: string;
  aboutQuestions: ivAboutQuestionsInterface;
  dogMatchingQuestions: ivDogMatchingQuestionsInterface;
  catMatchingQuestions: ivCatMatchingQuestionsInterface;
  homeQuestions: ivHomeQuestionsInterface;
  dogQuestions: ivDogQuestionsInterface;
  catQuestions: ivCatQuestions;
  hearAboutUsInfo: ivHearAboutUsInfoInterface;
}
export interface ivAboutQuestionsInterface {
  title: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  name: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  address: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  postcode: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  phone: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  mobile: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  email: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}

export interface ivDogMatchingQuestionsInterface {
  dogName: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogSize: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogType: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogAge: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogSex: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}
export interface ivCatMatchingQuestionsInterface {
  catName: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catAge: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catType: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catColour: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catSex: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catAllergy: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}

export interface ivHomeQuestionsInterface {
  homeType: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  rentOrOwn: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  townOrCountry: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  nextToRoad: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  gardenOrYard: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "gardenOrYardInfo>gardenOrYardSize": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "gardenOrYardInfo>fullyEnclosed": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "gardenOrYardInfo>fenceHeight": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  numAdults: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  numChildren: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  childrenAges: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "otherChildrenVisitInfo>otherChildrenVisit": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "otherChildrenVisitInfo>otherChildrenAges": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "otherChildrenVisitInfo>otherChildrenVisitFrequency": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  retired: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "planning>baby": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "planning>moving": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "planning>workHoursChange": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "planning>holiday": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}

export interface ivDogQuestionsInterface {
  dogReason: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "dogHomeAloneInfo>dogHomeAlone": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "dogHomeAloneInfo>dogHomeAloneHours": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "dogHomeAloneInfo>dogHomeAloneFrequency": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  exerciseType: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  exerciseTime: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogSleepLocation: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsCurrentInfo>ownOtherCurrentDogs": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsCurrentInfo>otherCurrentDogBreed": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsCurrentInfo>otherCurrentDogNeutered": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsCurrentInfo>otherCurrentDogTime": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsPastInfo>ownOtherPastDogs": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsPastInfo>otherPastDogTime": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherDogsPastInfo>otherDogFate": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogAwareOfCostsAndLegal: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogHowSoon: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  dogFurtherInfo: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}

export interface ivCatQuestions {
  catReason: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "catHomeAloneInfo>catHomeAlone": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "catHomeAloneInfo>catHomeAloneFrequency": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "catHomeAloneInfo>catHomeAloneHours": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catSleepLocation: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherCatsCurrentInfo>ownOtherCurrentCats": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherCatsPastInfo>ownOtherPastCats": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherCatsPastInfo>otherCatFate": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherCatsPastInfo>otherPastCatTime": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherPetsCurrentInfo>ownOtherCurrentPets": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  "ownOtherPetsCurrentInfo>otherCurrentPetTypes": {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catAwareOfCostsAndLegal: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catHowSoon: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  catFurtherInfo: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}

export interface ivHearAboutUsInfoInterface {
  hearAboutUs: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
  other: {
    title: string;
    type: string;
    values?: string[][];
    hidden?: boolean;
    exposes?: {
      [key: string]: string[] | string[][];
    };
  };
}
