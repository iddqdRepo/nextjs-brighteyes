import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Lightweight tracking shared by every submission type: a New → Being handled
//flag (who/when stamped server-side in api/forms/[id]), staff notes, and a
//read marker. New submissions get status "new" + read false on creation;
//forms with none of these fields predate tracking and display as
//"Pre-update" rather than nagging the team to re-read history. The note
//timestamp is named `date` so stringifyIdsAndDates serialises it for
//getServerSideProps.
const formNoteSchema = new Schema(
  { text: String, by: String, date: Date },
  { _id: false }
);
const trackingFields = {
  status: { type: String, enum: ["new", "handled"] },
  handledBy: String,
  handledAt: Date,
  read: Boolean,
  notes: [formNoteSchema],
};

const formPetAdoptionSchema = new Schema({
  type: String,
  ...trackingFields,
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
  ...trackingFields,
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
  ...trackingFields,
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

const formContactUsSchema = new Schema({
  type: String,
  ...trackingFields,
  aboutQuestions: {
    name: String,
    email: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  message: String,
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  archive: String,
});

const FormPetAdoptionModel =
  mongoose.models.PetAdoptionForm ||
  mongoose.model("PetAdoptionForm", formPetAdoptionSchema);
const FormGiftAidModel =
  mongoose.models.GiftAidForm ||
  mongoose.model("GiftAidForm", formGiftAidSchema);
const FormVolunteerModel =
  mongoose.models.VolunteerForm ||
  mongoose.model("VolunteerForm", formVolunteerSchema);
const FormContactUsModel =
  mongoose.models.ContactUsForm ||
  mongoose.model("ContactUsForm", formContactUsSchema);

let modelExport = {
  FormPetAdoptionModel,
  FormGiftAidModel,
  FormVolunteerModel,
  FormContactUsModel,
};

export default modelExport;
