import { Icon } from "@iconify/react";
import React from "react";
export const BigCard = ({
  header,
  data,
}: {
  header: string;
  data: number | React.ReactElement;
}) => {
  return (
    <div className="flex flex-col items-center justify-start pt-10 mb-5 ml-2 mr-2 rounded-lg w-96 h-80 bg-gradient-to-b to-slate-100 from-slate-200 ">
      <div className="flex flex-col items-center mb-2">
        <Icon
          className="w-auto mb-3 text-red-600 h-7 group-hover:text-white"
          icon="akar-icons:circle-alert"
        />
        <span className="text-2xl text-center text-[#8B3479] font-roboto">
          Pending
        </span>
      </div>
      <span className="mb-5 text-3xl text-center text-[#8B3479] font-poppins">
        {header}
      </span>
      <span className="text-6xl text-[#8B3479] font-roboto">{data}</span>
    </div>
  );
};
export const SmallCard = ({
  header,
  data,
}: {
  header: string;
  data: number | React.ReactElement;
}) => {
  return (
    <div className="flex flex-col items-center justify-start pt-10 mb-2 ml-2 mr-2 border border-gray-200 rounded-lg shaow-md w-80 md:w-96 h-52">
      <span className="mb-5 text-2xl font-roboto">{header}</span>
      <span className="text-7xl font-roboto">{data}</span>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="w-10 h-10 border-8 border-[#8B3479] border-solid rounded-full animate-ping mt-5"></div>
  );
};
