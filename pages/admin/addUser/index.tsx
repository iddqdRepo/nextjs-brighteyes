import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AdminSidebarComponent from "../../../adminComponents/AdminSidebarComponent";
import {
  AdminCard,
  AdminConfirmationPopup,
  AdminHeadTag,
  AdminPageHeader,
  MobileActionButton,
  MobileCard,
  MobileCardList,
  PageContainerComponent,
  TableComponent,
  TableData,
  TableHeadMap,
} from "../../../adminComponents/commonAdminComponents";
import {
  AccessSelection,
  deleteUser,
  getUsers,
  postUser,
  resetUserPassword,
  updateUserAccess,
} from "../../../routes/userRoutes";
import { AdminUser, toAdminUser } from "../../../utils/adminAccess";
import { gateAdminPage } from "../../../utils/auth";

type TeamMember = {
  _id: string;
  username: string;
  role?: "superuser" | "staff";
  permissions?: { animals?: boolean; forms?: boolean; donations?: boolean };
  createdAt?: string;
  authenticators?: unknown[];
};

const DEFAULT_ACCESS: AccessSelection = {
  superuser: false,
  animals: true,
  forms: true,
  donations: true,
};

//The access a member's stored record actually grants (accounts created
//before roles existed count as superusers, mirroring the server).
const effectiveAccess = (member: TeamMember): AccessSelection => {
  const effective = toAdminUser(member);
  return {
    superuser: effective.isSuperuser,
    animals: effective.permissions.animals,
    forms: effective.permissions.forms,
    donations: effective.permissions.donations,
  };
};

const requestErrorMessage = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.data?.message
    ? String(error.response.data.message)
    : "Something went wrong. Please try again.";

const PasswordHint = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center gap-2 text-xs font-poppins">
    <Icon
      icon={met ? "charm:circle-tick" : "akar-icons:circle"}
      color={met ? "#15803d" : "#9ca3af"}
      width="14"
      height="14"
    />
    <span className={met ? "text-green-700" : "text-gray-500"}>{text}</span>
  </div>
);

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col">
      <label
        className="mb-1.5 text-sm font-medium text-gray-800 font-poppins"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 pr-11 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 font-poppins"
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Icon
            icon={visible ? "akar-icons:eye-slashed" : "akar-icons:eye"}
            width="18"
            height="18"
          />
        </button>
      </div>
    </div>
  );
};

const PERMISSION_OPTIONS: {
  key: "animals" | "forms" | "donations";
  icon: string;
  label: string;
  description: string;
}[] = [
  {
    key: "animals",
    icon: "mdi:paw-outline",
    label: "Animals",
    description: "Add and update animals, mark them as adopted",
  },
  {
    key: "forms",
    icon: "carbon:folder",
    label: "Forms",
    description: "Read and archive submitted forms and messages",
  },
  {
    key: "donations",
    icon: "carbon:currency-pound",
    label: "Donations",
    description: "See donations and Gift Aid details",
  },
];

