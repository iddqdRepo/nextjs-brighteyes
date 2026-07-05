import { Icon } from "@iconify/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { PetInterface } from "../../../interfaces/interfaces";
import { getAvailablePets } from "../../../routes/petRoutes";
import { Button, SectionEyebrow } from "../../common/CommonComponents";
import {
  ADOPTION_CRITERIA,
  AnimalCard,
  AnimalCardData,
  CriteriaTick,
  PetPhoto,
} from "../AdoptionLayout/AdoptionLayoutComponents";
import { DetailContainer } from "./AnimalLayoutComponents";

const SuitabilityBadge = ({
  suitable,
  label,
}: {
  suitable: boolean;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 font-poppins">
      <Icon
        icon={suitable ? "charm:circle-tick" : "bi:x-circle"}
        color={suitable ? "#8b3479" : "#9ca3af"}
        width="18"
        height="18"
      />
      {label}
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
    type,
    size,
    desc,
    suitableForAnimals,
    suitableForChildren,
  } = animal;

  return (
    <section className="overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-semibold text-brand sm:text-5xl font-poppins">
            Meet {name}
            <Icon
              icon="akar-icons:heart"
              color="#8b3479"
              width="32"
              height="32"
            />
          </h1>
          <p className="mt-3 max-w-md text-base leading-7 text-gray-600 font-poppins">
            Could you give {name} a loving forever home?
          </p>
          <PetPhoto
            image={image}
            className="mt-6 h-80 w-full rounded-[2rem] shadow-2xl shadow-brand/10 sm:h-96 lg:h-[28rem]"
          />
        </div>

        <div className="lg:pt-4">
          <h2 className="text-3xl font-semibold text-gray-900 font-poppins">
            {name}
          </h2>
          <div className="mt-1 text-lg font-medium text-brand font-poppins">
            {breed}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <SuitabilityBadge
              suitable={/yes/i.test(suitableForChildren ?? "")}
              label="Suitable for Children"
            />
            <SuitabilityBadge
              suitable={/yes/i.test(suitableForAnimals ?? "")}
              label="Suitable for Animals"
            />
          </div>

          <div className="mt-6 grid max-w-md grid-cols-2 gap-x-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col divide-y divide-gray-100">
              <DetailContainer text="Sex">
                {sex ? sex : "Unknown"}
              </DetailContainer>
              <DetailContainer text="Age">
                {age}&nbsp;
                {yearsOrMonths}
              </DetailContainer>
            </div>
            <div className="flex flex-col divide-y divide-gray-100">
              <DetailContainer text="Size">{size}</DetailContainer>
              <DetailContainer text="Adopted">{adopted}</DetailContainer>
            </div>
          </div>

          <pre className="mt-6 whitespace-pre-wrap font-poppins text-base font-light leading-7 text-gray-700">
            {desc}
          </pre>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <ButtonToForm name={name} type={type} />
            <Button
              text={`Donate to Help Pets Like ${name}`}
              iconStr="ant-design:heart-outlined"
              link={`/donate`}
              variant="outline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ButtonToForm = ({ name, type }: { name: string; type: string }) => {
  return (
    <Button
      text={`Apply to Adopt ${name}`}
      iconStr="foundation:paw"
      link={`/forms/adoptionForm?type=${type === "Cat" ? "Cat" : "Dog"}`}
    />
  );
};

export const AdoptionRulesSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10">
      <SectionEyebrow text="Before you apply" />
      <h2 className="text-3xl font-semibold text-gray-900 font-poppins">
        Adoption Criteria
      </h2>
      <div className="mt-6 rounded-[2rem] bg-cream-deep p-8 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADOPTION_CRITERIA.map((criteria) => (
            <CriteriaTick key={criteria.label} label={criteria.label} />
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-gray-600 font-poppins">
          These criteria help us ensure the best possible match for our animals
          and adopters.
        </p>
        <Link href="/adoption">
          <a className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark font-poppins">
            View full adoption criteria
            <Icon icon="fa:long-arrow-right" width="14" />
          </a>
        </Link>
      </div>
    </section>
  );
};

export const OtherPetsSection = ({ currentId }: { currentId: string }) => {
  const { isLoading, data: availablePets } = useQuery(
    "availablePets",
    getAvailablePets,
    {
      staleTime: 10000,
    }
  );

  const otherPets: AnimalCardData[] = (availablePets?.data ?? []).filter(
    (pet: AnimalCardData) => pet._id !== currentId
  );

  if (isLoading || otherPets.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] pb-16 pt-4">
      <SectionEyebrow text="Keep looking" />
      <h2 className="text-3xl font-semibold text-gray-900 font-poppins">
        Other pets you may like
      </h2>
      <div className="no-scrollbar -mx-2 mt-8 flex snap-x gap-5 overflow-x-auto px-2 pb-4">
        {otherPets.slice(0, 8).map((pet) => (
          <div key={pet._id + pet.breed} className="w-64 shrink-0 snap-start">
            <AnimalCard pet={pet} />
          </div>
        ))}
      </div>
    </section>
  );
};
