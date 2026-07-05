import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Icon } from "@iconify/react";
import AdminSidebarComponent from "../../adminComponents/AdminSidebarComponent";
import {
  AdminCard,
  AdminHeadTag,
  AdminStatCard,
  PageContainerComponent,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../adminComponents/commonAdminComponents";
import {
  getPetForms,
  getGiftAidForms,
  getVolunteerForms,
  getContactUsForms,
} from "../../routes/formRoutes";
import { getPets } from "../../routes/petRoutes";
import { useFormsAndPets } from "../../hooks/useFormAndPets";
import { LoadingSpinner } from "../../adminComponents/DashboardHome/DashboardHomeLayoutComponents";
import RegisterPasskey from "../../adminComponents/RegisterPasskey";
import DonationModel from "../../models/donationModel";
import dbConnect from "../../utils/dbConnect";
import { AdminUser, gateAdminPage } from "../../utils/auth";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

interface DonationSummary {
  totalAmount: number;
  monthAmount: number;
  totalCount: number;
  giftAidCount: number;
}

const FORM_TYPE_LABELS: { [key: string]: string } = {
  Dog: "Dog Adoption",
  Cat: "Cat Adoption",
  giftAid: "Gift Aid",
  volunteer: "Volunteer",
  contactUs: "Message",
};

interface RecentForm {
  _id?: string;
  type: string;
  archive: string;
  updatedAt?: string;
  aboutQuestions: { name: string };
}

function Index({
  donationSummary,
  currentUser,
}: {
  donationSummary: DonationSummary | null;
  currentUser: AdminUser;
}) {
  //Sections the signed-in admin can't access are hidden entirely, and their
  //data is never requested (the API would refuse it anyway).
  const canSeeForms = currentUser.permissions.forms;
  const canSeeDonations = currentUser.permissions.donations;

  const petsData = ["pets", getPets];
  const { isLoading: isPetLoading, data: pets } = useFormsAndPets(petsData);

  const petFormType = ["petForms", getPetForms];
  const { isLoading: isAdoptionFormsLoading, data: adoptionForms } =
    useFormsAndPets(petFormType, canSeeForms);

  const giftAidFormType = ["giftAidForms", getGiftAidForms];
  const { isLoading: isGiftAidFormsLoading, data: giftAidForms } =
    useFormsAndPets(giftAidFormType, canSeeForms);

  const volunteerFormType = ["volunteerForms", getVolunteerForms];
  const { isLoading: isVolunteerFormsLoading, data: volunteerForms } =
    useFormsAndPets(volunteerFormType, canSeeForms);

  const contactFormType = ["contactForms", getContactUsForms];
  const { isLoading: isContactUsFormsLoading, data: contactUsForms } =
    useFormsAndPets(contactFormType, canSeeForms);

  const countPets = (type: string, adopted: string) =>
    pets?.data
      ? pets.data.filter(
          (pet: { type: string; adopted: string }) =>
            pet.type === type && pet.adopted === adopted
        ).length
      : 0;

  const countPending = (forms: any) =>
    forms?.data
      ? forms.data.filter((form: { archive: string }) => form.archive === "No")
          .length
      : 0;

  const recentForms: RecentForm[] = [
    ...(adoptionForms?.data ?? []),
    ...(giftAidForms?.data ?? []),
    ...(volunteerForms?.data ?? []),
    ...(contactUsForms?.data ?? []),
  ]
    .filter((form: RecentForm) => form.archive === "No")
    .sort(
      (a: RecentForm, b: RecentForm) =>
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    )
    .slice(0, 6);

  const anyFormsLoading =
    isAdoptionFormsLoading ||
    isGiftAidFormsLoading ||
    isVolunteerFormsLoading ||
    isContactUsFormsLoading;

  return (
    <>
      <AdminHeadTag
        title={"Dashboard"}
        metaContent={"Admin dashboard, Bright Eyes"}
        linkHref={"/admin"}
      />

      <AdminSidebarComponent highlighted="Dashboard" currentUser={currentUser}>
        <PageContainerComponent>
          <div className="pt-6">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900 sm:text-3xl font-poppins">
              Welcome back
              <Icon
                icon="foundation:paw"
                color="#8b3479"
                width="20"
                height="20"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 font-poppins">
              Here&apos;s what&apos;s happening at Bright Eyes today.
            </p>
          </div>

          {canSeeForms && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <AdminStatCard
                icon="carbon:chat"
                label="Unread Messages"
                subtitle="Needs your attention"
                value={
                  !isContactUsFormsLoading ? (
                    countPending(contactUsForms)
                  ) : (
                    <LoadingSpinner />
                  )
                }
                link="/admin/forms?archive=false"
                linkText="View messages"
              />
              <AdminStatCard
                icon="carbon:document"
                label="Adoption Forms"
                subtitle="Pending review"
                value={
                  !isAdoptionFormsLoading ? (
                    countPending(adoptionForms)
                  ) : (
                    <LoadingSpinner />
                  )
                }
                link="/admin/forms?archive=false"
                linkText="View adoption forms"
              />
              <AdminStatCard
                icon="akar-icons:gift"
                label="Gift Aid Forms"
                subtitle="Pending review"
                value={
                  !isGiftAidFormsLoading ? (
                    countPending(giftAidForms)
                  ) : (
                    <LoadingSpinner />
                  )
                }
                link="/admin/forms?archive=false"
                linkText="View gift aid forms"
              />
              <AdminStatCard
                icon="carbon:person-favorite"
                label="Volunteer Forms"
                subtitle="Pending review"
                value={
                  !isVolunteerFormsLoading ? (
                    countPending(volunteerForms)
                  ) : (
                    <LoadingSpinner />
                  )
                }
                link="/admin/forms?archive=false"
                linkText="View volunteer forms"
              />
            </div>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              tint="cream"
              icon="cil:dog"
              label="Active Dogs"
              subtitle="Currently in care"
              value={
                !isPetLoading ? countPets("Dog", "No") : <LoadingSpinner />
              }
              link="/admin/animals?archive=false"
              linkText="View all dogs"
            />
            <AdminStatCard
              tint="blush"
              icon="mdi:paw"
              label="Adopted Dogs"
              subtitle="Found their homes"
              value={
                !isPetLoading ? countPets("Dog", "Yes") : <LoadingSpinner />
              }
              link="/admin/animals?archive=true"
              linkText="View adopted dogs"
            />
            <AdminStatCard
              tint="cream"
              icon="cil:cat"
              label="Active Cats"
              subtitle="Currently in care"
              value={
                !isPetLoading ? countPets("Cat", "No") : <LoadingSpinner />
              }
              link="/admin/animals?archive=false"
              linkText="View all cats"
            />
            <AdminStatCard
              tint="blush"
              icon="mdi:paw"
              label="Adopted Cats"
              subtitle="Found their homes"
              value={
                !isPetLoading ? countPets("Cat", "Yes") : <LoadingSpinner />
              }
              link="/admin/animals?archive=true"
              linkText="View adopted cats"
            />
          </div>

          {/* prominent so every admin sets it up, instead of tucked in a
              corner they never scroll to */}
          <div className="mt-4">
            <RegisterPasskey />
          </div>

          <div
            className={
              canSeeDonations && canSeeForms
                ? "mt-4 grid items-start gap-4 xl:grid-cols-[0.9fr,1.6fr]"
                : "mt-4 grid items-start gap-4"
            }
          >
            {canSeeDonations && donationSummary && (
              <AdminCard
                title="Donations Overview"
                action={
                  <Link href="/admin/donations">
                    <a className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark font-poppins">
                      View all
                      <Icon icon="fa:long-arrow-right" width="11" />
                    </a>
                  </Link>
                }
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-semibold text-gray-900 font-poppins">
                      {currencyFormatter.format(donationSummary.totalAmount)}
                    </div>
                    <div className="text-xs text-gray-500 font-poppins">
                      Total paid &amp; active
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900 font-poppins">
                      {currencyFormatter.format(donationSummary.monthAmount)}
                    </div>
                    <div className="text-xs text-gray-500 font-poppins">
                      This month
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900 font-poppins">
                      {donationSummary.totalCount}
                    </div>
                    <div className="text-xs text-gray-500 font-poppins">
                      Donations recorded
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900 font-poppins">
                      {donationSummary.giftAidCount}
                    </div>
                    <div className="text-xs text-gray-500 font-poppins">
                      With Gift Aid
                    </div>
                  </div>
                </div>
              </AdminCard>
            )}

            {canSeeForms && (
              <AdminCard
                title="Recent Form Submissions"
                action={
                  <Link href="/admin/forms?archive=false">
                    <a className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark font-poppins">
                      Go to Forms
                      <Icon icon="fa:long-arrow-right" width="11" />
                    </a>
                  </Link>
                }
              >
                {anyFormsLoading ? (
                  <div className="flex justify-center py-6">
                    <LoadingSpinner />
                  </div>
                ) : recentForms.length ? (
                  <>
                    {/* Desktop: table. Mobile: compact list below. */}
                    <div className="hidden overflow-x-auto md:block">
                      <TableComponent>
                        <TableHeadMap
                          ArrayOfHeaderTitles={[
                            "Name",
                            "Type",
                            "Submitted",
                            "View",
                          ]}
                        />
                        <tbody className="bg-white">
                          {recentForms.map((form) => (
                            <tr key={form._id}>
                              <TableData>
                                <div className="text-center text-sm font-medium text-gray-800 font-poppins">
                                  {form.aboutQuestions?.name}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="text-center text-sm font-poppins">
                                  {FORM_TYPE_LABELS[form.type] ?? form.type}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="text-center text-sm font-poppins">
                                  {form.updatedAt &&
                                    form.updatedAt.slice(0, 10)}
                                </div>
                              </TableData>
                              <TableData>
                                <Link href={`/admin/forms/${form._id}`}>
                                  <a className="flex justify-center">
                                    <Icon
                                      className="h-5 w-auto cursor-pointer text-gray-500 hover:text-brand"
                                      icon="carbon:view-filled"
                                    />
                                  </a>
                                </Link>
                              </TableData>
                            </tr>
                          ))}
                        </tbody>
                      </TableComponent>
                    </div>

                    <div className="divide-y divide-gray-100 md:hidden">
                      {recentForms.map((form) => (
                        <Link key={form._id} href={`/admin/forms/${form._id}`}>
                          <a className="flex items-center gap-3 py-3">
                            <div className="min-w-0 grow font-poppins">
                              <div className="truncate text-sm font-semibold text-gray-900">
                                {form.aboutQuestions?.name}
                              </div>
                              <div className="mt-0.5 text-xs text-gray-500">
                                {FORM_TYPE_LABELS[form.type] ?? form.type}{" "}
                                &middot;{" "}
                                {form.updatedAt && form.updatedAt.slice(0, 10)}
                              </div>
                            </div>
                            <Icon
                              className="shrink-0 text-gray-400"
                              icon="akar-icons:chevron-right"
                              width="16"
                            />
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center text-sm text-gray-500 font-poppins">
                    No active form submissions right now.
                  </div>
                )}
              </AdminCard>
            )}
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gate = await gateAdminPage(context.req);
  if (gate.redirect) {
    return gate.redirect;
  }

  //Donation figures are only fetched (and rendered) for admins with the
  //donations permission.
  if (!gate.user.permissions.donations) {
    return {
      props: { donationSummary: null, currentUser: gate.user },
    };
  }

  await dbConnect();

  const donations = await DonationModel.find(
    {},
    { amount: 1, status: 1, createdAt: 1, "giftAid.wantsGiftAid": 1 }
  ).lean();

  const paidStatuses = ["paid", "active"];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const summary: DonationSummary = {
    totalAmount: 0,
    monthAmount: 0,
    totalCount: donations.length,
    giftAidCount: 0,
  };

  donations.forEach((donation: any) => {
    const amount = Number(donation.amount) || 0;
    if (paidStatuses.includes(donation.status)) {
      summary.totalAmount += amount;
      if (donation.createdAt && new Date(donation.createdAt) >= monthStart) {
        summary.monthAmount += amount;
      }
    }
    if (donation.giftAid?.wantsGiftAid) {
      summary.giftAidCount += 1;
    }
  });

  return {
    props: {
      donationSummary: summary,
      currentUser: gate.user,
    },
  };
};
