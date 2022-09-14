import { Icon } from "@iconify/react";
import React from "react";

export const FooterIconText = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-start h-20 mt-8 xl:justify-center w-80">
      <div className="flex rounded-full bg-[#8b3479] h-20 w-20 items-center justify-center mr-2">
        <Icon color="#ffffff" icon={icon} width="40" height="40" />
      </div>

      <span className="font-medium text-white text-md font-poppins">
        {children}
      </span>
    </div>
  );
};

export const DashedTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex w-5/6 mt-16 mb-10 text-xl font-semibold font-poppins">
        <div className="flex items-center">
          <div className="mr-2 border-b-4 border-[#8b3479] w-7"></div>
        </div>
        {text}
      </div>
    </div>
  );
};

export const Card = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center justify-center p-8 m-2 mt-10 border rounded-lg shadow-xl sm:mr-10 h-36 hover:shadow-2xl w-96">
      <div className="flex pr-10">
        <Icon icon={icon} color="#8b3479" width="70" height="70" />
      </div>
      <div className="flex flex-col w-3/6">
        <span className="text-lg font-medium font-poppins text-[#8b3479]">
          {title}
        </span>
        <span className="text-sm font-normal flex-nowrap font-poppins">
          {text}
        </span>
      </div>
    </div>
  );
};

export const Button = ({ text }: { text: string }) => {
  return (
    <button className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner">
      <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
        <span className="pr-4">{text}</span>
        <Icon
          className=""
          icon="fa:long-arrow-right"
          inline={true}
          color="white"
        />
      </div>
    </button>
  );
};
