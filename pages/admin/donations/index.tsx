import Link from "next/link";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
  PageHeader,
  SearchInput,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import { SerializedDonation } from "../../../interfaces/donation";
import DonationModel from "../../../models/donationModel";
import dbConnect from "../../../utils/dbConnect";
import { serializeDonation } from "../../../utils/donationRecords";

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

const SummaryCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-900 font-poppins">
        {value}
      </div>
    </div>
  );
};

const escapeCsvCell = (value: string | number | boolean | null) => {
  const stringValue = value === null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
};

function DonationsIndex({ donations }: { donations: SerializedDonation[] }) {
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
      <AdminSidebarComponent highlighted="Donations">
        <PageContainerComponent>
          <PageHeader>Donations</PageHeader>

          <div className="mx-auto mt-10 grid w-11/12 max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard title="Total donations" value={summary.total} />
            <SummaryCard title="Active monthly" value={summary.activeMonthly} />
            <SummaryCard title="Gift Aid records" value={summary.giftAid} />
            <SummaryCard title="Needs attention" value={summary.attention} />
          </div>

          <div className="mx-auto mt-8 flex w-11/12 max-w-6xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <SearchInput
                id={"donationSearch"}
                change={setSearchText}
                val={searchText}
                placehold={"Search donor or postcode"}
              />
              <select
                className="h-14 rounded-lg border px-3"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="active">Active</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="h-14 rounded-lg border px-3"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="all">All types</option>
                <option value="monthly">Monthly</option>
                <option value="one_off">One-off</option>
              </select>
              <select
                className="h-14 rounded-lg border px-3"
                value={giftAidFilter}
                onChange={(event) => setGiftAidFilter(event.target.value)}
              >
                <option value="all">All Gift Aid</option>
                <option value="yes">Gift Aid yes</option>
                <option value="no">Gift Aid no</option>
              </select>
            </div>

            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Export filtered CSV
            </button>
          </div>

          <div className="mx-auto mt-8 w-11/12 max-w-6xl overflow-auto rounded-2xl bg-slate-100 shadow-sm">
            <TableComponent>
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
                    <tr key={donation.id} className="h-20">
                      <TableData>
                        <div className="text-center text-sm font-poppins text-slate-800">
                          <div className="font-semibold">
                            {donation.donor.fullName || "Unknown donor"}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {donation.donor.email}
                          </div>
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-poppins text-slate-800">
                          {currencyFormatter.format(donation.amount)}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-poppins text-slate-800">
                          {donation.donationType === "monthly"
                            ? "Monthly"
                            : "One-off"}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-poppins text-slate-800">
                          {donation.status}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-sm font-poppins text-slate-800">
                          {donation.giftAid.wantsGiftAid ? "Yes" : "No"}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="text-center text-xs font-poppins text-slate-800">
                          {formatDate(donation.updatedAt)}
                        </div>
                      </TableData>
                      <TableData>
                        <div className="flex justify-center">
                          <Link href={`/admin/donations/${donation.id}`}>
                            <a className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-500 hover:bg-slate-50">
                              View
                            </a>
                          </Link>
                        </div>
                      </TableData>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>

            {!filteredDonations.length ? (
              <div className="px-6 py-12 text-center text-sm text-slate-500 font-poppins">
                No donations match the current filters.
              </div>
            ) : null}
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const donations = await DonationModel.find().sort({ updatedAt: -1 }).lean();

  return {
    props: {
      donations: donations.map((donation) => serializeDonation(donation)),
    },
  };
};

export default DonationsIndex;
