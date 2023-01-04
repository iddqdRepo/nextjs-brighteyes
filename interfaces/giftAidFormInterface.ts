export interface GiftAidFormInterface {
  aboutQuestions: GiftAidAboutQuestionsInterface;
  giftAidFuture: FieldTemplateInterface;
  giftAidPast: FieldTemplateInterface;
}
interface FieldTemplateInterface {
  title: string;
  type?: string;
}

export interface GiftAidAboutQuestionsInterface {
  title?: FieldTemplateInterface;
  name: FieldTemplateInterface;
  address: FieldTemplateInterface;
  postcode: FieldTemplateInterface;
  phone: FieldTemplateInterface;
  mobile: FieldTemplateInterface;
  email?: FieldTemplateInterface;
}
