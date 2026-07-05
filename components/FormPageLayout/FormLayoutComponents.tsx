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
  const renderButton = () => {
    return query ? (
      <ButtonWithQuery
        text={buttonText}
        link="/forms/adoptionForm"
        query={query}
      />
    ) : (
      <Button text={buttonText} link={`/forms/${link}`} />
    );
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-200/60 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative bg-brand pb-14 pt-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
          <Icon icon={icon} color="#8b3479" width="46" height="46" />
        </div>
        <svg
          className="absolute -bottom-px left-0 w-full"
          viewBox="0 0 283.5 27.8"
          preserveAspectRatio="none"
        >
          <path
            className="fill-white"
            d="M0 27.8h283.5V13.4c-45.2 9.6-94.4 14.4-141.7 8.1C94.5 15.2 47.2 3.2 0 .5v27.3z"
          />
        </svg>
      </div>
      <div className="flex grow flex-col items-center p-6 pt-2 text-center">
        <span className="text-xl font-semibold text-gray-900 font-poppins">
          {title}
        </span>
        <p className="mt-2 grow text-sm leading-6 text-gray-600 font-poppins">
          {text}
        </p>
        {renderButton()}
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
    <div className="mx-auto grid w-11/12 max-w-6xl gap-6 pb-6 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  );
};

export const FormsInfoItem = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-200 bg-white">
        <Icon icon={icon} color="#8b3479" width="26" height="26" />
      </div>
      <div>
        <div className="text-base font-semibold text-gray-900 font-poppins">
          {title}
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600 font-poppins">
          {text}
        </p>
      </div>
    </div>
  );
};
