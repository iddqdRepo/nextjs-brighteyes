import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import DonationModel from "../../models/donationModel";
import {
  appendSetCookie,
  clearDonationCookie,
  createDonationAccessCookie,
  DONATION_ACCESS_COOKIE,
  DONATION_CHECKOUT_COOKIE,
  getCookieValue,
  verifyDonationToken,
} from "../../utils/donationAuth";
import dbConnect from "../../utils/dbConnect";
import {
  getCheckoutSessionDonationStatus,
  getStripeId,
} from "../../utils/donationStatus";
import { getStripe } from "../../utils/stripe";

type ThankYouProps = {
  donation: {
    id: string;
    amount: number;
    donationType: string;
    status: string;
    donorName: string;
    wantsGiftAid: boolean;
    canManageDonation: boolean;
  } | null;
};

const statusCopy: Record<string, string> = {
  pending:
    "Your donation has been created and is waiting for Stripe to confirm the payment.",
  paid: "Your card donation has been paid successfully.",
  active: "Your monthly donation is active.",
  failed:
    "Stripe has recorded a problem with the payment. Please try again or contact the sanctuary.",
  cancelled: "This donation has been cancelled.",
};

const compactObject = (object: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
};

function ThankYouPage({
  donation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [portalError, setPortalError] = useState("");
  const [openingPortal, setOpeningPortal] = useState(false);

  if (!donation) {
    return (
      <>
        <HeadTag
          title={"Donation status - Bright Eyes Animal Sanctuary"}
          metaContent={"Donation status"}
          linkHref={"/donate/thank-you"}
        />
        <NavbarComponent />
        <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-16">
          <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <h1 className="text-3xl font-semibold text-slate-900 font-poppins">
              Donation not found
            </h1>
            <p className="mt-4 text-slate-600 font-poppins">
              We could not find a donation for that link.
            </p>
          </div>
        </main>
        <FooterSection />
      </>
    );
  }

  const handleManageDonation = async () => {
    setPortalError("");
    setOpeningPortal(true);

    try {
      const response = await fetch("/api/donations/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donationId: donation.id }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to open the billing portal");
      }

      window.location.assign(payload.url);
    } catch (error) {
      setPortalError(
        error instanceof Error
          ? error.message
          : "Unable to open the billing portal"
      );
      setOpeningPortal(false);
    }
  };

  return (
    <>
      <HeadTag
        title={"Thank You For Your Donation - Bright Eyes Animal Sanctuary"}
        metaContent={"Donation confirmation"}
        linkHref={"/donate/thank-you"}
      />
      <NavbarComponent />
      <main className="bg-[linear-gradient(180deg,_#fff1f8,_#ffffff_45%)] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b3479]">
            Thank you
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 font-poppins">
            Thank you, {donation.donorName}.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 font-poppins">
            {statusCopy[donation.status] || statusCopy.pending}
          </p>

          <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-slate-50 p-6 md:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Amount
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900 font-poppins">
                &pound;{donation.amount}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Type
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900 font-poppins">
                {donation.donationType === "monthly" ? "Monthly" : "One-off"}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Gift Aid
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900 font-poppins">
                {donation.wantsGiftAid ? "Yes" : "No"}
              </div>
            </div>
          </div>

          {donation.donationType === "monthly" && donation.canManageDonation ? (
            <div className="mt-8 rounded-[1.5rem] border border-[#8b3479]/20 bg-[#fdf3fa] p-6">
              <h2 className="text-xl font-semibold text-slate-900 font-poppins">
                Manage your monthly donation
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 font-poppins">
                Use Stripe&apos;s billing portal to update your card details or
                manage your subscription.
              </p>
              <button
                type="button"
                onClick={handleManageDonation}
                disabled={openingPortal}
                className="mt-5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {openingPortal ? "Opening portal..." : "Manage donation"}
              </button>
              {portalError ? (
                <div className="mt-4 text-sm text-red-700">{portalError}</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
      <FooterSection />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ThankYouProps> = async (
  context
) => {
  const donationId = context.query.donationId;
  const sessionId = context.query.session_id;
  let resolvedDonationId =
    typeof donationId === "string" ? donationId : undefined;
  let canManageDonation = false;
  //Whether this request proved a right to see the donation's details: either
  //it arrived from Stripe with a valid checkout session, or it carries the
  //donor's access cookie. A bare ?donationId= URL proves nothing — those ids
  //sit in browser histories and shared links, and must not leak donor PII.
  let verifiedBySession = false;

  await dbConnect();

  if (typeof sessionId === "string") {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const sessionDonationId = session.metadata?.donationId;
      const checkoutNonce = session.metadata?.checkoutNonce;
      const checkoutToken = verifyDonationToken(
        getCookieValue(context.req, DONATION_CHECKOUT_COOKIE),
        "checkout"
      );

      if (sessionDonationId) {
        resolvedDonationId = sessionDonationId;
        verifiedBySession = true;
      }

      if (sessionDonationId) {
        const sessionStatus = getCheckoutSessionDonationStatus(session);

        //Only ever promote a donation still waiting on payment. Revisiting a
        //bookmarked success URL must not overwrite a newer webhook-set
        //status (e.g. flip a cancelled subscription back to active).
        await DonationModel.findOneAndUpdate(
          { _id: sessionDonationId, status: "pending" },
          {
            $set: compactObject({
              status: sessionStatus,
              statusUpdatedAt: new Date(),
              paidAt:
                sessionStatus === "paid" || sessionStatus === "active"
                  ? new Date()
                  : undefined,
              "stripe.checkoutSessionId": session.id,
              "stripe.customerId": getStripeId(session.customer),
              "stripe.paymentIntentId": getStripeId(session.payment_intent),
              "stripe.subscriptionId": getStripeId(session.subscription),
            }),
          }
        );
      }

      if (
        sessionDonationId &&
        checkoutNonce &&
        checkoutToken?.donationId === sessionDonationId &&
        checkoutToken?.checkoutNonce === checkoutNonce
      ) {
        const customerId = getStripeId(session.customer);

        if (customerId) {
          appendSetCookie(
            context.res,
            createDonationAccessCookie(sessionDonationId, customerId)
          );
          canManageDonation = true;
        }

        appendSetCookie(
          context.res,
          clearDonationCookie(DONATION_CHECKOUT_COOKIE)
        );
      }
    } catch (error) {
      resolvedDonationId = undefined;
    }
  }

  if (!resolvedDonationId) {
    return {
      props: {
        donation: null,
      },
    };
  }

  let donation;
  try {
    donation = await DonationModel.findById(resolvedDonationId).lean();
  } catch {
    //A malformed donationId fails the ObjectId cast; show "not found"
    //rather than a 500.
    donation = null;
  }

  if (!donation) {
    return {
      props: {
        donation: null,
      },
    };
  }

  let hasAccessCookie = false;
  if (!canManageDonation) {
    const accessToken = verifyDonationToken(
      getCookieValue(context.req, DONATION_ACCESS_COOKIE),
      "access"
    );

    hasAccessCookie =
      Boolean(donation.stripe?.customerId) &&
      accessToken?.donationId === resolvedDonationId &&
      accessToken?.customerId === donation.stripe?.customerId;

    canManageDonation = donation.donationType === "monthly" && hasAccessCookie;
  }

  //Bare ?donationId= links (history, shared URLs) get the generic page, not
  //the donor's name and giving details.
  if (!verifiedBySession && !canManageDonation && !hasAccessCookie) {
    return {
      props: {
        donation: null,
      },
    };
  }

  return {
    props: {
      donation: {
        id: donation._id.toString(),
        amount: donation.amount,
        donationType: donation.donationType,
        status: donation.status,
        donorName: donation.donor?.fullName || "supporter",
        wantsGiftAid: Boolean(donation.giftAid?.wantsGiftAid),
        canManageDonation,
      },
    },
  };
};

export default ThankYouPage;
