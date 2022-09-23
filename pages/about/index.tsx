import React from "react";
import {
  FooterSection,
  DonationComponent,
} from "../../components/common/CommonComponents";
import {
  AboutPatSection,
  AboutBrightEyesSection,
  InterviewSection,
} from "../../components/LayoutComponents/AboutLayout/AboutLayout";

function About() {
  return (
    <>
      <AboutPatSection />
      <AboutBrightEyesSection />
      <InterviewSection />
      <DonationComponent />
      <FooterSection />
    </>
  );
}

export default About;
