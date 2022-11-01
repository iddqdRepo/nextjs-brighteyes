import React from "react";
import clsx from "clsx";

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

export function TableHeader(props: BaseProps) {
  const { children, className } = props;

  return (
    <th
      //If no className is passed in, render below as default, otherwise amend with new className
      className={clsx(
        "p-4 pt-0 pb-3 font-medium text-center uppercase border-b text-slate-400",
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
        "p-4 border-b border-slate-100 text-slate-500",
        className
      )}
    >
      {children}
    </td>
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
