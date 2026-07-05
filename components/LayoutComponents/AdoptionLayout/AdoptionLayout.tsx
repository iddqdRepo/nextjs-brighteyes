import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { getAvailablePets } from "../../../routes/petRoutes";
import {
  Button,
  LoadingIcon,
  SectionEyebrow,
} from "../../common/CommonComponents";
import {
  ADOPTION_CRITERIA,
  AnimalCard,
  AnimalCardData,
  CriteriaItem,
  FilterChip,
} from "./AdoptionLayoutComponents";

const ageInMonths = (pet: AnimalCardData) => {
  const age = parseFloat(pet.age);
  if (isNaN(age)) {
    return Number.MAX_SAFE_INTEGER;
  }
  return /year/i.test(pet.yearsOrMonths) ? age * 12 : age;
};

const byName = (a: AnimalCardData, b: AnimalCardData) =>
  a.name.localeCompare(b.name);

const SORT_OPTIONS: {
  [key: string]: {
    label: string;
    sort?: typeof byName;
  };
} = {
  default: { label: "Sort: Default" },
  name: {
    label: "Name A–Z",
    sort: byName,
  },
  youngest: {
    label: "Age: Youngest first",
    sort: (a, b) => ageInMonths(a) - ageInMonths(b),
  },
  oldest: {
    label: "Age: Oldest first",
    sort: (a, b) => ageInMonths(b) - ageInMonths(a),
  },
};

export const AdoptionHeroSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <SectionEyebrow text="Adopt. Love. Save a life." />
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl font-poppins">
            Find your <br />
            <span className="text-brand">new best friend</span>{" "}
            <Icon
              className="inline"
              icon="foundation:paw"
              color="#8b3479"
              width="36"
              height="36"
              inline={true}
            />
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg font-poppins">
            Every animal at Bright Eyes has been rescued and cared for, and is
            now ready for the next chapter &#8211; with you. Open your heart and
            change two lives.
          </p>
          <div className="flex flex-wrap items-center gap-x-4">
            <a
              href="#animals"
              className="mt-5 flex max-w-fit items-center gap-3 rounded-full bg-brand py-3.5 pl-8 pr-8 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins"
            >
              <Icon icon="foundation:paw" color="white" width="16" />
              Meet Our Animals
            </a>
            <Button
              text="Adoption Form"
              iconStr="mdi:file-document-edit-outline"
              link={`/forms`}
              variant="outline"
            />
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand/10 sm:h-80 lg:h-96">
          <Image
            src="/HeroDogCat.jpg"
            alt="A rescue dog and cat at Bright Eyes Animal Sanctuary"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export const AdoptionCriteriaSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-8">
      <div className="grid items-center gap-8 rounded-[2rem] bg-cream-deep p-8 sm:p-10 lg:grid-cols-[auto,1fr]">
        <div className="max-w-[14rem]">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 font-poppins">
            Adoption Criteria
            <Icon icon="foundation:paw" color="#8b3479" width="20" />
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 font-poppins">
            To adopt, you must meet the following criteria.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {ADOPTION_CRITERIA.map((criteria) => (
            <CriteriaItem
              key={criteria.label}
              icon={criteria.icon}
              label={criteria.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const AdoptionCardSection = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("default");
  //Independent toggles for households with kids or existing pets.
  const [childFriendly, setChildFriendly] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const { isLoading: isPetLoading, data: availablePets } = useQuery(
    "availablePets",
    getAvailablePets,
    {
      staleTime: 10000, // only eligible to refetch after 10 seconds
    }
  );

  const pets: AnimalCardData[] = availablePets?.data ?? [];

  const filteredPets = pets
    .filter((animal) => (filter ? animal.type === filter : true))
    .filter((animal) =>
      childFriendly ? /yes/i.test(animal.suitableForChildren) : true
    )
    .filter((animal) =>
      petFriendly ? /yes/i.test(animal.suitableForAnimals) : true
    )
    .filter((animal) => {
      const term = search.trim().toLowerCase();
      if (!term) {
        return true;
      }
      return (
        animal.name.toLowerCase().includes(term) ||
        animal.breed.toLowerCase().includes(term)
      );
    });

  const sortFn = SORT_OPTIONS[sortKey]?.sort;
  const sortedPets = sortFn ? [...filteredPets].sort(sortFn) : filteredPets;

  return (
    <section
      id="animals"
      className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <FilterChip
            label="All"
            selected={filter === ""}
            onClick={() => setFilter("")}
          />
          <FilterChip
            label="Dogs"
            selected={filter === "Dog"}
            onClick={() => setFilter("Dog")}
          />
          <FilterChip
            label="Cats"
            selected={filter === "Cat"}
            onClick={() => setFilter("Cat")}
          />
          <FilterChip
            label="Good with children"
            selected={childFriendly}
            onClick={() => setChildFriendly((current) => !current)}
          />
          <FilterChip
            label="Good with other pets"
            selected={petFriendly}
            onClick={() => setPetFriendly((current) => !current)}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Icon
              className="absolute left-4 top-1/2 -translate-y-1/2"
              icon="akar-icons:search"
              color="#9ca3af"
              width="16"
              height="16"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or breed..."
              aria-label="Search animals by name or breed"
              className="h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-poppins sm:w-64"
            />
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort animals"
            className="h-11 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-poppins"
          >
            {Object.entries(SORT_OPTIONS).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isPetLoading ? (
        <div className="flex justify-center py-10">
          <LoadingIcon />
        </div>
      ) : sortedPets.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedPets.map((pet) => (
            <AnimalCard key={pet._id + pet.breed} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-10 text-center font-poppins">
          <Icon
            className="mx-auto mb-3"
            icon="foundation:paw"
            color="#8b3479"
            width="32"
            height="32"
          />
          <p className="text-lg font-medium text-gray-800">
            No animals match your search.
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Try a different name or breed, or check back soon &#8211; new
            rescues arrive regularly.
          </p>
        </div>
      )}
    </section>
  );
};

export const PerfectMatchSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] pb-16 pt-4">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-brand-100 p-8 text-center sm:p-10 lg:flex-row lg:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand">
          <Icon
            icon="mdi:heart-search"
            color="#ffffff"
            width="38"
            height="38"
          />
        </div>
        <div className="grow">
          <h2 className="text-2xl font-semibold text-brand-deep sm:text-3xl font-poppins">
            Think you could be their perfect match?
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-base font-poppins">
            If you meet our adoption criteria, the next step is easy. Complete
            our adoption form and we&apos;ll be in touch.
          </p>
        </div>
        <div className="-mt-5 shrink-0">
          <Button
            text="Complete Adoption Form"
            iconStr="foundation:paw"
            link={`/forms`}
          />
        </div>
      </div>
    </section>
  );
};
