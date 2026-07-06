import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    donationType: {
      type: String,
      enum: ["one_off", "monthly"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "gbp",
    },
    donor: {
      fullName: String,
      email: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      townCity: String,
      postcode: String,
    },
    giftAid: {
      wantsGiftAid: {
        type: Boolean,
        default: false,
      },
      giftAidFuture: {
        type: Boolean,
        default: false,
      },
      giftAidPast: {
        type: Boolean,
        default: false,
      },
      declarationAccepted: {
        type: Boolean,
        default: false,
      },
      declarationText: String,
      declarationTextVersion: String,
      acceptedAt: Date,
    },
    stripe: {
      customerId: String,
      checkoutSessionId: String,
      paymentIntentId: String,
      subscriptionId: String,
      latestInvoiceId: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "active", "failed", "cancelled"],
      default: "pending",
    },
    statusUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    paidAt: Date,
  },
  { timestamps: true }
);

donationSchema.index({ "stripe.checkoutSessionId": 1 }, { sparse: true });
donationSchema.index({ "stripe.paymentIntentId": 1 }, { sparse: true });
donationSchema.index({ "stripe.subscriptionId": 1 }, { sparse: true });
donationSchema.index({ "stripe.customerId": 1 }, { sparse: true });
donationSchema.index({ status: 1, updatedAt: -1 });
donationSchema.index({ donationType: 1, status: 1 });

const DonationModel =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export default DonationModel;
