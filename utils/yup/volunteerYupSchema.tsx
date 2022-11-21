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
  homePhone: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  workPhone: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  mobile: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  occupation: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  overSixteen: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const emergencyContactInfoSchema = Yup.object().shape({
  emergencyContactTitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  emergencyContactName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  emergencyContactRelationship: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  emergencyContactPhonePrimary: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  emergencyContactPhoneSecondary: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
});
const healthInfoSchema = Yup.object().shape({
  physicallyFit: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  tetanus: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  healthConditionSpecialNeeds: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  healthConditionSpecialNeedsDetails: Yup.string().when(
    ["healthConditionSpecialNeeds"],
    {
      is: "Yes",
      then: Yup.string().required("Required"),
    }
  ),
});
const volunteeringInfoSchema = Yup.object().shape({
  workInterestedIn: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  maxHours: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  timeSlot: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  daysOfTheWeek: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  employeeOrVolunteerAnimals: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const refereeInfoSchema = Yup.object().shape({
  refereeTitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  refereeName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  refereeRelationship: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  refereeAddress: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  refereePostcode: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  refereePhone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  refereeEmail: Yup.string().email("Invalid email"),
});

const offenderInfoSchema = Yup.object().shape({
  offender: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  offenderDetails: Yup.string().when(["offender"], {
    is: "Yes",
    then: Yup.string().required("Required"),
  }),
});

export const VolunteerSchema = Yup.object().shape({
  aboutQuestions: aboutQuestionsSchema,
  emergencyContactInfo: emergencyContactInfoSchema,
  healthInfo: healthInfoSchema,
  volunteeringInfo: volunteeringInfoSchema,
  refereeInfo: refereeInfoSchema,
  offenderInfo: offenderInfoSchema,
});
