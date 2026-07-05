import { Icon } from "@iconify/react";
import Link from "next/link";
import { ADOPTION_CRITERIA } from "../LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";
import { FieldSet } from "./CommonFormComponents";

const ADOPTION_PROCESS_STEPS = [
  {
    icon: "mdi:file-document-edit-outline",
    title: "1. Submit Application",
    text: "Complete the form so we can learn about you and your home.",
  },
  {
    icon: "mdi:magnify",
    title: "2. Application Review",
    text: "We review your application and may be in touch for more details.",
  },
  {
    icon: "mdi:paw",
    title: "3. Meet Your Match",
    text: "If it's a good match, we'll arrange for you to meet the animal.",
  },
  {
    icon: "mdi:home-search-outline",
    title: "4. Home Check",
    text: "A volunteer may visit your home to ensure it's the right fit.",
  },
  {
    icon: "mdi:heart-outline",
    title: "5. Adoption Day",
    text: "Welcome your new best friend home and start your journey!",
  },
];

export const AdoptionProcessCard = () => {
  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/60">
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        Our Adoption Process
      </h2>
      <div className="mt-4 flex flex-col">
        {ADOPTION_PROCESS_STEPS.map((step, index) => (
          <div key={step.title}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <Icon icon={step.icon} color="#8b3479" width="20" height="20" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 font-poppins">
                  {step.title}
                </div>
                <p className="mt-0.5 text-xs leading-5 text-gray-600 font-poppins">
                  {step.text}
                </p>
              </div>
            </div>
            {index < ADOPTION_PROCESS_STEPS.length - 1 && (
              <div className="my-1.5 ml-5 h-4 border-l-2 border-dashed border-brand-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdoptionCriteriaCard = ({ type }: { type: string }) => {
  return (
    <div className="w-full rounded-3xl bg-cream-deep p-6">
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        Adoption Criteria
      </h2>
      <p className="mt-1 text-xs leading-5 text-gray-600 font-poppins">
        To adopt a {type === "Cat" ? "cat" : "dog"} from Bright Eyes, you must
        meet the following criteria:
      </p>
      <div className="mt-4 flex flex-col gap-2.5">
        {ADOPTION_CRITERIA.map((criteria) => (
          <div key={criteria.label} className="flex items-center gap-2.5">
            <Icon
              className="shrink-0"
              icon="charm:circle-tick"
              color="#8b3479"
              width="18"
              height="18"
            />
            <span className="text-sm font-medium text-gray-800 font-poppins">
              {criteria.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NeedHelpCard = ({
  text = "Our team is here to support you through the adoption process.",
}: {
  text?: string;
}) => {
  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/60">
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        Need help?
      </h2>
      <p className="mt-1 text-xs leading-5 text-gray-600 font-poppins">
        {text}
      </p>
      <div className="mt-4 flex flex-col gap-3 text-sm text-gray-700 font-poppins">
        <div className="flex items-center gap-2.5">
          <Icon icon="carbon:phone-voice" color="#8b3479" width="18" />
          028 66 720078
        </div>
        <div className="flex items-start gap-2.5 break-all">
          <Icon
            className="mt-0.5 shrink-0"
            icon="akar-icons:envelope"
            color="#8b3479"
            width="18"
          />
          brighteyes.sanctuary@btinternet.com
        </div>
      </div>
      <Link href="/#contact">
        <a className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand py-2.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white font-poppins">
          Contact Us
          <Icon icon="foundation:paw" width="14" />
        </a>
      </Link>
    </div>
  );
};

export const LegalAgreementSection = ({ type }: { type: string }) => {
  const animalType = type === "Dog" ? "dog" : "cat";
  return (
    <FieldSet legendText={"5. Legal Agreement"}>
      <ul className="flex flex-col text-left">
        <span className="mb-5 font-medium text-left text-gray-900 font-poppins">
          By submitting this form you understand and agree to the following:
        </span>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that the {animalType} will be rehomed to me as a house
          pet and is not to be kept closed in a kennel or shed, the {animalType}{" "}
          will NOT be chained up outside.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          The {animalType} is being rehomed to me as a companion, not as a guard
          animal or for fighting or breeding purposes
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          Bright Eyes Animal Sanctuary will at all times retain ownership of the{" "}
          {animalType}, and reserve the right to reclaim it if they feel the{" "}
          {animalType} is not being fed, housed or cared for to their
          satisfaction.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          Should I wish to no longer care for the {animalType} I will return it
          to Bright Eyes Animal Sanctuary. I will not sell, give away or dispose
          of the {animalType} in any other way. The {animalType} may only be
          “Put to Sleep” on the advice of a qualified vet, and Bright Eyes
          Animal Sanctuary must be notified in Advance.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that when I&apos;m away on holiday, I will need to place
          the {animalType} in registered kennels or cattery, or arrange for the{" "}
          {animalType} to be looked after by a responsible adult.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that all {animalType}&apos;s leaving Bright Eyes Animal
          Sanctuary must be neutered. Where the {animalType} has been rehomed
          but is not neutered I agree that I will return the {animalType} to be
          neutered or undertake to ensure that the neutering is carried out by a
          fully qualified vet.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that full liability for any veterinary fees, or costs
          arising from any incident, damages or injury incurred at any future
          date will be mine and remain mine while I am responsible for the{" "}
          {animalType}.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that although Bright Eyes Animal Sanctuary tells me
          everything they know about the {animalType}, they do not always have a
          complete history and therefore cannot guarantee behaviour etc.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I confirm that Bright Eyes Animal Sanctuary may contact my landlord to
          confirm that my tenancy agreement allows pets.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I confirm that Bright Eyes Animal Sanctuary may contact my Vet to
          confirm that I am a responsible owner.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          I understand that I must bring valid photographic I.D. when collecting
          the {animalType} I am rehoming.
        </li>
        <li className="mb-2 ml-5 text-sm font-normal leading-6 text-left text-gray-700 list-disc font-roboto">
          A MINIMUM REHOMING DONATION OF £{type === "Dog" ? 200 : 50} IS
          REQUESTED.
        </li>
      </ul>
    </FieldSet>
  );
};