//Big-touch-target picker used when creating a user and when changing an
//existing member's access.
const AccessPicker = ({
  value,
  onChange,
}: {
  value: AccessSelection;
  onChange: React.Dispatch<React.SetStateAction<AccessSelection>>;
}) => {
  const roleCardClass = (selected: boolean) =>
    `flex w-full cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5 text-left transition ${
      selected
        ? "border-brand bg-brand-50"
        : "border-gray-200 bg-white hover:border-brand-200"
    }`;

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className={roleCardClass(!value.superuser)}
        onClick={() => onChange({ ...value, superuser: false })}
      >
        <Icon
          className="mt-0.5 shrink-0"
          icon={!value.superuser ? "charm:circle-tick" : "akar-icons:circle"}
          color={!value.superuser ? "#8b3479" : "#9ca3af"}
          width="18"
          height="18"
        />
        <span className="font-poppins">
          <span className="block text-sm font-semibold text-gray-900">
            Team member
          </span>
          <span className="mt-0.5 block text-xs leading-5 text-gray-600">
            Tick exactly what they can do below.
          </span>
        </span>
      </button>

      {!value.superuser && (
        <div className="ml-2 flex flex-col gap-2 border-l-2 border-brand-100 pl-3">
          {PERMISSION_OPTIONS.map((option) => (
            <label
              key={option.key}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-brand-200"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
                checked={value[option.key]}
                onChange={(e) =>
                  onChange({ ...value, [option.key]: e.target.checked })
                }
              />
              <span className="font-poppins">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                  <Icon icon={option.icon} color="#8b3479" width="15" />
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-gray-600">
                  {option.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      )}

      <button
        type="button"
        className={roleCardClass(value.superuser)}
        onClick={() => onChange({ ...value, superuser: true })}
      >
        <Icon
          className="mt-0.5 shrink-0"
          icon={value.superuser ? "charm:circle-tick" : "akar-icons:circle"}
          color={value.superuser ? "#8b3479" : "#9ca3af"}
          width="18"
          height="18"
        />
        <span className="font-poppins">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
            Superuser
            <Icon icon="mdi:shield-account" color="#8b3479" width="15" />
          </span>
          <span className="mt-0.5 block text-xs leading-5 text-gray-600">
            Full access to everything, plus adding and removing team members,
            changing access and resetting forgotten passwords.
          </span>
        </span>
      </button>
    </div>
  );
};

const AccessBadge = ({ member }: { member: TeamMember }) => {
  const access = effectiveAccess(member);
  if (access.superuser) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-deep font-poppins">
        <Icon icon="mdi:shield-account" width="13" />
        Superuser
      </span>
    );
  }
  const granted = PERMISSION_OPTIONS.filter((option) => access[option.key]).map(
    (option) => option.label
  );
  return (
    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 font-poppins">
      {granted.length ? granted.join(" · ") : "View only"}
    </span>
  );
};

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 p-4">
    <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900 font-poppins">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <Icon icon="akar-icons:cross" width="15" height="15" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const ModalButtons = ({
  onCancel,
  onConfirm,
  confirmText,
  busy,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  busy: boolean;
}) => (
  <div className="mt-5 flex gap-3">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 rounded-full border-2 border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 font-poppins"
    >
      Cancel
    </button>
    <button
      type="button"
      disabled={busy}
      onClick={onConfirm}
      className="flex-1 rounded-full bg-brand py-3 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 font-poppins"
    >
      {busy ? "Saving…" : confirmText}
    </button>
  </div>
);

const ErrorNote = ({ message }: { message: string }) =>
  message ? (
    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-poppins">
      {message}
    </div>
  ) : null;

