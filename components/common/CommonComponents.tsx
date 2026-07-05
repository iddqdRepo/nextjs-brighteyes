import { Icon } from "@iconify/react";
import { Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { server } from "../../config";
import { postContactUsForm } from "../../routes/formRoutes";
import { ContactUsSchema } from "../../utils/yup/contactUsYupSchema";
import {
  ErrorFormik,
  InputTextAreaFormik,
  InputTextFieldWithLabelFormik,
} from "../IndividualFormLayout/CommonFormComponents";

export const SectionEyebrow = ({
  text,
  centered,
}: {
  text: string;
  centered?: boolean;
}) => {
  return (
    <div
      className={`mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand font-poppins ${
        centered ? "text-center" : ""
      }`}
    >
      {text}
    </div>
  );
};

export const DashedTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-16 mb-10">
      <div className="w-10 border-b-2 border-brand"></div>
      <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900 sm:text-3xl font-poppins">
        {text}
        <Icon icon="foundation:paw" color="#8b3479" width="24" height="24" />
      </div>
      <div className="w-10 border-b-2 border-brand"></div>
    </div>
  );
};

export const FooterSection = () => {
  const FooterHeading = ({ text }: { text: string }) => (
    <div className="mb-4 text-base font-semibold text-white font-poppins">
      {text}
    </div>
  );

  const FooterRow = ({
    icon,
    children,
  }: {
    icon: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-start gap-3 mb-3 text-sm leading-6 text-white/75 font-poppins">
      <Icon
        className="mt-1 shrink-0"
        color="#b05a9d"
        icon={icon}
        width="18"
        height="18"
      />
      <span>{children}</span>
    </div>
  );

  const FooterLink = ({ text, href }: { text: string; href: string }) => (
    <li className="mb-2">
      <Link href={href}>
        <a className="text-sm text-white/75 transition hover:text-white font-poppins">
          {text}
        </a>
      </Link>
    </li>
  );

  return (
    <footer className="bg-night">
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1fr,0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-nav.png" alt="" width={56} height={51} />
            <div className="font-poppins">
              <div className="text-lg font-semibold tracking-wide text-white">
                BRIGHT EYES
              </div>
              <div className="text-xs tracking-[0.3em] text-white/60 uppercase">
                Animal Sanctuary
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75 font-poppins">
            Rescue. Rehabilitate. Rehome. Giving animals the second chance they
            deserve since 1989.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://www.facebook.com/brighteyes.a.s/"
              aria-label="Bright Eyes on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand"
            >
              <Icon
                icon="akar-icons:facebook-fill"
                color="#ffffff"
                width="18"
                height="18"
              />
            </a>
            <a
              href="https://www.instagram.com/brighteyesanimalsanctuary"
              aria-label="Bright Eyes on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand"
            >
              <Icon
                icon="akar-icons:instagram-fill"
                color="#ffffff"
                width="18"
                height="18"
              />
            </a>
          </div>
        </div>

        <div>
          <FooterHeading text="Contact Us" />
          <FooterRow icon="akar-icons:location">
            53 Killymittan Road, <br />
            BT94 2FW, Ballinamallard
          </FooterRow>
          <FooterRow icon="carbon:phone-voice">
            028 66 720078 <br /> 07710607816
          </FooterRow>
          <FooterRow icon="akar-icons:envelope">
            brighteyes.sanctuary
            <wbr />
            @btinternet.com
          </FooterRow>
        </div>

        <div>
          <FooterHeading text="Opening Hours" />
          <FooterRow icon="clarity:alarm-clock-line">
            Mon &#8211; Sun: <br />
            12:00 &#8211; 15:00
          </FooterRow>
        </div>

        <div>
          <FooterHeading text="Quick Links" />
          <ul>
            <FooterLink text="About Us" href="/about" />
            <FooterLink text="Adoption" href="/adoption" />
            <FooterLink text="Happy Tails" href="/happy-tails" />
            <FooterLink text="Donate" href="/donate" />
            <FooterLink text="Forms" href="/forms" />
            <FooterLink text="Contact" href="/#contact" />
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-11/12 max-w-7xl 2xl:max-w-[85rem] flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/55 font-poppins sm:flex-row sm:text-left">
          <span>
            &copy; {new Date().getFullYear()} Bright Eyes Animal Sanctuary. All
            rights reserved.
          </span>
          <span className="flex items-center gap-2">
            <Icon
              icon="foundation:paw"
              color="#b05a9d"
              width="14"
              height="14"
            />
            Registered with the Charity Commission for Northern Ireland
          </span>
        </div>
      </div>
    </footer>
  );
};

const buttonStyles = {
  primary:
    "flex rounded-full justify-center items-center bg-brand max-w-fit mt-5 transition hover:bg-brand-dark shadow-lg shadow-brand/20",
  outline:
    "flex rounded-full justify-center items-center border-2 border-brand bg-white max-w-fit mt-5 transition hover:bg-brand-50",
};

const buttonInnerStyles = {
  primary:
    "flex items-center justify-center pt-3.5 pb-3.5 text-sm font-medium text-white pr-8 pl-8 font-poppins",
  outline:
    "flex items-center justify-center pt-3.5 pb-3.5 text-sm font-medium text-brand pr-8 pl-8 font-poppins",
};

export const Button = ({
  text,
  iconStr,
  link,
  variant = "primary",
}: {
  text: string;
  iconStr?: string;
  link: string;
  variant?: "primary" | "outline";
}) => {
  return (
    <Link href={`${link}`}>
      <button className={buttonStyles[variant]}>
        <div className={buttonInnerStyles[variant]}>
          <span className="pr-3">{text}</span>
          <Icon
            icon={iconStr ? iconStr : "fa:long-arrow-right"}
            inline={true}
            color={variant === "primary" ? "white" : "#8b3479"}
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
  variant = "primary",
}: {
  text: string;
  iconStr?: string;
  link: string;
  query: string;
  variant?: "primary" | "outline";
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
      <button className={buttonStyles[variant]}>
        <div className={buttonInnerStyles[variant]}>
          <span className="pr-3">{text}</span>
          <Icon
            icon={iconStr ? iconStr : "fa:long-arrow-right"}
            inline={true}
            color={variant === "primary" ? "white" : "#8b3479"}
          />
        </div>
      </button>
    </Link>
  );
};

//Also emits Open Graph / Twitter tags so pages shared on Facebook, WhatsApp
//and the like show a proper photo and description. Pass image (e.g. the
//animal's photo) to override the default site image.
export const HeadTag = ({
  title,
  metaContent,
  linkHref,
  image,
}: {
  title: string;
  metaContent: string;
  linkHref: string;
  image?: string;
}) => {
  const url = linkHref.startsWith("http") ? linkHref : `${server}${linkHref}`;
  const shareImage = image
    ? image.startsWith("http")
      ? image
      : `${server}${image}`
    : `${server}/HeroDogCat.jpg`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaContent} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bright Eyes Animal Sanctuary" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaContent} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={shareImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaContent} />
      <meta name="twitter:image" content={shareImage} />
    </Head>
  );
};

