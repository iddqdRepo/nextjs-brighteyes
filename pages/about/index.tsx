import React from "react";
import {
  FooterSection,
  DonationComponent,
  HeadTag,
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
      <HeadTag
        title={"About Bright Eyes"}
        metaContent={
          "Bright Eyes Animal Sanctuary based in Co.Fermanagh, Northern Ireland"
        }
        linkHref={"/about"}
      />
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
