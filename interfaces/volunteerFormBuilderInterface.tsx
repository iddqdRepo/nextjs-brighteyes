export interface VolunteerFormBuilderInterface {
  aboutQuestions: ivAboutQuestionsInterface;
  emergencyContactInfo: ivEmergencyContactInfo;
  healthInfo: ivHealthInfo;
  volunteeringInfo: ivVolunteeringInfo;
  refereeInfo: ivRefereeInfo;
  offenderInfo: ivOffenderInfo;
}

interface FieldTemplateInterface {
  title: string;
  type: string;
  values?: string[][];
  placeholder?: string | undefined;
  hidden?: boolean;
  exposes?: {
    [key: string]: string[] | string[];
  };
}

export interface ivAboutQuestionsInterface {
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

export interface ivEmergencyContactInfo {
  emergencyContactTitle: FieldTemplateInterface;
  emergencyContactName: FieldTemplateInterface;
  emergencyContactRelationship: FieldTemplateInterface;
  emergencyContactPhonePrimary: FieldTemplateInterface;
  emergencyContactPhoneSecondary: FieldTemplateInterface;
}
export interface ivHealthInfo {
  physicallyFit: FieldTemplateInterface;
  tetanus: FieldTemplateInterface;
  healthConditionSpecialNeeds: FieldTemplateInterface;
  healthConditionSpecialNeedsDetails: FieldTemplateInterface;
}

export interface ivVolunteeringInfo {
  workInterestedIn: FieldTemplateInterface;
  maxHours: FieldTemplateInterface;
  timeSlot: FieldTemplateInterface;
  daysOfTheWeek: FieldTemplateInterface;
  employeeOrVolunteerAnimals: FieldTemplateInterface;
}

export interface ivRefereeInfo {
  refereeTitle: FieldTemplateInterface;
  refereeName: FieldTemplateInterface;
  refereeRelationship: FieldTemplateInterface;
  refereeAddress: FieldTemplateInterface;
  refereePostcode: FieldTemplateInterface;
  refereePhone: FieldTemplateInterface;
  refereeEmail: FieldTemplateInterface;
}

export interface ivOffenderInfo {
  offender: FieldTemplateInterface;
  offenderDetails: FieldTemplateInterface;
}
