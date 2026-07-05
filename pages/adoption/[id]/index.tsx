import React from "react";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import {
  DonationComponent,
  FooterSection,
  HeadTag,
} from "../../../components/common/CommonComponents";
import { PetInterface } from "../../../interfaces/interfaces";
import {
  AdoptionRulesSection,
  AnimalDetailSection,
  OtherPetsSection,
} from "../../../components/LayoutComponents/Animal/AnimalLayout";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";

function Animal({ animal }: { animal: [PetInterface] }) {
  return (
    <>
      <HeadTag
        title={`Meet ${animal[0].name} - Bright Eyes Animal Sanctuary`}
        metaContent={`${animal[0].name} is looking for a loving forever home. Could you be their perfect match?`}
        linkHref={`/adoption/${animal[0]._id}`}
      />
      <NavbarComponent />
      <AnimalDetailSection animal={animal[0]} />
      <DonationComponent petName={animal[0].name} />
      <AdoptionRulesSection />
      <OtherPetsSection currentId={animal[0]._id ?? ""} />
      <FooterSection />
    </>
  );
}

export default Animal;

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find({ adopted: "No" });
  const paths = data.map((obj) => {
    return {
      params: {
        id: obj._id.toString(),
      },
    };
  });

  return {
    paths, //paths which is the same as paths:paths
    fallback: "blocking",
  };
}

export async function getStaticProps(context: { params: { id: any } }) {
  dbConnect();
  const ids = context.params.id;
  // Find and return the page to be rendered (in this case, with the correct slug that we used to build the paths)
  const dataTemp = await petModel.find({ _id: ids }).lean();
  const data = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.createdAt) {
      doc.createdAt = doc.createdAt.toString();
    }
    if (doc.updatedAt) {
      doc.updatedAt = doc.updatedAt.toString();
    }
    return doc;
  });

  return {
    props: {
      animal: data,
    },
    revalidate: 10, // In seconds
  };
}
