import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export interface AnimalCardData {
  _id: string;
  type: string;
  name: string;
  age: string;
  sex?: string;
  yearsOrMonths: string;
  breed: string;
  size: string;
  image: string;
  suitableForChildren: string;
  suitableForAnimals: string;
  adopted: string;
  desc: string;
}

export const ADOPTION_CRITERIA = [
  { icon: "mdi:fence", label: "Enclosed Garden" },
  { icon: "mdi:home-heart", label: "Sleeping Indoors" },
  { icon: "mdi:home-search-outline", label: "Home Check" },
  { icon: "mdi:file-document-edit-outline", label: "Form Required" },
  { icon: "mdi:key-outline", label: "Landlord Permission" },
  { icon: "mdi:heart-plus-outline", label: "Pets Must Be Neutered" },
];

export const CriteriaItem = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 px-2 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-200 bg-white">
        <Icon icon={icon} color="#8b3479" width="30" height="30" />
      </div>
      <span className="text-sm font-medium leading-5 text-gray-800 font-poppins">
        {label}
      </span>
    </div>
  );
};

export const CriteriaTick = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand">
        <Icon color="#ffffff" icon="charm:circle-tick" width="18" height="18" />
      </div>
      <span className="text-sm font-medium text-gray-800 sm:text-base font-poppins">
        {label}
      </span>
    </div>
  );
};

export const FilterChip = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-2.5 text-sm font-medium transition font-poppins ${
        selected
          ? "bg-brand text-white shadow-lg shadow-brand/25"
          : "border border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
};

// Shows the full photo un-cropped whatever its aspect ratio; a blurred copy
// of the same photo fills the frame behind it so there are no empty bars.
// Admin-uploaded photos vary wildly in shape, so never crop with bg-cover.
export const PetPhoto = ({
  image,
  className,
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className ? className : ""}`}>
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-lg"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div
        className="relative h-full w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${image}")` }}
      />
    </div>
  );
};

export const AnimalCard = ({ pet }: { pet: AnimalCardData }) => {
  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/adoption/${pet._id}`}>
        <a className="flex h-full flex-col">
          <PetPhoto image={pet.image} className="h-56 w-full" />
          <div className="flex grow flex-col p-4">
            <span className="text-lg font-semibold text-gray-900 font-poppins">
              {pet.name}
            </span>
            <span className="text-sm font-medium text-brand font-poppins">
              {pet.breed}
            </span>
            <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-sm text-gray-600 font-roboto">
              <span className="flex items-center gap-1.5">
                <Icon icon="akar-icons:cake" inline={true} color="#8b3479" />
                {pet.age} {pet.yearsOrMonths}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon
                  icon="bi:gender-ambiguous"
                  inline={true}
                  color="#8b3479"
                />
                {pet.sex ? pet.sex : "N/A"}
              </span>
            </div>
            <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand py-2 text-sm font-medium text-brand transition group-hover:bg-brand group-hover:text-white font-poppins">
              Meet {pet.name}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
};
