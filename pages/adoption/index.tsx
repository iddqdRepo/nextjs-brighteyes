import React from "react";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  AdoptionCardSection,
  AdoptionCriteriaSection,
  AdoptionHeroSection,
  PerfectMatchSection,
} from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Adoption() {
  return (
    <>
      <HeadTag
        title={"Find your perfect companion - Bright Eyes Animal Sanctuary"}
        metaContent={
          "View our animals up for adoption and find your perfect companion."
        }
        linkHref={"/adoption"}
      />
      <NavbarComponent />
      <AdoptionHeroSection />
      <AdoptionCriteriaSection />
      <AdoptionCardSection />
      <PerfectMatchSection />
      <FooterSection />
    </>
  );
}

export default Adoption;
