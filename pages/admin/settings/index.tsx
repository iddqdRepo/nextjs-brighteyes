import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Icon } from "@iconify/react";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminCard,
  AdminHeadTag,
  AdminPageHeader,
  PageContainerComponent,
} from "../../../adminComponents/commonAdminComponents";
import RegisterPasskey from "../../../adminComponents/RegisterPasskey";
import { updateMyPassword } from "../../../routes/userRoutes";
import { AdminUser } from "../../../utils/adminAccess";
import { gateAdminPage } from "../../../utils/auth";

const PERMISSION_LABELS: { [key: string]: string } = {
  animals: "Animals",
  forms: "Forms",
  donations: "Donations",
};

const accessSummary = (user: AdminUser) => {
  if (user.isSuperuser) {
    return "Superuser — full access, including managing the team.";
  }
  const areas = Object.keys(PERMISSION_LABELS).filter(
    (key) => user.permissions[key as keyof typeof user.permissions]
  );
  return areas.length
    ? `Team member — can manage: ${areas
        .map((key) => PERMISSION_LABELS[key])
        .join(", ")}.`
    : "Team member — a superuser can give you access to more areas.";
};

const passwordInputClass =
  "border border-gray-300 bg-white text-gray-900 text-sm font-poppins rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none block w-full h-11 p-2.5";

const ChangePasswordCard = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("Your new password needs at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("The two passwords don't match — try typing them again.");
      return;
    }
    setStatus("working");
    setMessage("");
    try {
      const successful = await updateMyPassword(newPassword);
      if (!successful) {
        throw new Error("update failed");
      }
      setStatus("done");
      setMessage("Done! Use your new password next time you log in.");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setStatus("error");
      setMessage("Could not change your password. Please try again.");
    }
  };

  return (
    <AdminCard title="Change your password">
      <p className="mb-4 text-sm text-gray-600 font-poppins">
        Pick something at least 8 characters long that you haven&apos;t used
        anywhere else.
      </p>
      <div className="grid max-w-xl gap-x-4 sm:grid-cols-2">
        <label className="mb-4 block font-poppins">
          <span className="mb-1.5 block text-sm font-medium text-gray-800">
            New password
          </span>
          <input
            id="newPassword"
            type={showPasswords ? "text" : "password"}
            className={passwordInputClass}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label className="mb-4 block font-poppins">
          <span className="mb-1.5 block text-sm font-medium text-gray-800">
            Type it again
          </span>
          <input
            id="confirmPassword"
            type={showPasswords ? "text" : "password"}
            className={passwordInputClass}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-600 font-poppins">
        <input
          type="checkbox"
          className="h-4 w-4 accent-brand"
          checked={showPasswords}
          onChange={(e) => setShowPasswords(e.target.checked)}
        />
        Show passwords
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          id="changeMyPassword"
          onClick={handleSubmit}
          disabled={status === "working"}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark font-poppins disabled:opacity-50"
        >
          {status === "working" ? "Saving…" : "Change password"}
        </button>
        {message && (
          <span
            className={`flex items-center gap-1.5 text-sm font-medium font-poppins ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {status === "done" && (
              <Icon icon="akar-icons:circle-check-fill" width="16" />
            )}
            {message}
          </span>
        )}
      </div>
    </AdminCard>
  );
};

function Index({ currentUser }: { currentUser: AdminUser }) {
  return (
    <>
      <AdminHeadTag
        title={"Settings"}
        metaContent={"Admin Settings, Bright Eyes"}
        linkHref={"/admin/settings"}
      />
      <AdminSidebarComponent highlighted={"Settings"} currentUser={currentUser}>
        <PageContainerComponent>
          <AdminPageHeader
            title="Settings"
            subtitle="Manage how you sign in to the admin area."
          />

          <div className="mt-6 flex flex-col gap-4">
            <AdminCard title="Your account">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Icon
                    icon="carbon:user-avatar"
                    color="#8b3479"
                    width="28"
                    height="28"
                  />
                </div>
                <div className="font-poppins">
                  <div className="text-base font-semibold text-gray-900">
                    {currentUser.username}
                  </div>
                  <div className="mt-0.5 text-sm text-gray-600">
                    {accessSummary(currentUser)}
                  </div>
                </div>
              </div>
            </AdminCard>

            <RegisterPasskey />

            <ChangePasswordCard />
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Every signed-in admin gets a settings page; nothing here needs a
  //particular permission.
  const gate = await gateAdminPage(context.req);
  if (gate.redirect) {
    return gate.redirect;
  }
  return { props: { currentUser: gate.user } };
};
