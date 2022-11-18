import React from "react";
import {
  DashedTitle,
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import { FormCardSection } from "../../components/FormPageLayout/FormPageLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Forms() {
  return (
    <>
      <HeadTag
        title={"Forms"}
        metaContent={
          "Here are the forms for Dog and Cat Adoption, Volunteering and Gift aid for Bright Eyes"
        }
        linkHref={"/forms"}
      />
      <NavbarComponent />
      <DashedTitle text={"Forms"} />
      <FormCardSection />
      <FooterSection />
    </>
  );
}

export default Forms;
