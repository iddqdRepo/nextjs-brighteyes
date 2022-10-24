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
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function About() {
  return (
    <>
      <NavbarComponent />
      <AboutPatSection />
      <AboutBrightEyesSection />
      <InterviewSection />
      <DonationComponent />
      <FooterSection />
    </>
  );
}

export default About;
