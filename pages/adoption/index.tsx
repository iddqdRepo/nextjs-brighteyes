import React from "react";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  AdoptionCardSection,
  AdoptionCriteriaSection,
} from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Adoption() {
  return (
    <>
      <HeadTag
        title={"Find your perfect companion - Bright Eyes Animal Sanctuary"}
        linkHref={
          "View our animals up for adoption and find your perfect companion."
        }
        metaContent={"/adoption"}
      />
      <NavbarComponent />
      <AdoptionCriteriaSection />
      <AdoptionCardSection />
      <FooterSection />
    </>
  );
}

export default Adoption;
