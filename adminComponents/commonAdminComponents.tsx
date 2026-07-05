import React from "react";
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function PageContainerComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full flex-col px-4 pb-12 pt-2 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export function TableComponent(props: BaseProps) {
  const { children, className } = props;

  return (
    <table
      //If no className is passed in, render below as default, otherwise amend with new className
      className={clsx("w-full text-sm border-collapse", className)}
    >
      {children}
    </table>
  );
}

function TableHeader(props: BaseProps) {
  const { children, className } = props;

  return (
    <th
      className={clsx(
        "whitespace-nowrap bg-gray-50 p-2 md:px-4 md:py-3 text-xs font-semibold text-center uppercase tracking-wider border-b border-gray-200 text-gray-500 font-poppins",
        className
      )}
    >
      {children}
    </th>
  );
}
export function TableData(props: BaseProps) {
  const { children, className } = props;

  return (
    <td
      className={clsx(
        "p-2 md:px-4 md:py-3 border-b border-gray-100 text-gray-600",
        className
      )}
    >
      {children}
    </td>
  );
}
export function TableHeadMap({
  ArrayOfHeaderTitles,
}: {
  ArrayOfHeaderTitles: string[];
}) {
  return (
    <thead>
      <tr>
        {ArrayOfHeaderTitles.map((title) => {
          return <TableHeader key={title}>{title}</TableHeader>;
        })}
      </tr>
    </thead>
  );
}

export function SearchInput({
  id,
  change,
  val,
  placehold,
}: {
  id: string;
  change: any;
  val: string;
  placehold: string;
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2"
        icon="akar-icons:search"
        color="#9ca3af"
        width="15"
        height="15"
      />
      <input
        className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-poppins"
        type="text"
        id={id}
        name={id}
        placeholder={placehold}
        onChange={(e) => {
          change(e.target.value);
        }}
        value={val}
      />
    </div>
  );
}

export const AdminSelect = ({
  id,
  value,
  onChange,
  children,
  ariaLabel,
}: {
  id?: string;
  value?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
  ariaLabel?: string;
}) => {
  return (
    <select
      className="h-11 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-poppins"
      id={id}
      name={id}
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 pt-6 text-2xl font-semibold text-gray-900 sm:text-3xl font-poppins">
      {children}
      <Icon icon="foundation:paw" color="#8b3479" width="20" height="20" />
    </div>
  );
};

export const AdminPageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="pt-6">
      <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900 sm:text-3xl font-poppins">
        {title}
        <Icon icon="foundation:paw" color="#8b3479" width="20" height="20" />
      </div>
      <p className="mt-1 text-sm text-gray-500 font-poppins">{subtitle}</p>
    </div>
  );
};

export const AdminStatCard = ({
  icon,
  label,
  value,
  link,
  linkText,
  tint = "white",
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
  link?: string;
  linkText?: string;
  tint?: "white" | "blush" | "cream";
}) => {
  const tints = {
    white: "border-gray-100 bg-white",
    blush: "border-brand-100 bg-brand-50",
    cream: "border-amber-100 bg-cream",
  };
  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl border p-5 shadow-sm",
        tints[tint]
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100">
          <Icon icon={icon} color="#8b3479" width="24" height="24" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-600 font-poppins">
            {label}
          </div>
          <div className="text-2xl font-semibold text-gray-900 font-poppins">
            {value}
          </div>
        </div>
      </div>
      {link && (
        <Link href={link}>
          <a className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand transition hover:text-brand-dark font-poppins">
            {linkText ? linkText : "View all"}
            <Icon icon="fa:long-arrow-right" width="11" />
          </a>
        </Link>
      )}
    </div>
  );
};

export const AdminCard = ({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-base font-semibold text-gray-900 font-poppins">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

//Mobile companions to TableComponent: admin tables are hidden on small
//screens (hidden md:block) and each row is shown as one of these stacked
//cards instead, so phone users never have to sideways-scroll a table.
export const MobileCardList = (props: BaseProps) => {
  return (
    //grid-cols-1 (minmax(0,1fr)) so a card's content can never widen the
    //track past the screen edge.
    <div className={clsx("grid grid-cols-1 gap-3 md:hidden", props.className)}>
      {props.children}
    </div>
  );
};

export const MobileCard = (props: BaseProps) => {
  return (
    <div
      className={clsx(
        "min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export const MobileCardRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-50 py-2 last:border-b-0">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400 font-poppins">
        {label}
      </span>
      <span className="text-right text-sm text-gray-800 font-poppins">
        {children}
      </span>
    </div>
  );
};

//Labelled action button for the mobile cards — friendlier on a phone than
//the icon-only buttons the desktop tables use.
export const MobileActionButton = ({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-xs font-medium transition font-poppins",
        danger
          ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
      )}
    >
      <Icon className="shrink-0" icon={icon} width="15" height="15" />
      <span className="truncate">{label}</span>
    </button>
  );
};

export const AdminHeadTag = ({
  title,
  metaContent,
  linkHref,
}: {
  title: string;
  metaContent: string;
  linkHref: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaContent} />
      <meta name="robots" content="noindex" />
      <link rel="canonical" href={linkHref} />
    </Head>
  );
};

export const AdminConfirmationPopup = ({
  name,
  deleteHandler,
  archiveHandler,
  setHideState,
  action,
  promptText,
}: {
  name: string;
  deleteHandler: any;
  archiveHandler: any;
  setHideState: any;
  action: string;
  promptText: string;
}) => {
  const isDelete = action === "delete";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 p-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-6 shadow-2xl">
        <div
          className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-full",
            isDelete ? "bg-red-50" : "bg-brand-50"
          )}
        >
          <Icon
            icon={
              isDelete ? "fluent:delete-20-filled" : "akar-icons:circle-alert"
            }
            color={isDelete ? "#dc2626" : "#8b3479"}
            width="26"
            height="26"
          />
        </div>
        <div className="mt-4 text-center text-base font-medium text-gray-900 font-poppins">
          Are you sure you want to {promptText}
        </div>
        <div className="mt-3 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 font-poppins">
          {name}
        </div>
        <div className="mt-6 flex w-full gap-3">
          <button
            onClick={() => setHideState(true)}
            className="flex-1 rounded-full border-2 border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 font-poppins"
          >
            No, cancel
          </button>
          <button
            onClick={
              action === "archive"
                ? () => archiveHandler()
                : () => deleteHandler()
            }
            className={clsx(
              "flex-1 rounded-full py-3 text-sm font-medium text-white transition font-poppins",
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-brand hover:bg-brand-dark"
            )}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
