import Link from "next/link";
import { GetServerSideProps } from "next";
import AdminSidebarComponent from "../../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
  PageHeader,
} from "../../../../adminComponents/commonAdminComponents";
import { SerializedDonation } from "../../../../interfaces/donation";
import DonationModel from "../../../../models/donationModel";
import dbConnect from "../../../../utils/dbConnect";
import { serializeDonation } from "../../../../utils/donationRecords";
import { AdminUser, gateAdminPage } from "../../../../utils/auth";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const formatDate = (value: string | null) => {
  if (!value) {
    return "Not recorded";
  }

  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-base text-slate-900 font-poppins break-words">
        {value || "Not recorded"}
      </div>
    </div>
  );
};

function DonationDetailPage({
  donation,
  currentUser,
}: {
  donation: SerializedDonation;
  currentUser: AdminUser;
}) {
  return (
    <>
      <AdminHeadTag
        title={"Donation detail"}
        metaContent={"Admin donation detail, Bright Eyes"}
        linkHref={`/admin/donations/${donation.id}`}
      />
      <AdminSidebarComponent highlighted="Donations" currentUser={currentUser}>
        <PageContainerComponent>
          <PageHeader>
            Donation for {donation.donor.fullName || donation.donor.email}
          </PageHeader>

          <div className="mx-auto mt-6 flex w-11/12 max-w-6xl justify-end">
            <Link href="/admin/donations">
              <a className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50">
                Back to donations
              </a>
            </Link>
          </div>

          <div className="mx-auto mt-6 grid w-11/12 max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailItem
              label="Amount"
              value={currencyFormatter.format(donation.amount)}
            />
            <DetailItem
              label="Type"
              value={
                donation.donationType === "monthly" ? "Monthly" : "One-off"
              }
            />
            <DetailItem label="Status" value={donation.status} />
            <DetailItem
              label="Gift Aid"
              value={donation.giftAid.wantsGiftAid ? "Yes" : "No"}
            />
          </div>

          <div className="mx-auto mt-8 grid w-11/12 max-w-6xl gap-6 xl:grid-cols-2">
            <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 font-poppins">
                Donor details
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailItem label="Full name" value={donation.donor.fullName} />
                <DetailItem label="Email" value={donation.donor.email} />
                <DetailItem label="Phone" value={donation.donor.phone} />
                <DetailItem label="Postcode" value={donation.donor.postcode} />
                <DetailItem
                  label="Address line 1"
                  value={donation.donor.addressLine1}
                />
                <DetailItem
                  label="Address line 2"
                  value={donation.donor.addressLine2}
                />
                <DetailItem
                  label="Town or city"
                  value={donation.donor.townCity}
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 font-poppins">
                Donation timeline
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailItem
                  label="Created at"
                  value={formatDate(donation.createdAt)}
                />
                <DetailItem
                  label="Updated at"
                  value={formatDate(donation.updatedAt)}
                />
                <DetailItem
                  label="Status updated"
                  value={formatDate(donation.statusUpdatedAt)}
                />
                <DetailItem
                  label="Paid at"
                  value={formatDate(donation.paidAt)}
                />
              </div>
            </section>
          </div>

          <div className="mx-auto mt-6 grid w-11/12 max-w-6xl gap-6 xl:grid-cols-2">
            <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 font-poppins">
                Gift Aid declaration
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailItem
                  label="Declaration accepted"
                  value={donation.giftAid.declarationAccepted ? "Yes" : "No"}
                />
                <DetailItem
                  label="Apply to future donations"
                  value={donation.giftAid.giftAidFuture ? "Yes" : "No"}
                />
                <DetailItem
                  label="Apply to past donations"
                  value={donation.giftAid.giftAidPast ? "Yes" : "No"}
                />
                <DetailItem
                  label="Accepted at"
                  value={formatDate(donation.giftAid.acceptedAt)}
                />
                <DetailItem
                  label="Declaration version"
                  value={donation.giftAid.declarationTextVersion || ""}
                />
              </div>

              {donation.giftAid.declarationText ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 font-poppins">
                  {donation.giftAid.declarationText}
                </div>
              ) : null}
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 font-poppins">
                Stripe references
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailItem
                  label="Customer ID"
                  value={donation.stripe.customerId}
                />
                <DetailItem
                  label="Checkout session ID"
                  value={donation.stripe.checkoutSessionId}
                />
                <DetailItem
                  label="Payment intent ID"
                  value={donation.stripe.paymentIntentId}
                />
                <DetailItem
                  label="Subscription ID"
                  value={donation.stripe.subscriptionId}
                />
                <DetailItem
                  label="Latest invoice ID"
                  value={donation.stripe.latestInvoiceId}
                />
              </div>
            </section>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gate = await gateAdminPage(context.req, "donations");
  if (gate.redirect) {
    return gate.redirect;
  }

  await dbConnect();

  const donation = await DonationModel.findById(context.params?.id).lean();

  if (!donation) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      donation: serializeDonation(donation),
      currentUser: gate.user,
    },
  };
};

export default DonationDetailPage;
