import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export const AdoptionCard = ({
  name,
  type,
  age,
  sex,
  image,
}: {
  name: string;
  type: string;
  age: string;
  sex: string;
  image?: string;
}) => {
  return (
    <>
      <div className="flex flex-col mb-10 ml-3 mr-3">
        {/* <img className="" src={image} alt="" /> */}
        <div
          className="w-64 bg-no-repeat bg-cover rounded-xl h-80"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></div>
        <Link href={`/adoption/${name}`}>
          <a className="flex justify-center w-full -mt-14">
            <div className="flex flex-col w-11/12 bg-white border border-gray-300 rounded-md">
              <span className="pt-3 pb-2 pl-6 pr-6 text-xl font-semibold font-poppins">
                {name}
              </span>
              <span className="pb-2 pl-6 pr-6 text-[#8b3479] text-sm font-normal font-roboto">
                {type}
              </span>
              <div className="flex justify-center w-full">
                <span className="w-10/12 mb-2 border-b border-gray-100"></span>
              </div>
              <div className="flex justify-center text-sm font-normal font-roboto">
                <div className="flex items-center mr-4">
                  <Icon
                    className="mr-2"
                    icon={"akar-icons:cake"}
                    inline={true}
                    color="#8b3479"
                  />
                  <span>Age:&nbsp;</span>
                  <span>{age}</span>
                </div>
                <div className="flex items-center">
                  <Icon
                    className="mr-2"
                    icon={"bi:gender-ambiguous"}
                    inline={true}
                    color="#8b3479"
                  />
                  <span>Sex:&nbsp;</span>
                  <span>{sex}</span>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export const AdoptionIconContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col flex-wrap pt-10 sm:flex-nowrap lg:items-start w-fit">
      {children}
    </div>
  );
};

export const IconText = ({ text }: { text: string }) => {
  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center pb-8 pl-2 pr-2 lg:flex-row">
        <div className="flex rounded-full bg-[#8b3479] h-20 w-20 items-center justify-center">
          <Icon
            color="#ffffff"
            icon="charm:circle-tick"
            width="40"
            height="40"
          />
        </div>
        <span className="font-normal sm:pl-6 text-md font-poppins xl:text-2xl">
          {text}
        </span>
      </div>
    </>
  );
};
