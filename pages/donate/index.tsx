import React from "react";
// import * as api from "../api/apiIndex";
import { RoughNotation } from "react-rough-notation";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  ContactUsSection,
  FooterSection,
} from "../../components/common/CommonComponents";

function Donate() {
  // function createData(type: string, details: string) {
  //   return { type, details };
  // }

  const IconText = ({ icon, text }: { icon: string; text: string }) => {
    return (
      <>
        <div className="flex rounded-full bg-[#8b3479] h-12 w-12 items-center justify-center">
          <Icon color="#ffffff" icon={icon} width="25" height="25" />
        </div>
        <span className="font-normal text-md pb-7 font-poppins lg:text-2xl">
          {text}
        </span>
      </>
    );
  };

  const DonateIconContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-col items-center w-28 lg:w-44">{children}</div>
    );
  };

  const DonateUsesSection = () => {
    return (
      <div className="bg-[url('../public/DonateUses.png')] bg-cover">
        <div className="flex flex-col w-full lg:w-3/6">
          <div className="flex items-center justify-center pt-10 text-3xl font-normal text-center lg:text-4xl pb-7 font-poppins">
            Your Donation Goes Towards
          </div>
          <div className="flex justify-center pt-5">
            <DonateIconContainer>
              <IconText icon={"fluent:food-24-filled"} text="Food" />
              <IconText icon={"ic:sharp-model-training"} text="Training" />
              <IconText icon={"map:veterinary-care"} text="Vet Bills" />
              <IconText icon={"map:insurance-agency"} text="Insurance" />
            </DonateIconContainer>
            <DonateIconContainer>
              <IconText icon={"bx:bxs-blanket"} text="Bedding" />
              <IconText
                icon={"healthicons:emergency-post-outline"}
                text="Emergencies"
              />
              <IconText
                icon={"pepicons:electricity-print"}
                text="Electricity"
              />
              <IconText
                icon={"icon-park-outline:oil-industry"}
                text="Heating"
              />
            </DonateIconContainer>

            <DonateIconContainer>
              <IconText icon={"mdi:needle"} text="Vaccinations" />
              <IconText icon={"mdi:toy-brick-plus"} text="Toys" />

              <IconText icon={"wpf:maintenance"} text="Maintenance" />
              <IconText icon={"ep:more-filled"} text="And More" />
            </DonateIconContainer>
          </div>
        </div>
      </div>
    );
  };

  function Table() {
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
            <td className="p-4 pl-8 border-b border-slate-100 text-slate-500 ">
              Bank
            </td>
            <td className="p-4 border-b border-slate-100 text-slate-500 ">
              Santander Bank
            </td>
          </tr>
          <tr>
            <td className="p-4 pl-8 border-b border-slate-100 text-slate-500 ">
              Sort Code
            </td>
            <td className="p-4 border-b border-slate-100 text-slate-500 ">
              09-01-26
            </td>
          </tr>
          <tr>
            <td className="p-4 pl-8 border-b border-slate-200 text-slate-500 ">
              Account Number
            </td>
            <td className="p-4 border-b border-slate-200 text-slate-500 ">
              23320595
            </td>
          </tr>
          <tr>
            <td className="p-4 pl-8 border-b border-slate-200 text-slate-500 ">
              Type
            </td>
            <td className="p-4 border-b border-slate-200 text-slate-500 ">
              Business
            </td>
          </tr>
          <tr>
            <td className="p-4 pl-8 border-b border-slate-200 text-slate-500 ">
              Name
            </td>
            <td className="p-4 border-b border-slate-200 text-slate-500 ">
              Bright Eyes Animal Sanctuary
            </td>
          </tr>
          <tr>
            <td className="p-4 pl-8 border-b border-slate-200 text-slate-500 ">
              Reference
            </td>
            <td className="p-4 border-b border-slate-200 text-slate-500 ">
              Bright Eyes Donation
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <svg
        className="lg:-mb-30 xl:-mb-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#8b3479"
          fillOpacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,96C384,85,480,75,576,85.3C672,96,768,128,864,138.7C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="flex w-full h-fit bg-[#8b3479]">
        <div className="flex flex-col items-center w-full just">
          <div className="flex flex-col w-5/6 md:justify-center xl:flex-row h-2/4">
            <div className=" basis-2/3">
              <div className="pt-3 text-2xl font-normal text-white sm:text-4xl pb-7 font-poppins">
                <span className="md:text-6xl">Donate</span>, <br />
                <span className="xl:text-5xl">Change a Life Today.</span>
              </div>

              <div className="text-sm text-white sm:text-xl font-extralight font-poppins">
                In the past 5 years we have rehomed over{" "}
                <span className="font-semibold">1,000 Cats and Dogs.</span>
                <br />
                We receive no government funding and rely purely on the
                generosity of the public to help us continue our work.
                <br />
                We would be grateful if you would like to set up a standing
                order each month or leave a legacy in your will, your
                contribution will make a huge difference to animal welfare and
                help us continue to rescue more animals that need us.
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
        <path
          fill="#8b3479"
          fillOpacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,96C384,85,480,75,576,85.3C672,96,768,128,864,138.7C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="flex justify-center w-full mt-20 mb-20">
        <div className="flex flex-col items-center justify-center w-full xl:w-5/6 md:flex-row">
          <div className="flex flex-col items-center w-full md:w-3/6">
            <RoughNotation
              iterations={5}
              type="box"
              show={true}
              color="#8b3479"
              strokeWidth={3}
              animate={false}
            >
              <span className="text-3xl font-poppins">One Off Donation</span>
            </RoughNotation>
            <div className="pt-5 text-lg font-poppins">
              Perfect for a one off donation <br />
              or recurring monthly donations <br />
              if you have a Paypal account.
            </div>
            <Icon icon="akar-icons:arrow-down" width="40" />
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
            >
              <input
                type="hidden"
                name="hosted_button_id"
                value="JPRFRRVZHSMY4"
              />
              <input
                type="image"
                id="image"
                className="paypal-donate-image"
                src="/PaypalPay.png"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <Image
                className="paypal-donate"
                alt=""
                src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>
          <div className="flex flex-col items-center w-full mt-10 md:mt-0 md:w-3/6">
            <RoughNotation
              iterations={5}
              type="box"
              show={true}
              color="#8b3479"
              strokeWidth={3}
            >
              <span className="text-3xl font-poppins">
                Set up a Standing Order
              </span>
            </RoughNotation>
            <div className="pt-5 text-lg font-poppins">
              Perfect for a one off donation <br />
              or recurring monthly donations <br />
              if you have a Paypal account.
            </div>
            <Icon icon="akar-icons:arrow-down" width="40" />
            <div className="lg:w-3/5">
              <Table />
            </div>
          </div>
        </div>
      </div>

      <DonateUsesSection />
      <ContactUsSection />
      <FooterSection />
    </>
  );
}

export default Donate;
