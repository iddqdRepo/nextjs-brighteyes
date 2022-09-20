import React from "react";
import {
  DashedTitle,
  FooterSection,
} from "../../components/common/CommonComponents";
import { FormCardSection } from "../../components/FormLayout/FormLayout";

function Forms() {
  return (
    <>
      <DashedTitle text={"Forms"} />
      <FormCardSection />
      <FooterSection />
    </>
  );
}

export default Forms;