function Index({ currentUser }: { currentUser: AdminUser }) {
  const queryClient = useQueryClient();

  //Add user form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [access, setAccess] = useState<AccessSelection>(DEFAULT_ACCESS);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //Which member a modal is open for
  const [accessTarget, setAccessTarget] = useState<TeamMember | null>(null);
  const [accessDraft, setAccessDraft] =
    useState<AccessSelection>(DEFAULT_ACCESS);
  const [passwordTarget, setPasswordTarget] = useState<TeamMember | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRetype, setNewPasswordRetype] = useState("");
  const [removeTarget, setRemoveTarget] = useState<TeamMember | null>(null);
  const [modalError, setModalError] = useState("");
  const [listError, setListError] = useState("");

  const { data: users, isLoading: usersLoading } = useQuery("users", getUsers, {
    refetchOnWindowFocus: false,
  });

  const invalidateUsers = () => queryClient.invalidateQueries("users");

  const addUserMutation = useMutation(postUser, {
    onSuccess: () => {
      invalidateUsers();
      setSubmitted(true);
      setErrorMessage("");
    },
    onError: (error) => setErrorMessage(requestErrorMessage(error)),
  });

  const accessMutation = useMutation(
    (input: { username: string; access: AccessSelection }) =>
      updateUserAccess(input.username, input.access),
    {
      onSuccess: () => {
        invalidateUsers();
        setAccessTarget(null);
      },
      onError: (error) => setModalError(requestErrorMessage(error)),
    }
  );

  const passwordMutation = useMutation(
    (input: { username: string; password: string }) =>
      resetUserPassword(input.username, input.password),
    {
      onSuccess: () => {
        invalidateUsers();
        setPasswordTarget(null);
      },
      onError: (error) => setModalError(requestErrorMessage(error)),
    }
  );

  const removeMutation = useMutation(deleteUser, {
    onSuccess: () => {
      invalidateUsers();
      setListError("");
    },
    onError: (error) => setListError(requestErrorMessage(error)),
  });

  const handleAddUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username || !password || !passwordRetype) {
      return setErrorMessage("Please fill in all fields");
    }
    if (password !== passwordRetype) {
      return setErrorMessage("Passwords don't match");
    }
    if (!submitted) {
      addUserMutation.mutate({ username, password, access });
    }
  };

  const openAccessModal = (member: TeamMember) => {
    setModalError("");
    setAccessDraft(effectiveAccess(member));
    setAccessTarget(member);
  };

  const openPasswordModal = (member: TeamMember) => {
    setModalError("");
    setNewPassword("");
    setNewPasswordRetype("");
    setPasswordTarget(member);
  };

  const handlePasswordSave = () => {
    if (!passwordTarget) {
      return;
    }
    if (!newPassword || !newPasswordRetype) {
      return setModalError("Please fill in both fields");
    }
    if (newPassword !== newPasswordRetype) {
      return setModalError("Passwords don't match");
    }
    passwordMutation.mutate({
      username: passwordTarget.username,
      password: newPassword,
    });
  };

  const members: TeamMember[] = users?.data ?? [];

  return (
    <>
      <AdminHeadTag
        title={"Team"}
        metaContent={"Admin team management, Bright Eyes"}
        linkHref={"/admin/addUser"}
      />

      <AdminSidebarComponent highlighted="AddUser" currentUser={currentUser}>
        {removeTarget && (
          <AdminConfirmationPopup
            name={removeTarget.username}
            action="delete"
            promptText="remove this team member's login"
            setHideState={() => setRemoveTarget(null)}
            archiveHandler={() => setRemoveTarget(null)}
            deleteHandler={() => {
              removeMutation.mutate(removeTarget.username);
              setRemoveTarget(null);
            }}
          />
        )}

        {accessTarget && (
          <Modal
            title={`Change what ${accessTarget.username} can do`}
            onClose={() => setAccessTarget(null)}
          >
            <AccessPicker value={accessDraft} onChange={setAccessDraft} />
            <ErrorNote message={modalError} />
            <ModalButtons
              onCancel={() => setAccessTarget(null)}
              confirmText="Save access"
              busy={accessMutation.isLoading}
              onConfirm={() =>
                accessMutation.mutate({
                  username: accessTarget.username,
                  access: accessDraft,
                })
              }
            />
          </Modal>
        )}

        {passwordTarget && (
          <Modal
            title={
              passwordTarget.username === currentUser.username
                ? "Change your password"
                : `Set a new password for ${passwordTarget.username}`
            }
            onClose={() => setPasswordTarget(null)}
          >
            <div className="flex flex-col gap-4">
              <PasswordInput
                id="newPassword"
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
              />
              <PasswordInput
                id="newPasswordRetype"
                label="Retype new password"
                value={newPasswordRetype}
                onChange={setNewPasswordRetype}
              />
              <div className="flex flex-col gap-1.5 rounded-xl bg-brand-50 p-4">
                <PasswordHint
                  met={newPassword.length >= 8}
                  text="At least 8 characters"
                />
                <PasswordHint
                  met={
                    newPasswordRetype.length > 0 &&
                    newPassword === newPasswordRetype
                  }
                  text="Both passwords match"
                />
              </div>
              {passwordTarget.username !== currentUser.username && (
                <p className="text-xs leading-5 text-gray-500 font-poppins">
                  Tell {passwordTarget.username} their new password — they can
                  then log in straight away.
                </p>
              )}
            </div>
            <ErrorNote message={modalError} />
            <ModalButtons
              onCancel={() => setPasswordTarget(null)}
              confirmText="Save password"
              busy={passwordMutation.isLoading}
              onConfirm={handlePasswordSave}
            />
          </Modal>
        )}

        <PageContainerComponent>
          <AdminPageHeader
            title="Team"
            subtitle="Add team members and choose exactly what each person can do."
          />

          <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,20rem),1fr]">
            <AdminCard>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                <Icon
                  icon="carbon:group"
                  color="#8b3479"
                  width="24"
                  height="24"
                />
              </div>
              <h2 className="mt-4 text-base font-semibold text-gray-900 font-poppins">
                How access works
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 font-poppins">
                <strong>Team members</strong> only see the areas you tick for
                them — for example a volunteer who can add animals but never see
                donations.
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600 font-poppins">
                <strong>Superusers</strong> can do everything, including
                managing this team page and resetting a password for anyone who
                gets locked out.
              </p>
              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-cream p-3 text-xs leading-5 text-gray-700 font-poppins">
                <Icon
                  className="mt-0.5 shrink-0"
                  icon="akar-icons:lock-on"
                  color="#8b3479"
                  width="14"
                />
                Keep superuser for the one or two people who run things — you
                can&apos;t remove your own account or the last superuser, so the
                team can never lock itself out.
              </div>
            </AdminCard>

            <AdminCard title="Add a team member">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col sm:col-span-2 sm:max-w-xs">
                  <label
                    className="mb-1.5 text-sm font-medium text-gray-800 font-poppins"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 font-poppins"
                    id="username"
                    type="text"
                    placeholder="e.g. jdoe"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <span className="mt-1 text-xs text-gray-500 font-poppins">
                    Unique username for login
                  </span>
                </div>

                <PasswordInput
                  id="password"
                  label="Password"
                  value={password}
                  onChange={setPassword}
                />
                <PasswordInput
                  id="passwordRetype"
                  label="Retype Password"
                  value={passwordRetype}
                  onChange={setPasswordRetype}
                />
              </div>

              <div className="mt-4 flex flex-col gap-1.5 rounded-xl bg-brand-50 p-4">
                <div className="mb-1 text-xs font-semibold text-gray-800 font-poppins">
                  A strong password includes:
                </div>
                <PasswordHint
                  met={password.length >= 8}
                  text="At least 8 characters"
                />
                <PasswordHint
                  met={/[a-z]/.test(password) && /[A-Z]/.test(password)}
                  text="Upper & lower case letters"
                />
                <PasswordHint met={/\d/.test(password)} text="A number" />
                <PasswordHint
                  met={passwordRetype.length > 0 && password === passwordRetype}
                  text="Both passwords match"
                />
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-medium text-gray-800 font-poppins">
                  What can they do?
                </div>
                <AccessPicker value={access} onChange={setAccess} />
              </div>

              <ErrorNote message={errorMessage} />

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <button
                  className={
                    submitted
                      ? "flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white opacity-50 cursor-not-allowed font-poppins"
                      : "flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins"
                  }
                  type="button"
                  onClick={(e) => handleAddUser(e)}
                >
                  <Icon
                    icon="ant-design:user-add-outlined"
                    width="16"
                    height="16"
                  />
                  {submitted
                    ? "User Added"
                    : addUserMutation.isLoading
                    ? "Adding…"
                    : "Create User"}
                </button>
                {submitted && (
                  <button
                    className="rounded-full border-2 border-brand px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand-50 font-poppins"
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setPassword("");
                      setPasswordRetype("");
                      setUsername("");
                      setAccess(DEFAULT_ACCESS);
                    }}
                  >
                    Add another user
                  </button>
                )}
              </div>
            </AdminCard>
          </div>

          <div className="mt-4">
            <AdminCard title="Team Members">
              <ErrorNote message={listError} />
              {usersLoading ? (
                <div className="py-6 text-center text-sm text-gray-500 font-poppins">
                  Loading team members…
                </div>
              ) : members.length ? (
                <>
                  {/* Desktop: table. Mobile: stacked cards below. */}
                  <div className="hidden overflow-x-auto md:block">
                    <TableComponent>
                      <TableHeadMap
                        ArrayOfHeaderTitles={[
                          "Member",
                          "Access",
                          "Added",
                          "Passkeys",
                          "Actions",
                        ]}
                      />
                      <tbody>
                        {members.map((member) => {
                          const isSelf =
                            member.username === currentUser.username;
                          return (
                            <tr key={member._id}>
                              <TableData>
                                <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-gray-900 font-poppins">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold uppercase text-brand">
                                    {member.username.slice(0, 2)}
                                  </span>
                                  {member.username}
                                  {isSelf && (
                                    <span className="rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-gray-600">
                                      You
                                    </span>
                                  )}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="text-center">
                                  <AccessBadge member={member} />
                                </div>
                              </TableData>
                              <TableData>
                                <div className="text-center text-sm font-poppins">
                                  {member.createdAt
                                    ? member.createdAt.slice(0, 10)
                                    : "—"}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="flex items-center justify-center gap-1.5 text-sm font-poppins">
                                  <Icon
                                    icon="carbon:fingerprint"
                                    color="#8b3479"
                                    width="15"
                                  />
                                  {member.authenticators?.length ?? 0}
                                </div>
                              </TableData>
                              <TableData>
                                <div className="flex items-center justify-center gap-2">
                                  {!isSelf && (
                                    <button
                                      title={`Change what ${member.username} can do`}
                                      aria-label={`Change what ${member.username} can do`}
                                      onClick={() => openAccessModal(member)}
                                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
                                    >
                                      <Icon
                                        icon="mdi:shield-account"
                                        width="17"
                                        height="17"
                                      />
                                    </button>
                                  )}
                                  <button
                                    title={
                                      isSelf
                                        ? "Change your password"
                                        : `Reset ${member.username}'s password`
                                    }
                                    aria-label={
                                      isSelf
                                        ? "Change your password"
                                        : `Reset ${member.username}'s password`
                                    }
                                    onClick={() => openPasswordModal(member)}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
                                  >
                                    <Icon
                                      icon="carbon:password"
                                      width="17"
                                      height="17"
                                    />
                                  </button>
                                  {!isSelf && (
                                    <button
                                      title={`Remove ${member.username}`}
                                      aria-label={`Remove ${member.username}`}
                                      onClick={() => setRemoveTarget(member)}
                                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                                    >
                                      <Icon
                                        icon="fluent:delete-20-filled"
                                        width="17"
                                        height="17"
                                      />
                                    </button>
                                  )}
                                </div>
                              </TableData>
                            </tr>
                          );
                        })}
                      </tbody>
                    </TableComponent>
                  </div>

                  <MobileCardList>
                    {members.map((member) => {
                      const isSelf = member.username === currentUser.username;
                      return (
                        <MobileCard key={member._id}>
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold uppercase text-brand">
                              {member.username.slice(0, 2)}
                            </span>
                            <div className="min-w-0 grow">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-base font-semibold text-gray-900 font-poppins">
                                  {member.username}
                                </span>
                                {isSelf && (
                                  <span className="rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-gray-600">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 font-poppins">
                                <AccessBadge member={member} />
                                <span className="flex items-center gap-1">
                                  <Icon
                                    icon="carbon:fingerprint"
                                    color="#8b3479"
                                    width="13"
                                  />
                                  {member.authenticators?.length ?? 0} passkeys
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                            {!isSelf && (
                              <MobileActionButton
                                icon="mdi:shield-account"
                                label="Access"
                                onClick={() => openAccessModal(member)}
                              />
                            )}
                            <MobileActionButton
                              icon="carbon:password"
                              label="Password"
                              onClick={() => openPasswordModal(member)}
                            />
                            {!isSelf && (
                              <MobileActionButton
                                danger
                                icon="fluent:delete-20-filled"
                                label="Remove"
                                onClick={() => setRemoveTarget(member)}
                              />
                            )}
                          </div>
                        </MobileCard>
                      );
                    })}
                  </MobileCardList>
                </>
              ) : (
                <div className="py-6 text-center text-sm text-gray-500 font-poppins">
                  No users found.
                </div>
              )}
            </AdminCard>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Managing the team is superuser-only; staff are sent back to the dashboard.
  const gate = await gateAdminPage(context.req, "superuser");
  if (gate.redirect) {
    return gate.redirect;
  }
  return { props: { currentUser: gate.user } };
};
