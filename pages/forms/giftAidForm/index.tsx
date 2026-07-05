import { Formik } from "formik";
import { useState } from "react";
import {
  FooterSection,
  HeadTag,
  SectionEyebrow,
  ShowButtonTextOnSubmit,
} from "../../../components/common/CommonComponents";
import { FormikFormContainer } from "../../../components/IndividualFormLayout/CommonFormComponents";
import {
  AboutYouSection,
  GiftAidSection,
} from "../../../components/IndividualFormLayout/GiftAidFormLayout";
import { NeedHelpCard } from "../../../components/IndividualFormLayout/AdoptionFormLayout";
import {
  FormInfoCard,
  FormStepsCard,
} from "../../../components/IndividualFormLayout/FormSideCards";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { postGiftAidForm } from "../../../routes/formRoutes";
import { giftAidInitialValues } from "../../../utils/formik/giftAidInitialValues";
import { GiftAidSchema } from "../../../utils/yup/giftAidYupSchema";

const GIFT_AID_STEPS = [
  {
    icon: "mdi:file-document-edit-outline",
    title: "1. Fill in this form",
    text: "Complete your Gift Aid declaration below — it only takes a minute.",
  },
  {
    icon: "carbon:currency-pound",
    title: "2. We claim from HMRC",
    text: "Bright Eyes reclaims 25p for every £1 you have donated.",
  },
  {
    icon: "mdi:heart-outline",
    title: "3. Your kindness goes further",
    text: "The extra comes from HMRC — it doesn't cost you a penny.",
  },
];

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");
  return (
    <>
      <HeadTag
        title={"Gift Aid form - Bright Eyes Animal Sanctuary"}
        metaContent={"Gift Aid form for Bright Eyes Animal Sanctuary."}
        linkHref={"/forms/giftAidForm"}
      />
      <NavbarComponent />

      <section className="bg-gradient-to-br from-brand-50 via-white to-white">
        <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10 lg:py-14">
          <SectionEyebrow text="Boost your donation" />
          <h1 className="text-4xl font-semibold text-gray-900 sm:text-5xl font-poppins">
            Gift Aid <span className="text-brand">Form</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 font-poppins">
            If you&apos;re a UK taxpayer, Gift Aid lets Bright Eyes reclaim 25p
            for every &pound;1 you donate &#8212; at no extra cost to you.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-start gap-8 pb-16 pt-4 xl:grid-cols-[minmax(0,1fr),21rem]">
        <form className="flex w-full flex-col items-center justify-center">
          <Formik
            initialValues={giftAidInitialValues}
            validationSchema={GiftAidSchema}
            onSubmit={async (data) => {
              if (data.giftAidFuture) {
                data.giftAidFuture = data.giftAidFuture[0];
              }
              if (data.giftAidPast) {
                data.giftAidPast = data.giftAidPast[0];
              }
              setLoading(true);
              let successful = await postGiftAidForm(data);
              if (successful.success) {
                setLoading(false);
                setIsSuccess(true);
              } else {
                setLoading(false);
                setIsSuccess(false);
                setButtonText("ERROR, try again");
              }
            }}
          >
            {({ values, handleSubmit }) => (
              <FormikFormContainer>
                <AboutYouSection values={values} />
                <GiftAidSection />
                <ShowButtonTextOnSubmit
                  loading={loading}
                  isSuccess={isSuccess}
                  buttonText={buttonText}
                  submitHandler={handleSubmit}
                  animalName={"form"}
                />
              </FormikFormContainer>
            )}
          </Formik>
        </form>

        <aside className="flex w-full flex-col gap-6 xl:sticky xl:top-24">
          <FormStepsCard title="How Gift Aid works" steps={GIFT_AID_STEPS} />
          <FormInfoCard
            title="Am I eligible?"
            intro="You can Gift Aid your donations if:"
            items={[
              "You are a UK taxpayer",
              "You pay enough Income or Capital Gains Tax to cover the 25p per £1 we reclaim",
              "The donations are your own money",
            ]}
          />
          <NeedHelpCard text="Not sure whether Gift Aid applies to you? Just ask — we're happy to help." />
        </aside>
      </div>

      <FooterSection />
    </>
  );
};

export default Index;
