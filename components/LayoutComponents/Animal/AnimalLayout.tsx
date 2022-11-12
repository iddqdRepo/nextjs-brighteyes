/* eslint-disable @next/next/no-img-element */
import { DetailContainer } from "./AnimalLayoutComponents";
import { Icon } from "@iconify/react";
import { PetInterface } from "../../../interfaces/interfaces";
import { Button, DashedTitle } from "../../common/CommonComponents";
import {
  AdoptionIconContainer,
  IconText,
} from "../AdoptionLayout/AdoptionLayoutComponents";

export const HeroBannerSection = ({ name }: { name: string }) => {
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

export const AnimalDetailSection = ({ animal }: { animal: PetInterface }) => {
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
  } = animal;
  return (
    <>
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
                  <DetailContainer text="Sex">
                    {sex ? sex : "Unknown"}
                  </DetailContainer>
                  <DetailContainer text="Age">
                    {age}&nbsp;
                    {yearsOrMonths}
                  </DetailContainer>
                  <DetailContainer
                    text={sex === "Female" ? "Spayed" : "Neutered"}
                  >
                    Yes
                  </DetailContainer>
                </div>
                <div className="flex flex-col">
                  <DetailContainer text="Size">{size}</DetailContainer>
                  <DetailContainer text="Adopted">{adopted}</DetailContainer>
                  <DetailContainer text="Vaccinated">Yes</DetailContainer>
                </div>
              </div>
            </div>
            <div className="pt-10 text-xl font-light font-poppins">{desc}</div>
            <Button text={"View Form"} link="" />
          </div>
        </div>
      </div>
    </>
  );
};

export const AdoptionRulesSection = () => {
  return (
    <>
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
    </>
  );
};
