import { DonationFormValues } from "../../interfaces/donation";

export const donationInitialValues: DonationFormValues = {
  donationType: "monthly",
  amount: 10,
  donor: {
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    townCity: "",
    postcode: "",
  },
  giftAid: {
    wantsGiftAid: false,
    giftAidFuture: false,
    giftAidPast: false,
    declarationAccepted: false,
  },
};
