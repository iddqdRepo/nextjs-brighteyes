/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import Head from "next/head";
import Link from "next/link";

import React, { useState } from "react";
import { ShowButtonTextOnSubmit } from "../../adminComponents/AddOrEditAnimal/AddOrEditAnimalLayoutComponents";
// import { server } from "../../config";
import { postContactUsForm } from "../../routes/formRoutes";
import { ContactUsSchema } from "../../utils/yup/contactUsYupSchema";
import {
  ErrorFormik,
  InputTextAreaFormik,
  InputTextFormik,
} from "../IndividualFormLayout/CommonFormComponents";
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
    <div className="pt-4 bg-black h-fit">
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
      <div className="flex items-center justify-center pb-2 mt-10">
        <Link href={"https://www.facebook.com/brighteyes.a.s/"}>
          <Icon
            className="mr-2 cursor-pointer"
            icon="akar-icons:facebook-fill"
            color="#8b3479"
            width="30"
            height="30"
          />
        </Link>
        <a href={"https://www.instagram.com/brighteyesanimalsanctuary"}>
          <Icon
            className="mr-2 cursor-pointer"
            icon="akar-icons:instagram-fill"
            color="#8b3479"
            width="30"
            height="30"
          />
        </a>
      </div>
    </div>
  );
};

export const Button = ({
  text,
  iconStr,
  link,
}: {
  text: string;
  iconStr?: string;
  link: string;
}) => {
  return (
    <Link href={`${link}`}>
      <button className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner">
        <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
          <span className="pr-4">{text}</span>
          <Icon
            className=""
            icon={iconStr ? iconStr : "fa:long-arrow-right"}
            inline={true}
            color="white"
          />
        </div>
      </button>
    </Link>
  );
};

export const ButtonWithQuery = ({
  text,
  iconStr,
  link,
  query,
}: {
  text: string;
  iconStr?: string;
  link: string;
  query: string;
}) => {
  return (
    <Link
      href={{
        pathname: link,
        query: {
          type: query,
        },
      }}
    >
      <button className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner">
        <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
          <span className="pr-4">{text}</span>
          <Icon
            className=""
            icon={iconStr ? iconStr : "fa:long-arrow-right"}
            inline={true}
            color="white"
          />
        </div>
      </button>
    </Link>
  );
};
export const HeadTag = ({
  title,
  metaContent,
  linkHref,
}: {
  title: string;
  metaContent: string;
  linkHref: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaContent} />
      <link rel="canonical" href={linkHref} />
    </Head>
  );
};

export const DonationComponent = () => {
  return (
    <div className="relative block bg-no-repeat sm:bg-center sm:bg-cover bg-[url('../public/DonationBanner.png')]">
      <div className="h-100"></div>

      <div className="absolute flex w-10/12 top-10 md:w-3/6 left-5 xl:left-20">
        <div className="absolute flex flex-col md:mt-5 lg:mt-14 ">
          <span className="mb-4 text-3xl font-normal font-poppins">
            Want to make a donation?
          </span>
          <span className="w-full text-sm font-normal sm:text-base font-poppins">
            In the past 5 years we have rehomed over 1,000 Cats and Dogs. We
            receive no government funding and rely purely on the generosity of
            the public to help us continue our work. We would be grateful if you
            would like to set up a standing order each month or leave a legacy
            in your will, your contribution will make a huge difference to
            animal welfare and help us continue to rescue more animals that need
            us.
          </span>
          <Button
            text="Donate"
            iconStr="ant-design:heart-filled"
            link={`/donate`}
          />
        </div>
      </div>
    </div>
  );
};

export const ContactUsSection = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");

  const initialValues = {
    aboutQuestions: {
      name: "",
      email: "",
    },
    message: "",
    type: "contactUs",
    archive: "No",
  };

  return (
    <>
      <DashedTitle text="Contact Us" />

      <div className="flex items-center justify-center mb-20">
        <div className="flex flex-col-reverse items-center justify-center w-full lg:flex-row xl:w-2/3">
          <Formik
            initialValues={initialValues}
            validationSchema={ContactUsSchema}
            onSubmit={async (data) => {
              setLoading(true);
              let successful = await postContactUsForm(data);
              if (successful) {
                setLoading(false);
                setIsSuccess(true);
              } else {
                setLoading(false);
                setIsSuccess(false);
                setButtonText("ERROR, try again");
              }
            }}
          >
            {({ errors, touched, handleSubmit }) => (
              <div className="flex flex-col items-start w-5/6 p-8 bg-white border rounded-md shadow-md ">
                <div className="flex flex-col md:flex-row">
                  <InputTextFormik
                    labelText={"Name"}
                    val={"aboutQuestions.name"}
                    forNameId={"aboutQuestions.name"}
                    labelLeftAligned={true}
                    labelClassN="block mb-2 text-lg font-normal font-poppins"
                  >
                    <ErrorFormik
                      err={errors}
                      touch={touched}
                      field="name"
                      parent={"aboutQuestions"}
                      id={"err-name"}
                    />
                  </InputTextFormik>
                  <InputTextFormik
                    labelText={"Email"}
                    val={"aboutQuestions.email"}
                    forNameId={"aboutQuestions.email"}
                    labelLeftAligned={true}
                    labelClassN="block mb-2 text-lg font-normal font-poppins"
                  >
                    <ErrorFormik
                      err={errors}
                      touch={touched}
                      field="email"
                      parent={"aboutQuestions"}
                      id={"err-email"}
                    />
                  </InputTextFormik>
                </div>

                <InputTextAreaFormik
                  labelText={"Message"}
                  val={"message"}
                  forNameId={"message"}
                  fieldclassN="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-52 p-2.5 mb-4"
                  labelclassN="block mb-2 text-lg font-normal font-poppins text-left"
                >
                  <ErrorFormik
                    err={errors}
                    touch={touched}
                    field="message"
                    id={"err-message"}
                  />
                </InputTextAreaFormik>
                <ShowButtonTextOnSubmit
                  loading={loading}
                  isSuccess={isSuccess}
                  buttonText={buttonText}
                  submitHandler={handleSubmit}
                  animalName={"message"}
                />
              </div>
            )}
          </Formik>
          <div className="flex justify-center basis-2/3">
            <img
              className="bg-center bg-no-repeat sm:w-4/5 xl:w-full"
              src="/ContactUsImage.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const Popup = ({
  name,
  deleteHandler,
  archiveHandler,
  setHideState,
  action,
  promptText,
}: {
  name: string;
  deleteHandler: any;
  archiveHandler: any;
  setHideState: any;
  action: string;
  promptText: string;
}) => {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-600 ">
      <div className="flex flex-col items-center p-4 bg-white border-2 shadow-lg h-fit w-96">
        <div className="pt-5 text-lg text-red-700 font-roboto">
          Are you sure you want to {promptText}
        </div>
        <div className="p-2 m-5 text-red-700 border-2 font-roboto">{name}</div>
        <button
          onClick={
            action === "archive"
              ? () => archiveHandler()
              : () => deleteHandler()
          }
          className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Yes</span>
          </div>
        </button>
        <button
          onClick={() => setHideState(true)}
          className="flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">No</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export const LoadingIcon = () => {
  return (
    <div className="mt-10">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-purple-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-purple-700 rounded-full animate-spin"></div>
      </div>

      <div className="relative">
        <div className="w-10 h-10 border-2 border-purple-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-purple-700 rounded-full animate-spin"></div>
      </div>

      <div className="relative">
        <div className="w-5 h-5 border-2 border-purple-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-purple-700 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
