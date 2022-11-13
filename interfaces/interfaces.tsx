export interface PetInterface {
  adopted: string;
  age: string;
  breed: string;
  desc: string;
  image: string;
  name: string;
  sex: string;
  size: string;
  suitableForAnimals: string;
  suitableForChildren: string;
  type: string;
  yearsOrMonths: string;
  updatedAt?: string;
  __v?: string | number;
  _id?: string;
}

export interface UserInterface {
  username: string;
  password: string;
  __v?: string | number;
  _id?: string;
}

export interface GiftaidFormInterface {
  aboutQuestions: {
    address: string;
    mobile: string;
    name: string;
    postcode: string;
    phone: string;
  };
  _id: string;
  type: string;
  date: string;
  giftAidFuture: string;
  giftAidPast: string;
  updatedAt: string;
  archive: string;
  __v: 0;
}
export interface ContactUsFormInterface {
  aboutQuestions: {
    name: string;
    email: string;
  };
  message: string;
  type: string;
  _id: string;
  date: string;
  updatedAt: string;
  archive: string;
  __v: 0;
}

export interface PetAdoptionFormInterface {
  aboutQuestions: {
    title: string;
    name: string;
    address: string;
    postcode: string;
    phone: string;
    mobile: string;
    email: string;
  };
  dogMatchingQuestions: {
    dogName: string;
    dogSize: string;
    dogType: string;
    dogAge: string;
    dogSex: string;
  };
  catMatchingQuestions: {
    catName: string;
    catAge: string;
    catType: string;
    catColour: string;
    catSex: string;
    catAllergy: string;
  };
  homeQuestions: {
    gardenOrYardInfo: {
      gardenOrYardSize: string;
      fullyEnclosed: string;
      fenceHeight: string;
    };
    otherChildrenVisitInfo: {
      otherChildrenVisit: string;
      otherChildrenAges: string;
      otherChildrenVisitFrequency: string;
    };
    planning: {
      baby: string;
      moving: string;
      workHoursChange: string;
      holiday: string;
    };
    homeType: string;
    rentOrOwn: string;
    townOrCountry: string;
    nextToRoad: string;
    gardenOrYard: string;
    numAdults: string;
    numChildren: string;
    childrenAges: string;
    retired: string;
  };
  dogQuestions: {
    dogHomeAloneInfo: {
      dogHomeAlone: string;
      dogHomeAloneHours: string;
      dogHomeAloneFrequency: string;
    };
    ownOtherDogsCurrentInfo: {
      ownOtherCurrentDogs: string;
      otherCurrentDogBreed: string;
      otherCurrentDogNeutered: string;
      otherCurrentDogTime: string;
    };
    dogOwnOtherPetsCurrentInfo: {
      dogOwnOtherCurrentPets: string;
      dogOtherCurrentPetTypes: string;
    };
    ownOtherDogsPastInfo: {
      ownOtherPastDogs: string;
      otherPastDogTime: string;
      otherDogFate: string;
    };
    dogReason: string;
    exerciseType: string;
    exerciseTime: string;
    dogSleepLocation: string;
    dogAwareOfCostsAndLegal: string;
    dogHowSoon: string;
    dogFurtherInfo: string;
  };
  catQuestions: {
    catHomeAloneInfo: {
      catHomeAlone: string;
      catHomeAloneHours: string;
      catHomeAloneFrequency: string;
    };
    ownOtherCatsCurrentInfo: {
      ownOtherCurrentCats: string;
    };
    ownOtherPetsCurrentInfo: {
      ownOtherCurrentPets: string;
      otherCurrentPetTypes: string;
    };
    ownOtherCatsPastInfo: {
      ownOtherPastCats: string;
      otherPastCatTime: string;
      otherCatFate: string;
    };
    catReason: string;
    catSleepLocation: string;
    catAwareOfCostsAndLegal: string;
    catHowSoon: string;
    catFurtherInfo: string;
  };
  hearAboutUsInfo: {
    hearAboutUs: string;
    other: string;
  };
  _id: string;
  type: string;
  updatedAt: string;
  archive: string;
  __v: number;
}
export interface VolunteerFormInterface {
  aboutQuestions: {
    title: string;
    name: string;
    address: string;
    postcode: string;
    homePhone: string;
    workPhone: string;
    mobile: string;
    email: string;
    occupation: string;
    overSixteen: string;
  };
  emergencyContactInfo: {
    emergencyContactTitle: string;
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactPhonePrimary: string;
    emergencyContactPhoneSecondary: string;
  };
  healthInfo: {
    physicallyFit: string;
    tetanus: string;
    healthConditionSpecialNeeds: string;
    healthConditionSpecialNeedsDetails: string;
  };
  volunteeringInfo: {
    workInterestedIn: string;
    maxHours: string;
    timeSlot: string;
    daysOfTheWeek: string;
    employeeOrVolunteerAnimals: string;
  };
  refereeInfo: {
    refereeTitle: string;
    refereeName: string;
    refereeRelationship: string;
    refereeAddress: string;
    refereePostcode: string;
    refereePhone: string;
    refereeEmail: string;
  };
  offenderInfo: {
    offender: string;
    offenderDetails: string;
  };
  _id: string;
  type: string;
  date: string;
  updatedAt: string;
  archive: string;
  __v: number;
}

