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
  //Gift Aid starts pre-selected (it costs the donor nothing and most forget
  //to add it), but the declaration itself is still an unticked checkbox the
  //donor must actively confirm. giftAidFuture matches the monthly default.
  giftAid: {
    wantsGiftAid: true,
    giftAidFuture: true,
    giftAidPast: false,
    declarationAccepted: false,
  },
};
