import React from "react";
import { FormCard, FormCardContainer } from "./FormLayoutComponents";

export const FormCardSection = () => {
  return (
    <FormCardContainer>
      <FormCard
        icon="cil:dog"
        title="Dog Adoption Form"
        text=" Take a look at our pets for Adoption. Join the 2000+ other
        people and find the perfect pet for your home!"
        buttonText="View Form"
        query="dog"
      />
      <FormCard
        icon="cil:cat"
        title="Cat Adoption Form"
        text="We receive no government funding and rely purely on the
        generosity of the public to help us continue our work."
        buttonText="View Form"
        query="cat"
      />
      <FormCard
        icon="akar-icons:gift"
        title="Gift Aid Online Form"
        text=" Our fantastic volunteers are the backbone of Bright Eyes. Want
        to help care for the animals and earn some valuable experience?"
        buttonText="View Form"
        link="giftAidForm"
      />
      <FormCard
        icon="carbon:person-favorite"
        title="Volunteer Online Form"
        text=" Our fantastic volunteers are the backbone of Bright Eyes. Want
          to help care for the animals and earn some valuable experience?"
        buttonText="View Form"
        link="volunteerForm"
      />
    </FormCardContainer>
  );
};
