import { Formik } from "formik";
import { useState } from "react";
import {
  FooterSection,
  HeadTag,
  SectionEyebrow,
  ShowButtonTextOnSubmit,
} from "../../../components/common/CommonComponents";
import {
  FormikFormContainer,
  FieldSet,
  QuestionsMap,
} from "../../../components/IndividualFormLayout/CommonFormComponents";
import { NeedHelpCard } from "../../../components/IndividualFormLayout/AdoptionFormLayout";
import {
  FormInfoCard,
  FormStepsCard,
} from "../../../components/IndividualFormLayout/FormSideCards";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";
import { postVolunteerForm } from "../../../routes/formRoutes";
import { volunteerFormBuilder } from "../../../utils/formik/volunteerFormBuilder";
import { volunteerInitialValues } from "../../../utils/formik/volunteerInitialValues";
import { VolunteerSchema } from "../../../utils/yup/volunteerYupSchema";

const VOLUNTEER_STEPS = [
  {
    icon: "mdi:file-document-edit-outline",
    title: "1. Submit the form",
    text: "Tell us a bit about yourself and how you'd like to help.",
  },
  {
    icon: "akar-icons:envelope",
    title: "2. We'll be in touch",
    text: "The team reads every form and will contact you for a chat.",
  },
  {
    icon: "mdi:paw",
    title: "3. Start helping animals",
    text: "Join the volunteers who keep Bright Eyes running every day.",
  },
];

function Index() {
  const [toShow, setToShow] = useState(volunteerFormBuilder);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Form");
  return (
    <>
      <HeadTag
        title={"Volunteer form - Bright Eyes Animal Sanctuary"}
        metaContent={"Volunteer form for Bright Eyes Animal Sanctuary."}
        linkHref={"/forms/volunteerForm"}
      />
      <NavbarComponent />

      <section className="bg-gradient-to-br from-brand-50 via-white to-white">
        <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10 lg:py-14">
          <SectionEyebrow text="Join the team" />
          <h1 className="text-4xl font-semibold text-gray-900 sm:text-5xl font-poppins">
            Volunteer <span className="text-brand">Form</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 font-poppins">
            Our fantastic volunteers are the backbone of Bright Eyes. Tell us a
            little about yourself below and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-start gap-8 pb-16 pt-4 xl:grid-cols-[minmax(0,1fr),21rem]">
        <div className="flex w-full flex-col items-center justify-center">
          <Formik
            initialValues={volunteerInitialValues}
            validationSchema={VolunteerSchema}
            onSubmit={async (data) => {
              setLoading(true);
              let successful = await postVolunteerForm(data);
              if (successful) {
                setLoading(false);
                setIsSuccess(true);
              } else {
                setLoading(false);
                setIsSuccess(false);
                setButtonText("ERROR, try again");
              }
            }}
            validateOnChange={true}
          >
            {({ handleSubmit }) => (
              <FormikFormContainer submitting={loading}>
                <FieldSet legendText="About you">
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"volunteer"}
                    category={"aboutQuestions"}
                  />
                </FieldSet>
                <FieldSet legendText={"Emergency Contact Infomation"}>
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"volunteer"}
                    category={"emergencyContactInfo"}
                  />
                </FieldSet>
                <FieldSet legendText="Health Questions">
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"volunteer"}
                    category={"healthInfo"}
                  />
                </FieldSet>
                <FieldSet legendText={"Volunteering Questions"}>
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"volunteer"}
                    category={"volunteeringInfo"}
                  />
                </FieldSet>
                <FieldSet legendText={"Referee Information"}>
                  <QuestionsMap
                    getUseState={toShow}
                    setUseState={setToShow}
                    typeOfForm={"volunteer"}
                    category={"refereeInfo"}
                  />
                </FieldSet>
                <FieldSet legendText={"Rehabilitation of Offenders Act 1974"}>
                  <div className="flex ">
                    <QuestionsMap
                      getUseState={toShow}
                      setUseState={setToShow}
                      typeOfForm={"volunteer"}
                      category={"offenderInfo"}
                    />
                  </div>
                </FieldSet>
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
        </div>

        <aside className="flex w-full flex-col gap-6 xl:sticky xl:top-24">
          <FormStepsCard title="What happens next" steps={VOLUNTEER_STEPS} />
          <FormInfoCard
            title="Good to know"
            items={[
              "You must be over 16 to volunteer",
              "Tell us what kind of work interests you — every bit helps",
              "We'll ask for an emergency contact and a referee",
            ]}
          />
          <NeedHelpCard text="Questions about volunteering? Get in touch and we'll talk it through." />
        </aside>
      </div>

      <FooterSection />
    </>
  );
}

export default Index;