export interface TitleMapInterface {
  _id: string;
  updatedAt: string;
  title: string;
  name: string;
  address: string;
  postcode: string;
  phone: string;
  workPhone: string;
  homePhone: string;
  occupation: string;
  overSixteen: string;
  mobile: string;
  email: string;
  dogName: string;
  dogSize: string;
  dogType: string;
  dogAge: string;
  dogSex: string;
  catName: string;
  catAge: string;
  catType: string;
  catColour: string;
  catSex: string;
  catAllergy: string;
  homeType: string;
  rentOrOwn: string;
  townOrCountry: string;
  nextToRoad: string;
  gardenOrYard: string;
  gardenOrYardSize: string;
  fullyEnclosed: string;
  fenceHeight: string;
  numAdults: string;
  numChildren: string;
  childrenAges: string;
  otherChildrenVisit: string;
  otherChildrenAges: string;
  otherChildrenVisitFrequency: string;
  retired: string;
  baby: string;
  moving: string;
  workHoursChange: string;
  holiday: string;
  dogReason: string;
  dogHomeAlone: string;
  dogHomeAloneHours: string;
  dogHomeAloneFrequency: string;
  catReason: string;
  catHomeAlone: string;
  catHomeAloneHours: string;
  catHomeAloneFrequency: string;
  exerciseType: string;
  exerciseTime: string;
  dogSleepLocation: string;
  ownOtherCurrentDogs: string;
  otherCurrentDogBreed: string;
  otherCurrentDogNeutered: string;
  otherCurrentDogTime: string;
  dogOwnOtherCurrentPets: string;
  dogOtherCurrentPetTypes: string;
  ownOtherPastDogs: string;
  otherPastDogTime: string;
  otherDogFate: string;
  dogAwareOfCostsAndLegal: string;
  dogHowSoon: string;
  dogFurtherInfo: string;
  catSleepLocation: string;
  ownOtherCurrentCats: string;
  ownOtherCurrentPets: string;
  otherCurrentPetTypes: string;
  ownOtherPastCats: string;
  otherPastCatTime: string;
  otherCatFate: string;
  catAwareOfCostsAndLegal: string;
  catHowSoon: string;
  catFurtherInfo: string;
  date: string;
  hearAboutUs: string;
  other: string;
  followUp: string;
  houseVisit: string;
  appointment: string;
  emergencyContactTitle: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhonePrimary: string;
  emergencyContactPhoneSecondary: string;
  physicallyFit: string;
  tetanus: string;
  healthConditionSpecialNeeds: string;
  healthConditionSpecialNeedsDetails: string;
  workInterestedIn: string;
  maxHours: string;
  timeSlot: string;
  daysOfTheWeek: string;
  employeeOrVolunteerAnimals: string;
  refereeTitle: string;
  refereeName: string;
  refereeRelationship: string;
  refereeAddress: string;
  refereePostcode: string;
  refereePhone: string;
  refereeEmail: string;
  offender: string;
  offenderDetails: string;
  giftAidFuture: string;
  giftAidPast: string;
  //* Subcategories
  aboutQuestions: string;
  dogMatchingQuestions: string;
  catMatchingQuestions: string;
  homeQuestions: string;
  dogQuestions: string;
  catQuestions: string;
  hearAboutUsInfo: string;
  emergencyContactInfo: string;
  healthInfo: string;
  volunteeringInfo: string;
  refereeInfo: string;
  offenderInfo: string;
}
