import { Button, DashedTitle } from "../../common/CommonComponents";
import {
  AdoptionCard,
  AdoptionIconContainer,
  IconText,
} from "./AdoptionLayoutComponents";

interface animalInterface {
  _id: string;
  type: string;
  name: string;
  age: string;
  yearsOrMonths: string;
  breed: string;
  size: string;
  image: string;
  suitableForChildren: string;
  suitableForAnimals: string;
  adopted: string;
  desc: string;
}
export const AdoptionCardSection = ({ pets }: { pets: animalInterface[] }) => {
  return (
    <>
      <DashedTitle text={"Animals For Adoption"} />
      <div className="flex justify-center w-full mt-20 mb-20">
        <button className="mr-5 flex rounded-full justify-center items-center bg-[#8b3479] max-w-fit mt-5 hover:shadow-inner">
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">All</span>
          </div>
        </button>
        <button className="mr-5 flex rounded-full justify-center items-center bg-[#c0c0c0] max-w-fit mt-5 hover:shadow-inner">
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Dogs</span>
          </div>
        </button>
        <button className="flex rounded-full justify-center items-center bg-[#c0c0c0] max-w-fit mt-5 hover:shadow-inner">
          <div className="flex items-center justify-center pt-4 pb-4 text-sm font-normal text-white pr-9 pl-9 font-poppins">
            <span className="">Cats</span>
          </div>
        </button>
      </div>

      <div className="flex justify-center w-full">
        <div className="flex flex-wrap justify-center w-full lg:w-11/12 2xl:w-9/12">
          {pets.map((pet) => {
            return (
              <AdoptionCard
                key={pet.name + pet.breed}
                name={pet.name}
                type={pet.breed}
                age={`${pet.age} ${pet.yearsOrMonths}`}
                sex={"temp"}
                image={pet.image}
              />
            );
          })}
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
        <Button text={"Adoption Form"} />
      </div>
    </>
  );
};
