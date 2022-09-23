import React from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

const Td = ({ text, classN }: { text: string; classN?: string }) => {
  return (
    <td
      className={clsx("p-4 border-b border-slate-200 text-slate-500", classN)}
    >
      {text}
    </td>
  );
};

export const Table = () => {
  return (
    <table className="text-sm text-center border-collapse table-fixed md:w-full">
      <thead>
        <tr>
          <th className="p-4 pt-0 pb-3 pl-8 font-medium border-b text-slate-400 ">
            Type
          </th>
          <th className="p-4 pt-0 pb-3 font-medium border-b text-slate-400 ">
            Details
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <Td text={"Bank"} classN={"pl-8"} />
          <Td text={"Santander Bank"} />
        </tr>
        <tr>
          <Td text={"Sort Code"} classN={"pl-8"} />
          <Td text={"09-01-26"} />
        </tr>
        <tr>
          <Td text={"Account Number"} classN={"pl-8"} />
          <Td text={"23320595"} />
        </tr>
        <tr>
          <Td text={"Type"} classN={"pl-8"} />
          <Td text={"Business"} />
        </tr>
        <tr>
          <Td text={"Name"} classN={"pl-8"} />
          <Td text={"Bright Eyes Animal Sanctuary"} />
        </tr>
        <tr>
          <Td text={"Reference"} classN={"pl-8"} />
          <Td text={"Bright Eyes Donation"} />
        </tr>
      </tbody>
    </table>
  );
};

export const DonateIconContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center w-28 lg:w-44">{children}</div>
  );
};

export const IconText = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <>
      <div className="flex rounded-full bg-[#8b3479] h-12 w-12 items-center justify-center">
        <Icon color="#ffffff" icon={icon} width="25" height="25" />
      </div>
      <span className="font-normal text-md pb-7 font-poppins lg:text-lg">
        {text}
      </span>
    </>
  );
};
