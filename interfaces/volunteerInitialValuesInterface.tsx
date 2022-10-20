export interface VolunteerInitialValuesInterface {
  type: string;
  aboutQuestions: ivAboutQuestionsVolunteerInterface;
  emergencyContactInfo: ivEmergencyContactInfoInterface;
  healthInfo: ivHealthInfoInterface;
  volunteeringInfo: ivVolunteeringInfoInterface;
  refereeInfo: ivRefereeInfoInterface;
  offenderInfo: ivOffenderInfoInterface;
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

export interface ivAboutQuestionsVolunteerInterface {
  title: FieldTemplateInterface;
  name: FieldTemplateInterface;
  address: FieldTemplateInterface;
  postcode: FieldTemplateInterface;
  homePhone: FieldTemplateInterface;
  workPhone: FieldTemplateInterface;
  mobile: FieldTemplateInterface;
  email: FieldTemplateInterface;
  occupation: FieldTemplateInterface;
  overSixteen: FieldTemplateInterface;
}

export interface ivEmergencyContactInfoInterface {
  emergencyContactTitle: FieldTemplateInterface;
  emergencyContactName: FieldTemplateInterface;
  emergencyContactRelationship: FieldTemplateInterface;
  emergencyContactPhonePrimary: FieldTemplateInterface;
  emergencyContactPhoneSecondary: FieldTemplateInterface;
}
export interface ivHealthInfoInterface {
  physicallyFit: FieldTemplateInterface;
  tetanus: FieldTemplateInterface;
  healthConditionSpecialNeeds: FieldTemplateInterface;
  healthConditionSpecialNeedsDetails: FieldTemplateInterface;
}

export interface ivVolunteeringInfoInterface {
  workInterestedIn: FieldTemplateInterface;
  maxHours: FieldTemplateInterface;
  timeSlot: FieldTemplateInterface;
  daysOfTheWeek: FieldTemplateInterface;
  employeeOrVolunteerAnimals: FieldTemplateInterface;
}

export interface ivRefereeInfoInterface {
  refereeTitle: FieldTemplateInterface;
  refereeName: FieldTemplateInterface;
  refereeRelationship: FieldTemplateInterface;
  refereeAddress: FieldTemplateInterface;
  refereePostcode: FieldTemplateInterface;
  refereePhone: FieldTemplateInterface;
  refereeEmail: FieldTemplateInterface;
}

export interface ivOffenderInfoInterface {
  offender: FieldTemplateInterface;
  offenderDetails: FieldTemplateInterface;
}
