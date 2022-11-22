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
import petModel from "../../models/petModel";
import dbConnect from "../../utils/dbConnect";

function Adoption(props: any) {
  return (
    <>
      <HeadTag
        title={"Adoption"}
        linkHref={
          "View our animals up for adoption and find your perfect companion."
        }
        metaContent={"/adoption"}
      />
      <NavbarComponent />

      <AdoptionCriteriaSection />
      <AdoptionCardSection pets={props.data} />
      <FooterSection />
    </>
  );
}

export default Adoption;

export async function getServerSideProps() {
  await dbConnect();

  const result = await petModel.find({ adopted: "No" }).lean();

  const pets = result.map((pet) => {
    pet._id = pet._id.toString();
    if (pet.createdAt) {
      pet.createdAt = pet.createdAt.toString();
    }
    if (pet.updatedAt) {
      pet.updatedAt = pet.updatedAt.toString();
    }
    return pet;
  });

  return {
    props: {
      data: pets,
    },
  };
}