export const DonationComponent = ({ petName }: { petName?: string }) => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-brand-100 p-8 sm:p-10 lg:grid-cols-[auto,1fr,auto]">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand">
          <Icon icon="bx:donate-heart" color="#ffffff" width="48" height="48" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-brand-deep sm:text-3xl font-poppins">
            {petName
              ? `Help more animals like ${petName}`
              : "Want to make a donation?"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700 sm:text-base font-poppins">
            Your donation helps us provide food, shelter, medical care and love
            to animals in need. We receive no government funding and rely purely
            on the generosity of the public to continue our work.
          </p>
          <Button
            text="Donate Now"
            iconStr="ant-design:heart-filled"
            link={`/donate`}
          />
        </div>
        <div className="relative hidden h-48 w-48 overflow-hidden rounded-full lg:block">
          <Image
            src="/TabbyCatBlanket.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export const ContactUsSection = ({
  eyebrow = "Get in touch",
  title = "We'd love to hear from you",
  text = "Have a question or want to get involved? Send us a message and we'll get back to you.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) => {
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
    <section id="contact" className="bg-gray-50 py-16">
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-center gap-10 lg:grid-cols-[0.9fr,1.1fr]">
        <div>
          <SectionEyebrow text={eyebrow} />
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
            {title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-brand">
              {title.split(" ").slice(-2).join(" ")}
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-gray-600 font-poppins">
            {text}
          </p>

          <div className="mt-8 flex flex-col gap-4 text-sm text-gray-700 font-poppins">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <Icon icon="akar-icons:envelope" color="#8b3479" width="18" />
              </span>
              brighteyes.sanctuary@btinternet.com
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <Icon icon="carbon:phone-voice" color="#8b3479" width="18" />
              </span>
              028 66 720078
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <Icon icon="akar-icons:location" color="#8b3479" width="18" />
              </span>
              53 Killymittan Road, BT94 2FW, Ballinamallard
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                <Icon
                  icon="clarity:alarm-clock-line"
                  color="#8b3479"
                  width="18"
                />
              </span>
              Mon &#8211; Sun: 12:00 &#8211; 15:00
            </div>
          </div>

          <div className="mt-8 hidden w-72 overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/60 lg:block">
            <Image
              src="/home.jpg"
              alt="Two Bright Eyes dogs in their winter jumpers"
              width={600}
              height={600}
              className="rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

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
          {({ handleSubmit }) => (
            <div className="flex w-full flex-col items-start rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/60 sm:p-8">
              <div className="grid w-full gap-x-4 sm:grid-cols-2">
                <InputTextFieldWithLabelFormik
                  labelText={"Name"}
                  forNameId={"aboutQuestions.name"}
                  labelLeftAligned={true}
                  wrapperClassN="flex w-full flex-col justify-end mb-4"
                >
                  <ErrorFormik
                    field="name"
                    parent={"aboutQuestions"}
                    id={"err-name"}
                  />
                </InputTextFieldWithLabelFormik>

                <InputTextFieldWithLabelFormik
                  labelText={"Email"}
                  forNameId={"aboutQuestions.email"}
                  labelLeftAligned={true}
                  wrapperClassN="flex w-full flex-col justify-end mb-4"
                >
                  <ErrorFormik
                    field="email"
                    parent={"aboutQuestions"}
                    id={"err-email"}
                  />
                </InputTextFieldWithLabelFormik>
              </div>

              <div className="w-full">
                <InputTextAreaFormik
                  labelText={"Message"}
                  forNameId={"message"}
                  fieldclassN="border border-gray-300 text-gray-900 text-sm font-poppins rounded-xl focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none block w-full h-44 p-3 mb-4"
                  labelclassN="block mb-1.5 text-sm font-medium font-poppins text-gray-800 text-left"
                >
                  <ErrorFormik field="message" id={"err-message"} />
                </InputTextAreaFormik>
              </div>
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
      </div>
    </section>
  );
};

export let submittingButtonIcon = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2"
    >
      <svg className="w-6 h-6 animate-spin stroke-white" viewBox="0 0 256 256">
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
      <span className="text-xs font-medium text-white-500">Submitting...</span>
    </div>
  );
};

export const ShowButtonTextOnSubmit = ({
  loading,
  isSuccess,
  buttonText,
  submitHandler,
  animalName,
}: {
  loading: boolean;
  isSuccess: boolean;
  buttonText: string;
  submitHandler: any;
  animalName: string;
}) => {
  return loading ? (
    <button
      type="submit"
      className="flex p-3.5 mb-2 mt-2 rounded-full w-56 bg-brand text-white justify-center font-poppins text-sm font-medium"
      onClick={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      {submittingButtonIcon()}
    </button>
  ) : isSuccess ? (
    <button
      type="submit"
      className="flex items-center gap-2 p-3.5 mb-2 mt-2 rounded-full w-56 border-2 border-green-600 bg-green-50 cursor-default text-green-700 justify-center font-poppins text-sm font-semibold"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Icon icon="akar-icons:circle-check-fill" width="18" height="18" />
      {animalName ? `Submitted ${animalName}` : "Submitted"}
    </button>
  ) : (
    <button
      type="submit"
      className="flex p-3.5 mb-2 mt-2 rounded-full w-56 bg-brand text-white justify-center transition hover:bg-brand-dark font-poppins text-sm font-medium"
      onClick={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      {buttonText}
    </button>
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
