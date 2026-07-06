export type DonationType = "one_off" | "monthly";

export type DonationStatus =
  | "pending"
  | "paid"
  | "active"
  | "failed"
  | "cancelled";

export interface DonationDonor {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  townCity: string;
  postcode: string;
}

export interface DonationGiftAidFormValues {
  wantsGiftAid: boolean;
  giftAidFuture: boolean;
  giftAidPast: boolean;
  declarationAccepted: boolean;
}

export interface SerializedDonationGiftAid extends DonationGiftAidFormValues {
  declarationText?: string;
  declarationTextVersion?: string;
  acceptedAt: string | null;
}

export interface SerializedDonationStripe {
  customerId: string;
  checkoutSessionId: string;
  paymentIntentId: string;
  subscriptionId: string;
  latestInvoiceId: string;
}

export interface DonationFormValues {
  donationType: DonationType;
  amount: number | "";
  donor: DonationDonor;
  giftAid: DonationGiftAidFormValues;
}

export interface SerializedDonation {
  id: string;
  donationType: DonationType;
  amount: number;
  currency: string;
  status: DonationStatus;
  donor: DonationDonor;
  giftAid: SerializedDonationGiftAid;
  stripe: SerializedDonationStripe;
  createdAt: string | null;
  updatedAt: string | null;
  statusUpdatedAt: string | null;
  paidAt: string | null;
}
