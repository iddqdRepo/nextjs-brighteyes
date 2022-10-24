import React from "react";
import {
  DashedTitle,
  FooterSection,
} from "../../components/common/CommonComponents";
import { FormCardSection } from "../../components/FormPageLayout/FormPageLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Forms() {
  return (
    <>
      <NavbarComponent />
      <DashedTitle text={"Forms"} />
      <FormCardSection />
      <FooterSection />
    </>
  );
}

export default Forms;
