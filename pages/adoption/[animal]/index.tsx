/* eslint-disable @next/next/no-img-element */

import React from "react";
import petModel from "../../../models/petModel";
import dbConnect from "../../../utils/dbConnect";
import { Icon } from "@iconify/react";
import {
  Button,
  DashedTitle,
  FooterSection,
} from "../../../components/common/CommonComponents";
import {
  AdoptionIconContainer,
  IconText,
} from "../../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";

function Animal({ animal }: { animal: any }) {
  console.log(animal[0]);
  const {
    name,
    age,
    sex,
    adopted,
    yearsOrMonths,
    image,
    breed,
    size,
    desc,
    suitableForAnimals,
    suitableForChildren,
  } = animal[0];
  const HeroBanner = () => {
    return (
      <div className="flex flex-col items-center mb-20">
        <div className="flex flex-col-reverse items-center justify-center w-5/6 xl:flex-row h-2/4">
          <div className=" basis-1/3">
            <div className=" pb-7 pt-3  text-[#8b3479] text-3xl font-normal font-poppins md:text-5xl">
              Meet {name}
            </div>
          </div>

          <div className="flex justify-center basis-1/3">
            <img
              className="w-4/5 bg-center bg-no-repeat sm:w-2/5 xl:w-auto xl:h-4/5 rounded-xl"
              src="/MeetBioSmall.png"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeroBanner />
      <div className="flex flex-col items-center mb-20 h-fit">
        <div className="flex flex-col items-center justify-center w-full xl:w-5/6 lg:flex-row ">
          <div className="flex justify-center w-full p-5 md:w-3/6 md:p-0">
            <div
              className="bg-no-repeat bg-cover w-100 h-100 2xl:w-120 rounded-xl 2xl:h-120"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            ></div>
          </div>
          <div className="flex flex-col items-start w-full h-full p-5 md:w-3/6 md:p-0">
            <div className="pt-3 pb-2 text-3xl font-normal font-poppins md:text-3xl">
              Name: <span className="text-[#8b3479]"> {name}</span>
            </div>
            <div className="pt-3 font-normal text-md pb-7 font-poppins md:text-xl">
              <span className="text-[#8b3479]"> {breed}</span>
            </div>

            <div className="flex items-center pb-3 text-sm font-normal lg:text-lg xl:text-xl xl:ml-10 font-poppins">
              {suitableForChildren ? (
                <Icon icon="typcn:tick" color="#8b3479" />
              ) : (
                <Icon icon="bi:x" color="#8b3479" />
              )}
              &nbsp; Suitable for Children &nbsp; &nbsp;
              {suitableForAnimals ? (
                <Icon icon="typcn:tick" color="#8b3479" />
              ) : (
                <Icon icon="bi:x" color="#8b3479" />
              )}
              &nbsp; Suitable for Animals
            </div>
            <div className="flex w-full">
              <div className="flex justify-between w-full lg:w-4/6">
                <div className="flex flex-col">
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">Sex:&nbsp;</span>
                    {sex ? sex : "Unknown"}
                  </div>
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">Age:&nbsp;</span>
                    {age}&nbsp;
                    {yearsOrMonths}
                  </div>
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">
                      {sex === "Female" ? "Spayed" : "Neutered"}:&nbsp;
                    </span>
                    Yes
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">Size:&nbsp;</span>
                    {size}
                  </div>
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">Adopted:&nbsp;</span>
                    {adopted}
                  </div>
                  <div className="pt-3 text-sm font-normal font-poppins md:text-lg">
                    <span className="font-semibold">Vaccinated:&nbsp;</span>
                    Yes
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10 text-xl font-light font-poppins">{desc}</div>
            <Button text={"View Form"} />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-5/6 border border-b-1 border-b-slate-200"></div>
      </div>
      <DashedTitle text={"Adoption Rules"} />
      <div className="flex justify-center w-full mb-20">
        <div className="w-5/6 h-fit bg-[#FEF4DF]">
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full sm:w-9/12 xl:w-4/6">
              <div className="flex flex-row justify-between w-full pt-5">
                <AdoptionIconContainer>
                  <IconText text="Enclosed Garden" />
                  <IconText text="Sleeping Indoors" />
                  <IconText text="Landlord Permission" />
                </AdoptionIconContainer>
                <AdoptionIconContainer>
                  <IconText text="Children 12+" />
                  <IconText text="Home Check" />
                  <IconText text="Form Required" />
                </AdoptionIconContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

export default Animal;

export async function getStaticPaths() {
  dbConnect();
  const data = await petModel.find({ adopted: "No" });
  console.log("data", data.length);
  //mapping through to create an array of the paths
  const paths = data.map((obj) => {
    console.log(obj.name);
    return {
      params: {
        animal: obj.name.toString().trim(),
      },
    };
  });

  console.log("PATHS", paths);
  //returning paths to tell Next to build pages in the paths array
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

  // console.log("dataTemp = ", dataTemp);
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
