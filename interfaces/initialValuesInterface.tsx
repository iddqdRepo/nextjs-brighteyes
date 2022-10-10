export interface InitialValuesInterface {
  type: string;
  aboutQuestions: ivAboutQuestionsInterface;
  dogMatchingQuestions: ivDogMatchingQuestionsInterface;
  catMatchingQuestions: ivCatMatchingQuestionsInterface;
  homeQuestions: ivHomeQuestionsInterface;
  dogQuestions: ivDogQuestionsInterface;
}
export interface ivAboutQuestionsInterface {
  title: string;
  name: string;
  address: string;
  postcode: string;
  phone: string;
  mobile: string;
  email: string;
}

export interface ivDogMatchingQuestionsInterface {
  dogName: string;
  dogSize: string;
  dogType: string;
  dogAge: string;
  dogSex: string;
}
export interface ivCatMatchingQuestionsInterface {
  catName: string;
  catAge: string;
  catType: string;
  catColour: string;
  catSex: string;
  catAllergy: string;
}

export interface ivHomeQuestionsInterface {
  homeType: string;
  rentOrOwn: string;
  townOrCountry: string;
  nextToRoad: string;
  gardenOrYard: string;
  "gardenOrYardInfo>gardenOrYardSize": string;
  "gardenOrYardInfo>fullyEnclosed": string;
  "gardenOrYardInfo>fenceHeight": string;
  numAdults: string;
  numChildren: string;
  childrenAges: string;
  "otherChildrenVisitInfo>otherChildrenVisit": string;
  "otherChildrenVisitInfo>otherChildrenAges": string;
  "otherChildrenVisitInfo>otherChildrenVisitFrequency": string;
  retired: string;
  "planning>baby": string;
  "planning>moving": string;
  "planning>workHoursChange": string;
  "planning>holiday": string;
}

export interface ivDogQuestionsInterface {
  dogReason: string;
  "dogHomeAloneInfo>dogHomeAlone": string;
  "dogHomeAloneInfo>dogHomeAloneHours": string;
  "dogHomeAloneInfo>dogHomeAloneFrequency": string;
  exerciseType: string;
  exerciseTime: string;
  dogSleepLocation: string;
  "ownOtherDogsCurrentInfo>ownOtherCurrentDogs": string;
  "ownOtherDogsCurrentInfo>otherCurrentDogBreed": string;
  "ownOtherDogsCurrentInfo>otherCurrentDogNeutered": string;
  "ownOtherDogsCurrentInfo>otherCurrentDogTime": string;
  "dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets": string;
  "dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes": string;
  "ownOtherDogsPastInfo>ownOtherPastDogs": string;
  "ownOtherDogsPastInfo>otherPastDogTime": string;
  "ownOtherDogsPastInfo>otherDogFate": string;
  dogAwareOfCostsAndLegal: string;
  dogHowSoon: string;
  dogFurtherInfo: string;
}
