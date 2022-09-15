/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../common/CommonComponents";

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
export const InfoCard = ({
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

export const AboutCard = ({
  title,
  text,
  icon,
  buttonText,
}: {
  title: string;
  text: string;
  icon: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col w-80 h-100 bg-[url('../public/CardImage.png')] bg-no-repeat bg-center bg-cover mb-5 sm:mb-0 sm:mr-10">
      <div className="mt-8 ml-10">
        <Icon icon={icon} color="white" width="60" height="60" />
      </div>
      <div className="flex flex-col p-10 ">
        <span className="text-3xl font-semibold text-[#8b3479] font-poppins mt-5 mb-5">
          {title}
        </span>
        {text}
        <Button text={buttonText} />
      </div>
    </div>
  );
};
