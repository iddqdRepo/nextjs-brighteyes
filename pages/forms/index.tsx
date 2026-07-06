import React from "react";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  FormCardSection,
  FormsHelpSection,
  FormsHeroSection,
  FormsInfoSection,
} from "../../components/FormPageLayout/FormPageLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Forms() {
  return (
    <>
      <HeadTag
        title={
          "Adoption, Volunteering and Gift Aid forms - Bright Eyes Animal Sanctuary"
        }
        metaContent={
          "Here are the forms for Dog and Cat Adoption, Volunteering and Gift aid for Bright Eyes"
        }
        linkHref={"/forms"}
      />
      <NavbarComponent />
      <FormsHeroSection />
      <FormCardSection />
      <FormsInfoSection />
      <FormsHelpSection />
      <FooterSection />
    </>
  );
}

export default Forms;
