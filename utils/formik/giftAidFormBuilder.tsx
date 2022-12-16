// import { GiftAidFormBuilderInterface } from "../../interfaces/giftAidFormBuilderInterface";
import { GiftAidFormInterface } from "../../interfaces/giftAidFormInterface";

/* 
^ AN OBJECT THAT IS USED TO BUILD THE FORMS. 
^ E.G. IT IS MAPPED OVER AND THE TITLES ARE ADDED TO LABELS  
^ AND THE VALUES ARE ADDED TO THE DROPDOWNS
*/

/*
 * title: name shown on label on form page
 */

export const giftAidFormBuilder: GiftAidFormInterface = {
  aboutQuestions: {
    name: { title: "Name" },
    address: { title: "Address" },
    postcode: { title: "Postcode" },
    phone: { title: "Phone" },
    mobile: { title: "Mobile" },
  },
  giftAidFuture: {
    title: "I would like to Gift Aid future donations until further notice.",
  },
  giftAidPast: {
    title:
      "I would like to Gift Aid previous donations for the current year, and all the previous four tax years.",
  },
};
