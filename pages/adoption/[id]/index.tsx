/* eslint-disable @next/next/no-img-element */
import React from "react";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import {
  DonationComponent,
  FooterSection,
} from "../../../components/common/CommonComponents";
import { PetInterface } from "../../../interfaces/interfaces";
import {
  AdoptionRulesSection,
  AnimalDetailSection,
  HeroBannerSection,
} from "../../../components/LayoutComponents/Animal/AnimalLayout";
import { Divider } from "../../../components/LayoutComponents/Animal/AnimalLayoutComponents";
import NavbarComponent from "../../../components/Navbar/NavbarComponent";

function Animal({ animal }: { animal: [PetInterface] }) {
  return (
    <>
      <NavbarComponent />

      <HeroBannerSection name={animal[0].name} />
      <AnimalDetailSection animal={animal[0]} />
      <Divider />
      <DonationComponent />
      <AdoptionRulesSection />
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
    revalidate: 10,
  };
}
