import * as Yup from "yup";

const aboutQuestionsSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  postcode: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobile: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
const dogMatchingSchema = Yup.object().shape({
  dogSize: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dogType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dogAge: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dogSex: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const catMatchingSchema = Yup.object().shape({
  catName: Yup.string(),
  catAge: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  catType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  catColour: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  catSex: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  catAllergy: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const homeQuestionsSchema = Yup.object().shape({
  homeType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  rentOrOwn: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  townOrCountry: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  nextToRoad: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  gardenOrYard: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "gardenOrYardInfo>gardenOrYardSize": Yup.string().when(["gardenOrYard"], {
    is: "Yes",
    then: Yup.string().required("Required"),
  }),
  "gardenOrYardInfo>fullyEnclosed": Yup.string().when(["gardenOrYard"], {
    is: "Yes",
    then: Yup.string().required("Required"),
  }),
  "gardenOrYardInfo>fenceHeight": Yup.string().when(
    ["gardenOrYardInfo>fullyEnclosed"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  numAdults: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  numChildren: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "otherChildrenVisitInfo>otherChildrenVisit":
    Yup.string().required("Required"),
  "otherChildrenVisitInfo>otherChildrenAges": Yup.string().when(
    ["otherChildrenVisitInfo>otherChildrenVisit"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "otherChildrenVisitInfo>otherChildrenVisitFrequency": Yup.string().when(
    ["otherChildrenVisitInfo>otherChildrenVisit"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  retired: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const dogQuestionsSchema = Yup.object().shape({
  dogReason: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "dogHomeAloneInfo>dogHomeAlone": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "dogHomeAloneInfo>dogHomeAloneHours": Yup.string().when(
    ["dogHomeAloneInfo>dogHomeAlone"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "dogHomeAloneInfo>dogHomeAloneFrequency": Yup.string().when(
    ["dogHomeAloneInfo>dogHomeAlone"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  exerciseType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  exerciseTime: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dogSleepLocation: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "ownOtherDogsCurrentInfo>ownOtherCurrentDogs": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "ownOtherDogsCurrentInfo>otherCurrentDogBreed": Yup.string().when(
    ["ownOtherDogsCurrentInfo>ownOtherCurrentDogs"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherDogsCurrentInfo>otherCurrentDogNeutered": Yup.string().when(
    ["ownOtherDogsCurrentInfo>ownOtherCurrentDogs"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherDogsCurrentInfo>otherCurrentDogTime": Yup.string().when(
    ["ownOtherDogsCurrentInfo>ownOtherCurrentDogs"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "dogOwnOtherPetsCurrentInfo>dogOtherCurrentPetTypes": Yup.string().when(
    ["dogOwnOtherPetsCurrentInfo>dogOwnOtherCurrentPets"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherDogsPastInfo>ownOtherPastDogs": Yup.string().when(
    ["ownOtherDogsCurrentInfo>ownOtherCurrentDogs"],
    {
      is: "No",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherDogsPastInfo>otherPastDogTime": Yup.string().when(
    ["ownOtherDogsPastInfo>ownOtherPastDogs"],
    {
      is: (val: string) => val === "As a Child" || val === "As an Adult",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherDogsPastInfo>otherDogFate": Yup.string().when(
    ["ownOtherDogsPastInfo>ownOtherPastDogs"],
    {
      is: (val: string) => val === "As a Child" || val === "As an Adult",
      then: Yup.string().required("Required"),
    }
  ),
  dogAwareOfCostsAndLegal: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dogHowSoon: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const catQuestionsSchema = Yup.object().shape({
  catReason: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "catHomeAloneInfo>catHomeAlone": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "catHomeAloneInfo>catHomeAloneHours": Yup.string().when(
    ["catHomeAloneInfo>catHomeAlone"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  "catHomeAloneInfo>catHomeAloneFrequency": Yup.string().when(
    ["catHomeAloneInfo>catHomeAlone"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  catSleepLocation: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "ownOtherCatsCurrentInfo>ownOtherCurrentCats": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "ownOtherCatsPastInfo>ownOtherPastCats": Yup.string().when(
    ["ownOtherCatsCurrentInfo>ownOtherCurrentCats"],
    {
      is: "No",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherCatsPastInfo>otherPastCatTime": Yup.string().when(
    ["ownOtherCatsPastInfo>ownOtherPastCats"],
    {
      is: (val: string) => val === "As a Child" || val === "As an Adult",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherCatsPastInfo>otherCatFate": Yup.string().when(
    ["ownOtherCatsPastInfo>ownOtherPastCats"],
    {
      is: (val: string) => val === "As a Child" || val === "As an Adult",
      then: Yup.string().required("Required"),
    }
  ),
  "ownOtherPetsCurrentInfo>ownOtherCurrentPets": Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "ownOtherPetsCurrentInfo>otherCurrentPetTypes": Yup.string().when(
    ["ownOtherPetsCurrentInfo>ownOtherCurrentPets"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
  catAwareOfCostsAndLegal: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  catHowSoon: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const hearAboutUsSchema = Yup.object().shape({
  hearAboutUs: Yup.string().required("Required"),
  other: Yup.string().when(["hearAboutUs"], {
    is: "Other",
    then: Yup.string().required("Required"),
  }),
});

export const DogAdoptionSchema = Yup.object().shape({
  aboutQuestions: aboutQuestionsSchema,
  dogMatchingQuestions: dogMatchingSchema,
  homeQuestions: homeQuestionsSchema,
  dogQuestions: dogQuestionsSchema,
  hearAboutUsInfo: hearAboutUsSchema,
});
export const CatAdoptionSchema = Yup.object().shape({
  aboutQuestions: aboutQuestionsSchema,
  catMatchingQuestions: catMatchingSchema,
  homeQuestions: homeQuestionsSchema,
  catQuestions: catQuestionsSchema,
  hearAboutUsInfo: hearAboutUsSchema,
});
