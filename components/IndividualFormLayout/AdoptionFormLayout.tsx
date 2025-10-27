import { FieldSet } from "./CommonFormComponents";

export const LegalAgreementSection = ({ type }: { type: string }) => {
  const animalType = type === "Dog" ? "dog" : "cat";
  return (
    <FieldSet legendText={"Legal Agreement"}>
      <ul className="flex flex-col ">
        <span className="mb-5 font-medium text-gray-900 font-poppins">
          By submitting this form you understand and agree to the following:
        </span>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that the {animalType} will be rehomed to me as a house
          pet and is not to be kept closed in a kennel or shed, the {animalType}{" "}
          will NOT be chained up outside.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          The {animalType} is being rehomed to me as a companion, not as a guard
          animal or for fighting or breeding purposes
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Bright Eyes Animal Sanctuary will at all times retain ownership of the{" "}
          {animalType}, and reserve the right to reclaim it if they feel the{" "}
          {animalType} is not being fed, housed or cared for to their
          satisfaction.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          Should I wish to no longer care for the {animalType} I will return it
          to Bright Eyes Animal Sanctuary. I will not sell, give away or dispose
          of the {animalType} in any other way. The {animalType} may only be
          “Put to Sleep” on the advice of a qualified vet, and Bright Eyes
          Animal Sanctuary must be notified in Advance.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that when I&apos;m away on holiday, I will need to place
          the {animalType} in registered kennels or cattery, or arrange for the{" "}
          {animalType} to be looked after by a responsible adult.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that all {animalType}&apos;s leaving Bright Eyes Animal
          Sanctuary must be neutered. Where the {animalType} has been rehomed
          but is not neutered I agree that I will return the {animalType} to be
          neutered or undertake to ensure that the neutering is carried out by a
          fully qualified vet.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that full liability for any veterinary fees, or costs
          arising from any incident, damages or injury incurred at any future
          date will be mine and remain mine while I am responsible for the{" "}
          {animalType}.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that although Bright Eyes Animal Sanctuary tells me
          everything they know about the {animalType}, they do not always have a
          complete history and therefore cannot guarantee behaviour etc.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I confirm that Bright Eyes Animal Sanctuary may contact my landlord to
          confirm that my tenancy agreement allows pets.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I confirm that Bright Eyes Animal Sanctuary may contact my Vet to
          confirm that I am a responsible owner.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          I understand that I must bring valid photographic I.D. when collecting
          the {animalType} I am rehoming.
        </li>
        <li className="mb-1 ml-4 font-normal text-gray-900 list-disc font-roboto">
          A MINIMUM REHOMING DONATION OF £{type === "Dog" ? 200 : 50} IS
          REQUESTED.
        </li>
      </ul>
    </FieldSet>
  );
};
