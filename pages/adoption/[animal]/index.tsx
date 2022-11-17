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
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    // console.log(obj.name);
    return {
      params: {
        animal: obj.name.toString().trim(),
      },
    };
  });

  return {
    paths, //paths which is the same as paths:paths
    fallback: false, // false = if a user tries to visit a route that doesnt exist, it shows a 404 page
  };
}

export async function getStaticProps(context: { params: { animal: any } }) {
  dbConnect();
  const animals = context.params.animal;
  // Find and return the page to be rendered (in this case, with the correct slug that we used to build the paths)
  const dataTemp = await petModel.find({ name: animals }).lean();
  const data = dataTemp.map((doc) => {
    doc._id = doc._id.toString();
    if (doc.name) {
      doc.name = doc.name.trim();
    }
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
