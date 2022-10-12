export interface InitialValuesInterface {
  type: string;
  aboutQuestions: ivAboutQuestionsInterface;
  dogMatchingQuestions: ivDogMatchingQuestionsInterface;
  catMatchingQuestions: ivCatMatchingQuestionsInterface;
  homeQuestions: ivHomeQuestionsInterface;
  dogQuestions: ivDogQuestionsInterface;
  catQuestions: ivCatQuestionsInterface;
  hearAboutUsInfo: ivHearAboutUsInfoInterface;
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

export interface ivAboutQuestionsInterface {
  title: FieldTemplateInterface;
  name: FieldTemplateInterface;
  address: FieldTemplateInterface;
  postcode: FieldTemplateInterface;
  phone: FieldTemplateInterface;
  mobile: FieldTemplateInterface;
  email: FieldTemplateInterface;
}

export interface ivDogMatchingQuestionsInterface {
  dogName: FieldTemplateInterface;
  dogSize: FieldTemplateInterface;
  dogType: FieldTemplateInterface;
  dogAge: FieldTemplateInterface;
  dogSex: FieldTemplateInterface;
}
export interface ivCatMatchingQuestionsInterface {
  catName: FieldTemplateInterface;
  catAge: FieldTemplateInterface;
  catType: FieldTemplateInterface;
  catColour: FieldTemplateInterface;
  catSex: FieldTemplateInterface;
  catAllergy: FieldTemplateInterface;
}

export interface ivHomeQuestionsInterface {
  homeType: FieldTemplateInterface;
  rentOrOwn: FieldTemplateInterface;
  townOrCountry: FieldTemplateInterface;
  nextToRoad: FieldTemplateInterface;
  gardenOrYard: FieldTemplateInterface;
  "gardenOrYardInfo>gardenOrYardSize": FieldTemplateInterface;
  "gardenOrYardInfo>fullyEnclosed": FieldTemplateInterface;
  "gardenOrYardInfo>fenceHeight": FieldTemplateInterface;
  numAdults: FieldTemplateInterface;
  numChildren: FieldTemplateInterface;
  childrenAges: FieldTemplateInterface;
  "otherChildrenVisitInfo>otherChildrenVisit": FieldTemplateInterface;
  "otherChildrenVisitInfo>otherChildrenAges": FieldTemplateInterface;
  "otherChildrenVisitInfo>otherChildrenVisitFrequency": FieldTemplateInterface;
  retired: FieldTemplateInterface;
  "planning>baby": FieldTemplateInterface;
  "planning>moving": FieldTemplateInterface;
  "planning>workHoursChange": FieldTemplateInterface;
  "planning>holiday": FieldTemplateInterface;
}

export interface ivDogQuestionsInterface {
  dogReason: FieldTemplateInterface;
  "dogHomeAloneInfo>dogHomeAlone": FieldTemplateInterface;
  "dogHomeAloneInfo>dogHomeAloneHours": FieldTemplateInterface;
  "dogHomeAloneInfo>dogHomeAloneFrequency": FieldTemplateInterface;
  exerciseType: FieldTemplateInterface;
  exerciseTime: FieldTemplateInterface;
  dogSleepLocation: FieldTemplateInterface;
  "ownOtherDogsCurrentInfo>ownOtherCurrentDogs": FieldTemplateInterface;
  "ownOtherDogsCurrentInfo>otherCurrentDogBreed": FieldTemplateInterface;
  "ownOtherDogsCurrentInfo>otherCurrentDogNeutered": FieldTemplateInterface;
  "ownOtherDogsCurrentInfo>otherCurrentDogTime": FieldTemplateInterface;
  "dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets": FieldTemplateInterface;
  "dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes": FieldTemplateInterface;
  "ownOtherDogsPastInfo>ownOtherPastDogs": FieldTemplateInterface;
  "ownOtherDogsPastInfo>otherPastDogTime": FieldTemplateInterface;
  "ownOtherDogsPastInfo>otherDogFate": FieldTemplateInterface;
  dogAwareOfCostsAndLegal: FieldTemplateInterface;
  dogHowSoon: FieldTemplateInterface;
  dogFurtherInfo: FieldTemplateInterface;
}

export interface ivCatQuestionsInterface {
  catReason: FieldTemplateInterface;
  "catHomeAloneInfo>catHomeAlone": FieldTemplateInterface;
  "catHomeAloneInfo>catHomeAloneFrequency": FieldTemplateInterface;
  "catHomeAloneInfo>catHomeAloneHours": FieldTemplateInterface;
  catSleepLocation: FieldTemplateInterface;
  "ownOtherCatsCurrentInfo>ownOtherCurrentCats": FieldTemplateInterface;
  "ownOtherCatsPastInfo>ownOtherPastCats": FieldTemplateInterface;
  "ownOtherCatsPastInfo>otherCatFate": FieldTemplateInterface;
  "ownOtherCatsPastInfo>otherPastCatTime": FieldTemplateInterface;
  "ownOtherPetsCurrentInfo>ownOtherCurrentPets": FieldTemplateInterface;
  "ownOtherPetsCurrentInfo>otherCurrentPetTypes": FieldTemplateInterface;
  catAwareOfCostsAndLegal: FieldTemplateInterface;
  catHowSoon: FieldTemplateInterface;
  catFurtherInfo: FieldTemplateInterface;
}

export interface ivHearAboutUsInfoInterface {
  hearAboutUs: FieldTemplateInterface;
  other: FieldTemplateInterface;
}
