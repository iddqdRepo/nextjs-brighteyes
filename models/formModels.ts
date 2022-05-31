import mongoose from "mongoose";

const Schema = mongoose.Schema;
const formPetAdoptionSchema = new Schema({
  type: String,
  aboutQuestions: {
    title: String,
    name: String,
    address: String,
    postcode: String,
    phone: String,
    mobile: String,
    email: String,
  },
  dogMatchingQuestions: {
    dogName: String,
    dogSize: String,
    dogType: String,
    dogAge: String,
    dogSex: String,
  },
  catMatchingQuestions: {
    catName: String,
    catAge: String,
    catType: String,
    catColour: String,
    catSex: String,
    catAllergy: String,
  },
  homeQuestions: {
    homeType: String,
    rentOrOwn: String,
    townOrCountry: String,
    nextToRoad: String,
    gardenOrYard: String,
    gardenOrYardInfo: {
      gardenOrYardSize: String,
      fullyEnclosed: String,
      fenceHeight: String,
    },
    numAdults: String,
    numChildren: String,
    childrenAges: String,
    otherChildrenVisitInfo: {
      otherChildrenVisit: String,
      otherChildrenAges: String,
      otherChildrenVisitFrequency: String,
    },
    retired: String,
    planning: {
      baby: String,
      moving: String,
      workHoursChange: String,
      holiday: String,
    },
  },

  dogQuestions: {
    dogReason: String,
    dogHomeAloneInfo: {
      dogHomeAlone: String,
      dogHomeAloneHours: String,
      dogHomeAloneFrequency: String,
    },

    exerciseType: String,
    exerciseTime: String,
    dogSleepLocation: String,

    ownOtherDogsCurrentInfo: {
      ownOtherCurrentDogs: String,
      otherCurrentDogBreed: String,
      otherCurrentDogNeutered: String,
      otherCurrentDogTime: String,
    },
    dogOwnOtherPetsCurrentInfo: {
      dogOwnOtherCurrentPets: String,
      dogOtherCurrentPetTypes: String,
    },
    ownOtherDogsPastInfo: {
      ownOtherPastDogs: String,
      otherPastDogTime: String,
      otherDogFate: String,
    },

    dogAwareOfCostsAndLegal: String,
    dogHowSoon: String,
    dogFurtherInfo: String,
  },
  catQuestions: {
    catReason: String,
    catHomeAloneInfo: {
      catHomeAlone: String,
      catHomeAloneHours: String,
      catHomeAloneFrequency: String,
    },
    catSleepLocation: String,

    ownOtherCatsCurrentInfo: {
      ownOtherCurrentCats: String,
    },
    ownOtherPetsCurrentInfo: {
      ownOtherCurrentPets: String,
      otherCurrentPetTypes: String,
    },
    ownOtherCatsPastInfo: {
      ownOtherPastCats: String,
      otherPastCatTime: String,
      otherCatFate: String,
    },

    catAwareOfCostsAndLegal: String,
    catHowSoon: String,
    catFurtherInfo: String,
  },

  hearAboutUsInfo: {
    hearAboutUs: String,
    other: String,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  archive: String,
});

const formGiftAidSchema = new Schema({
  type: String,
  date: {
    type: Date,
    default: new Date(),
  },
  giftAidFuture: String,
  giftAidPast: String,
  aboutQuestions: {
    name: String,
    address: String,
    postcode: String,
    phone: String,
    mobile: String,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  archive: String,
});

const formVolunteerSchema = new Schema({
  type: String,
  date: String,
  aboutQuestions: {
    title: String,
    name: String,
    address: String,
    postcode: String,
    homePhone: String,
    workPhone: String,
    mobile: String,
    email: String,
    occupation: String,
    overSixteen: String,
  },
  emergencyContactInfo: {
    emergencyContactTitle: String,
    emergencyContactName: String,
    emergencyContactRelationship: String,
    emergencyContactPhonePrimary: String,
    emergencyContactPhoneSecondary: String,
  },
  healthInfo: {
    physicallyFit: String,
    tetanus: String,
    healthConditionSpecialNeeds: String,
    healthConditionSpecialNeedsDetails: String,
  },
  volunteeringInfo: {
    workInterestedIn: String,
    maxHours: String,
    timeSlot: String,
    daysOfTheWeek: String,
    employeeOrVolunteerAnimals: String,
  },
  refereeInfo: {
    refereeTitle: String,
    refereeName: String,
    refereeRelationship: String,
    refereeAddress: String,
    refereePostcode: String,
    refereePhone: String,
    refereeEmail: String,
  },
  offenderInfo: {
    offender: String,
    offenderDetails: String,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  archive: String,
});

const FormPetAdoptionModel = mongoose.model(
  "PetAdoptionForm",
  formPetAdoptionSchema
);
const FormGiftAidModel = mongoose.model("GiftAidForm", formGiftAidSchema);
const FormVolunteerModel = mongoose.model("VolunteerForm", formVolunteerSchema);

let modelExport = {
  FormPetAdoptionModel,
  FormGiftAidModel,
  FormVolunteerModel,
};

export default modelExport;
