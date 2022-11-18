import React from "react";
import clsx from "clsx";
import Head from "next/head";

export function PageContainerComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col w-full ">{children}</main>;
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
      className={clsx("w-full text-sm border-collapse table-fixed", className)}
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
        "p-1 md:p-4 pt-0 pb-3 text-xs md:text-md font-medium text-center uppercase border-b text-slate-400",
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
        " p-1 md:p-4 border-b border-slate-100 text-slate-500",
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
    <input
      className="flex w-56 px-2 mb-2 border rounded-lg h-14 sm:mr-0"
      type="text"
      id={id}
      name={id}
      placeholder={placehold}
      onChange={(e) => {
        change(e.target.value);
      }}
      value={val}
    />
  );
}

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center mt-20 text-lg font-poppins">
      {children}
    </div>
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
