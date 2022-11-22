import { useState, useRef } from "react";
import { getAvailablePets } from "../../../routes/petRoutes";
import {
  Button,
  DashedTitle,
  LoadingIcon,
} from "../../common/CommonComponents";
import {
  AdoptionCard,
  AdoptionIconContainer,
  IconText,
} from "./AdoptionLayoutComponents";
import { useQuery } from "react-query";

interface animalInterface {
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

export const AdoptionCardSection = () => {
  const [filter, setFilter] = useState("");
  const dogButtonRef = useRef<HTMLButtonElement | null>(null);
  const catButtonRef = useRef<HTMLButtonElement | null>(null);
  const allButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isLoading: isPetLoading, data: availablePets } = useQuery(
    "availablePets",
    getAvailablePets,
    {
      staleTime: 10000, // only eligible to refetch after 10 seconds
    }
  );

  const filterAnimals = (filter: string) => {
    const selected =
      "mr-5 flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 shadow:2xl";
    const deSelected =
      "mr-5 flex rounded-full justify-center items-center bg-[#c0c0c0] max-w-fit mt-5";
    if (dogButtonRef.current && catButtonRef.current && allButtonRef.current) {
      if (filter === "Dog") {
        setFilter("Dog");
        dogButtonRef.current.className = selected;
        catButtonRef.current.className = deSelected;
        allButtonRef.current.className = deSelected;
      }
      if (filter === "Cat") {
        setFilter("Cat");
        catButtonRef.current.className = selected;
        dogButtonRef.current.className = deSelected;
        allButtonRef.current.className = deSelected;
      }
      if (filter === "All") {
        setFilter("");
        allButtonRef.current.className = selected;
        catButtonRef.current.className = deSelected;
        dogButtonRef.current.className = deSelected;
      }
    }
  };

  return (
    <>
      <DashedTitle text={"Animals For Adoption"} />
      <div className="flex justify-center w-full mt-20 mb-20">
        <button
          onClick={() => filterAnimals("All")}
          ref={allButtonRef}
          className="mr-5 flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 shadow:2xl"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">All</span>
          </div>
        </button>
        <button
          onClick={() => filterAnimals("Dog")}
          ref={dogButtonRef}
          className="mr-5 flex rounded-full justify-center items-center bg-[#c0c0c0] max-w-fit mt-5"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Dogs</span>
          </div>
        </button>
        <button
          onClick={() => filterAnimals("Cat")}
          ref={catButtonRef}
          className="flex rounded-full justify-center items-center bg-[#c0c0c0] max-w-fit mt-5"
        >
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Cats</span>
          </div>
        </button>
      </div>

      <div className="flex justify-center w-full">
        <div className="flex flex-wrap justify-center w-full mb-10 lg:w-11/12 2xl:w-9/12">
          {!isPetLoading ? (
            availablePets.data
              .filter((animal: { type: string }) => {
                if (filter) {
                  return animal.type === filter;
                } else {
                  return animal;
                }
              })
              .map((pet: animalInterface) => {
                return (
                  <AdoptionCard
                    key={pet._id + pet.breed}
                    name={pet.name}
                    type={pet.breed}
                    age={`${pet.age} ${pet.yearsOrMonths}`}
                    sex={pet.sex ? pet.sex : "N/A"}
                    image={pet.image}
                    id={pet._id}
                  />
                );
              })
          ) : (
            <LoadingIcon />
          )}
        </div>
      </div>
    </>
  );
};

export const AdoptionCriteriaSection = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-4/6">
          <span className="pb-7 pt-3 text-[#8b3479] font-normal text-center font-poppins text-5xl">
            Adoption Criteria
          </span>
          <span className="gpb-7 pt-3 text-center text-[#8b3479] font-normal font-poppins text-xl">
            There are certain criteria that need to be met in order to adopt a
            pet from Bright Eyes, please make sure you meet the criteria before
            submitting your application.
          </span>
        </div>
      </div>
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
      <div className="flex items-center justify-center w-full mb-10">
        <Button text={"Adoption Form"} link={`/forms`} />
      </div>
    </>
  );
};
