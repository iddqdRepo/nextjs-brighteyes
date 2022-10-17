export interface GiftAidInitialValuesInterface {
  aboutQuestions: ivAboutQuestionsInterface;
  giftAidFuture: FieldTemplateInterface;
  giftAidPast: FieldTemplateInterface;
}
interface FieldTemplateInterface {
  title: string;
  type?: string;
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
