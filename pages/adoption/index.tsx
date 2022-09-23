import React from "react";
import { FooterSection } from "../../components/common/CommonComponents";
import {
  AdoptionCardSection,
  AdoptionCriteriaSection,
} from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayout";

function Adoption() {
  // interface animalInterface {
  //   _id: string;
  //   type: string;
  //   name: string;
  //   age: string;
  //   yearsOrMonths: string;
  //   breed: string;
  //   size: string;
  //   image: string;
  //   suitableForChildren: string;
  //   suitableForAnimals: string;
  //   adopted: string;
  //   desc: string;
  // }

  return (
    <>
      <AdoptionCriteriaSection />
      <AdoptionCardSection />
      <FooterSection />
    </>
  );
}

export default Adoption;
