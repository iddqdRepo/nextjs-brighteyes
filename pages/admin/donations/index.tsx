import Link from "next/link";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  AdminPageHeader,
  AdminSelect,
  AdminStatCard,
  MobileCard,
  MobileCardList,
  MobileCardRow,
  PageContainerComponent,
  SearchInput,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import { SerializedDonation } from "../../../interfaces/donation";
import DonationModel from "../../../models/donationModel";
import dbConnect from "../../../utils/dbConnect";
import { serializeDonation } from "../../../utils/donationRecords";
import { AdminUser, gateAdminPage } from "../../../utils/auth";
import { escapeCsvCell } from "../../../utils/csv";

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

const STATUS_STYLES: { [key: string]: string } = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

function DonationsIndex({
  donations,
  currentUser,
}: {
  donations: SerializedDonation[];
  currentUser: AdminUser;
}) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [giftAidFilter, setGiftAidFilter] = useState("all");

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const searchValue = searchText.trim().toLowerCase();
      const matchesSearch = !searchValue
        ? true
        : donation.donor.fullName.toLowerCase().includes(searchValue) ||
          donation.donor.email.toLowerCase().includes(searchValue) ||
          donation.donor.postcode.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ? true : donation.status === statusFilter;
      const matchesType =
        typeFilter === "all" ? true : donation.donationType === typeFilter;
      const matchesGiftAid =
        giftAidFilter === "all"
          ? true
          : giftAidFilter === "yes"
          ? donation.giftAid.wantsGiftAid
          : !donation.giftAid.wantsGiftAid;

      return matchesSearch && matchesStatus && matchesType && matchesGiftAid;
    });
  }, [donations, giftAidFilter, searchText, statusFilter, typeFilter]);

  const summary = useMemo(() => {
    return {
      total: donations.length,
      activeMonthly: donations.filter(
        (donation) =>
          donation.donationType === "monthly" && donation.status === "active"
      ).length,
      giftAid: donations.filter((donation) => donation.giftAid.wantsGiftAid)
        .length,
      attention: donations.filter((donation) =>
        ["pending", "failed", "cancelled"].includes(donation.status)
      ).length,
    };
  }, [donations]);

  const exportCsv = () => {
    const csvRows = [
      [
        "Donor name",
        "Email",
        "Phone",
        "Amount",
        "Type",
        "Status",
        "Gift Aid",
        "Gift Aid future",
        "Gift Aid past",
        "Address line 1",
        "Address line 2",
        "Town/City",
        "Postcode",
        "Created at",
        "Paid at",
        "Stripe customer ID",
        "Stripe subscription ID",
      ],
      ...filteredDonations.map((donation) => [
        donation.donor.fullName,
        donation.donor.email,
        donation.donor.phone,
        donation.amount,
        donation.donationType,
        donation.status,
        donation.giftAid.wantsGiftAid,
        donation.giftAid.giftAidFuture,
        donation.giftAid.giftAidPast,
        donation.donor.addressLine1,
        donation.donor.addressLine2,
        donation.donor.townCity,
        donation.donor.postcode,
        donation.createdAt,
        donation.paidAt,
        donation.stripe.customerId,
        donation.stripe.subscriptionId,
      ]),
    ]
      .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
      .join("\n");

    const blob = new Blob([csvRows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "bright-eyes-donations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <AdminHeadTag
        title={"Donations"}
        metaContent={"Admin donations, Bright Eyes"}
        linkHref={"/admin/donations"}
      />
      <AdminSidebarComponent highlighted="Donations" currentUser={currentUser}>
        <PageContainerComponent>
          <AdminPageHeader
            title="Donations"
            subtitle="Manage and track all incoming donations and Gift Aid records."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              icon="carbon:currency-pound"
              label="Total Donations"
              value={summary.total}
            />
            <AdminStatCard
              icon="carbon:calendar"
              label="Active Monthly"
              value={summary.activeMonthly}
            />
            <AdminStatCard
              icon="akar-icons:gift"
              label="Gift Aid Records"
              value={summary.giftAid}
            />
            <AdminStatCard
              icon="akar-icons:circle-alert"
              label="Needs Attention"
              value={summary.attention}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <SearchInput
                id={"donationSearch"}
                change={setSearchText}
                val={searchText}
                placehold={"Search donor or postcode..."}
              />
              <AdminSelect
                value={statusFilter}
                onChange={setStatusFilter}
                ariaLabel="Filter by status"
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="active">Active</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </AdminSelect>
              <AdminSelect
                value={typeFilter}
                onChange={setTypeFilter}
                ariaLabel="Filter by type"
              >
                <option value="all">All types</option>
                <option value="monthly">Monthly</option>
                <option value="one_off">One-off</option>
              </AdminSelect>
              <AdminSelect
                value={giftAidFilter}
                onChange={setGiftAidFilter}
                ariaLabel="Filter by Gift Aid"
              >
                <option value="all">All Gift Aid</option>
                <option value="yes">Gift Aid yes</option>
                <option value="no">Gift Aid no</option>
              </AdminSelect>
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins"
            >
              <Icon icon="carbon:download" width="16" height="16" />
              Export CSV
            </button>
          </div>

          {/* Desktop: table. Mobile: stacked cards below. */}
          <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
            <TableComponent className="min-w-[44rem]">
              <TableHeadMap
                ArrayOfHeaderTitles={[
                  "Donor",
                  "Amount",
                  "Type",
                  "Status",
                  "Gift Aid",
                  "Updated",
                  "View",
                ]}
              />
              <tbody className="bg-white">
                {filteredDonations.map((donation) => {
                  return (
                    <tr
                      key={donation.id}
                      className="transition hover:bg-brand-50/40"
                    >
                      <TableData>
                        <div className="text-sm font-poppins">
                          <div className="font-semibold text-gray-900">
                            {donation.donor.fullName || "Unknown donor"}
                          </div>
                          <div className="mt-0.5 text-xs text-gray-500">
                            {donation.donor.email}
                          </div>
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-semibold text-gray-900 font-poppins">
                          {currencyFormatter.format(donation.amount)}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-poppins">
                          {donation.donationType === "monthly"
                            ? "Monthly"
                            : "One-off"}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="flex justify-center">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize font-poppins ${
                              STATUS_STYLES[donation.status] ??
                              "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {donation.status}
                          </span>
                        </div>
                      </TableData>
                      <TableData>
                        <div className="flex items-center justify-center gap-1.5 text-sm font-poppins">
                          <Icon
                            icon={
                              donation.giftAid.wantsGiftAid
                                ? "charm:circle-tick"
                                : "bi:x-circle"
                            }
                            color={
                              donation.giftAid.wantsGiftAid
                                ? "#15803d"
                                : "#9ca3af"
                            }
                            width="15"
                          />
                          {donation.giftAid.wantsGiftAid ? "Yes" : "No"}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="whitespace-nowrap text-center text-xs font-poppins">
                          {formatDate(donation.updatedAt)}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="flex justify-center">
                          <Link
                            href={`/admin/donations/${donation.id}`}
                            className="rounded-full border-2 border-brand px-4 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-white font-poppins"
                          >
                            View
                          </Link>
                        </div>
                      </TableData>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>

            {!filteredDonations.length ? (
              <div className="px-6 py-12 text-center text-sm text-gray-500 font-poppins">
                No donations match the current filters.
              </div>
            ) : null}
          </div>

          <MobileCardList className="mt-4">
            {filteredDonations.map((donation) => (
              <MobileCard key={donation.id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-gray-900 font-poppins">
                      {donation.donor.fullName || "Unknown donor"}
                    </div>
                    <div className="truncate text-xs text-gray-500 font-poppins">
                      {donation.donor.email}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize font-poppins ${
                      STATUS_STYLES[donation.status] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
                <div className="mt-3">
                  <MobileCardRow label="Amount">
                    <span className="font-semibold">
                      {currencyFormatter.format(donation.amount)}
                    </span>
                  </MobileCardRow>
                  <MobileCardRow label="Type">
                    {donation.donationType === "monthly"
                      ? "Monthly"
                      : "One-off"}
                  </MobileCardRow>
                  <MobileCardRow label="Gift Aid">
                    {donation.giftAid.wantsGiftAid ? "Yes" : "No"}
                  </MobileCardRow>
                  <MobileCardRow label="Updated">
                    {formatDate(donation.updatedAt)}
                  </MobileCardRow>
                </div>
                <Link
                  href={`/admin/donations/${donation.id}`}
                  className="mt-3 flex w-full items-center justify-center rounded-full border-2 border-brand px-4 py-2.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white font-poppins"
                >
                  View Donation
                </Link>
              </MobileCard>
            ))}
            {!filteredDonations.length && (
              <MobileCard className="py-8 text-center text-sm text-gray-500 font-poppins">
                No donations match the current filters.
              </MobileCard>
            )}
          </MobileCardList>
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

  const donations = await DonationModel.find().sort({ updatedAt: -1 }).lean();

  return {
    props: {
      donations: donations.map((donation) => serializeDonation(donation)),
      currentUser: gate.user,
    },
  };
};

export default DonationsIndex;
