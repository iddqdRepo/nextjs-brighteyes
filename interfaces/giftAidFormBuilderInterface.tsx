export interface GiftAidFormBuilderInterface {
  aboutQuestions: AboutQuestionsInterface;
  giftAidFuture: FieldTemplateInterface;
  giftAidPast: FieldTemplateInterface;
}
interface FieldTemplateInterface {
  title: string;
  type?: string;
}

export interface AboutQuestionsInterface {
  name: FieldTemplateInterface;
  address: FieldTemplateInterface;
  postcode: FieldTemplateInterface;
  phone: FieldTemplateInterface;
  mobile: FieldTemplateInterface;
}
