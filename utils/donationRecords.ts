import { SerializedDonation } from "../interfaces/donation";

const toDateString = (value: Date | string | null | undefined) => {
  if (!value) {
    return null;
  }

  return new Date(value).toISOString();
};

export const serializeDonation = (donation: any): SerializedDonation => {
  return {
    id: donation._id.toString(),
    donationType: donation.donationType,
    amount: donation.amount,
    currency: donation.currency || "gbp",
    status: donation.status,
    donor: {
      fullName: donation.donor?.fullName || "",
      email: donation.donor?.email || "",
      phone: donation.donor?.phone || "",
      addressLine1: donation.donor?.addressLine1 || "",
      addressLine2: donation.donor?.addressLine2 || "",
      townCity: donation.donor?.townCity || "",
      postcode: donation.donor?.postcode || "",
    },
    giftAid: {
      wantsGiftAid: Boolean(donation.giftAid?.wantsGiftAid),
      giftAidFuture: Boolean(donation.giftAid?.giftAidFuture),
      giftAidPast: Boolean(donation.giftAid?.giftAidPast),
      declarationAccepted: Boolean(donation.giftAid?.declarationAccepted),
      declarationText: donation.giftAid?.declarationText || "",
      declarationTextVersion: donation.giftAid?.declarationTextVersion || "",
      acceptedAt: toDateString(donation.giftAid?.acceptedAt),
    },
    stripe: {
      customerId: donation.stripe?.customerId || "",
      checkoutSessionId: donation.stripe?.checkoutSessionId || "",
      paymentIntentId: donation.stripe?.paymentIntentId || "",
      subscriptionId: donation.stripe?.subscriptionId || "",
      latestInvoiceId: donation.stripe?.latestInvoiceId || "",
    },
    createdAt: toDateString(donation.createdAt),
    updatedAt: toDateString(donation.updatedAt),
    statusUpdatedAt: toDateString(donation.statusUpdatedAt),
    paidAt: toDateString(donation.paidAt),
  };
};
