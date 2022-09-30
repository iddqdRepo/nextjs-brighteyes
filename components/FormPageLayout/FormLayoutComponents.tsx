import { Icon } from "@iconify/react";
import { Button, ButtonWithQuery } from "../common/CommonComponents";
import React from "react";

export const FormCard = ({
  title,
  text,
  icon,
  buttonText,
  query,
  link,
}: {
  title: string;
  text: string;
  icon: string;
  buttonText: string;
  query?: string;
  link?: string;
}) => {
  return (
    <div className="flex flex-col w-80 h-100 bg-[url('../public/CardImage.png')] bg-no-repeat bg-center bg-cover mb-5 sm:mb-0 sm:mr-10 mt-10">
      <div className="mt-8 ml-10">
        <Icon icon={icon} color="white" width="60" height="60" />
      </div>
      <div className="flex flex-col p-10 ">
        <span className="text-3xl font-semibold text-[#8b3479] font-poppins mt-5 mb-5">
          {title}
        </span>
        {text}
        {query ? (
          <ButtonWithQuery
            text={buttonText}
            link="/forms/adoptionForm"
            query={query}
          />
        ) : (
          <Button text={buttonText} link={`/forms/${link}`} />
        )}
      </div>
    </div>
  );
};

export const FormCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center w-full mt-10 sm:mt-20 sm:mb-32">
      <div className="flex flex-wrap items-center justify-center w-full xl:flex-wrap ">
        {children}
      </div>
    </div>
  );
};
