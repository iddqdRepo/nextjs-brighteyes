/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";
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
export const FooterSection = () => {
  const FooterIconText = ({
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
  return (
    <div className="h-screen pt-4 bg-black md:h-96">
      <div className="flex items-center justify-center">
        <img className="w-32 h-32" src="/logo-nav.png" alt="" />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-wrap items-center justify-center w-full 2xl:w-5/6">
          <FooterIconText icon="akar-icons:location">
            53 Killymittan Road, <br /> BT94 2FW <br />
            Ballinamallard
          </FooterIconText>
          <FooterIconText icon="clarity:alarm-clock-line">
            Mon &#8211; Sun: 12:00 &#8211; 15:00
          </FooterIconText>
          <FooterIconText icon="akar-icons:envelope">
            brighteyes.sanctuary@
            <br />
            btinternet.com
          </FooterIconText>
          <FooterIconText icon="carbon:phone-voice">
            <div className="flex flex-col">
              <span className="font-medium text-white text-md font-poppins">
                07710607816
              </span>
              <span className="font-medium text-white text-md font-poppins">
                028 66 388885
              </span>
            </div>
          </FooterIconText>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Icon
          className="mr-2"
          icon="akar-icons:facebook-fill"
          color="#8b3479"
          width="30"
          height="30"
        />
        <Icon
          className="mr-2"
          icon="akar-icons:instagram-fill"
          color="#8b3479"
          width="30"
          height="30"
        />
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
