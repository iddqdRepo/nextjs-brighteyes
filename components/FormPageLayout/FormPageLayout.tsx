import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button, SectionEyebrow } from "../common/CommonComponents";
import {
  FormCard,
  FormCardContainer,
  FormsInfoItem,
} from "./FormLayoutComponents";

export const FormsHeroSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-center gap-10 py-12 lg:grid-cols-[1.1fr,0.9fr] lg:py-16">
        <div>
          <SectionEyebrow text="Forms & applications" />
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl font-poppins">
            All the forms you need{" "}
            <span className="text-brand">
              in one place.{" "}
              <Icon
                className="inline"
                icon="foundation:paw"
                color="#8b3479"
                width="34"
                height="34"
                inline={true}
              />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg font-poppins">
            Whether you&apos;re looking to adopt, claim Gift Aid, or volunteer
            with us, you&apos;ll find the right forms here. Thank you for
            supporting Bright Eyes Animal Sanctuary.
          </p>
        </div>
        <div className="relative hidden h-72 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand/10 lg:block">
          <Image
            src="/HeroDogCat.jpg"
            alt="A dog and cat together at Bright Eyes Animal Sanctuary"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export const FormCardSection = () => {
  return (
    <>
      <div className="mx-auto w-11/12 max-w-3xl pb-10 pt-4 text-center">
        <h2 className="flex items-center justify-center gap-4 text-3xl font-semibold text-gray-900 font-poppins">
          <span className="hidden w-10 border-b-2 border-brand sm:block"></span>
          Explore Our Forms
          <Icon icon="foundation:paw" color="#8b3479" width="24" height="24" />
          <span className="hidden w-10 border-b-2 border-brand sm:block"></span>
        </h2>
        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base font-poppins">
          Choose the form you need below and get started. Every application
          helps us continue our mission to rescue, care for, and rehome animals
          in need.
        </p>
      </div>
      <FormCardContainer>
        <FormCard
          icon="cil:dog"
          title="Dog Adoption Form"
          text="Start your adoption journey and help give a dog a loving forever home."
          buttonText="View Form"
          query="Dog"
        />
        <FormCard
          icon="cil:cat"
          title="Cat Adoption Form"
          text="Apply to adopt a cat and welcome a new companion into your home."
          buttonText="View Form"
          query="Cat"
        />
        <FormCard
          icon="akar-icons:gift"
          title="Gift Aid Online Form"
          text="Boost your donation by 25p for every £1 at no extra cost to you through Gift Aid."
          buttonText="View Form"
          link="giftAidForm"
        />
        <FormCard
          icon="carbon:person-favorite"
          title="Volunteer Online Form"
          text="Join our amazing team of volunteers and make a difference today."
          buttonText="View Form"
          link="volunteerForm"
        />
      </FormCardContainer>
    </>
  );
};

export const FormsInfoSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10">
      <div className="grid gap-8 rounded-[2rem] bg-cream-deep p-8 sm:p-10 lg:grid-cols-3">
        <FormsInfoItem
          icon="mdi:file-check-outline"
          title="Easy to Complete"
          text="All forms are simple and take just a few minutes to fill in."
        />
        <FormsInfoItem
          icon="akar-icons:envelope"
          title="What Happens Next?"
          text="We'll review your submission and be in touch via email or phone."
        />
        <FormsInfoItem
          icon="akar-icons:lock-on"
          title="Your Information is Safe"
          text="Your details are only used to process your application."
        />
      </div>
    </section>
  );
};

export const FormsHelpSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] pb-16 pt-2">
      <div className="grid items-center gap-8 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60 sm:p-10 lg:grid-cols-[1fr,auto]">
        <div>
          <h2 className="text-2xl font-semibold text-brand sm:text-3xl font-poppins">
            Need help or have a question?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base font-poppins">
            We&apos;re here to help! If you&apos;re unsure which form you need
            or run into any issues, please get in touch with our team.
          </p>
          <Button
            text="Contact Us"
            iconStr="akar-icons:envelope"
            link={`/#contact`}
          />
        </div>
        <div className="relative hidden h-48 w-48 overflow-hidden rounded-full lg:block">
          <Image
            src="/puppyDogEyes.jpg"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};
