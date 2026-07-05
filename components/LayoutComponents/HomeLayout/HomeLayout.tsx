import { useRef, useState } from "react";
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
} from "../AdoptionLayout/AdoptionLayoutComponents";
import { DonationTeaserCard, HelpCard, StatCard } from "./HomeLayoutComponents";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-100/70 blur-2xl"></div>
      <div className="mx-auto grid w-11/12 max-w-7xl 2xl:max-w-[85rem] items-center gap-10 py-12 lg:grid-cols-[1.05fr,0.95fr] lg:py-20">
        <div className="relative">
          <SectionEyebrow text="Rescue. Rehabilitate. Rehome." />
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl xl:text-6xl font-poppins">
            Every animal deserves a{" "}
            <span className="text-brand">
              second chance.{" "}
              <Icon
                className="inline"
                icon="foundation:paw"
                color="#8b3479"
                width="40"
                height="40"
                inline={true}
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg font-poppins">
            Bright Eyes Animal Sanctuary rescues, nurtures and rehomes animals
            in need across Northern Ireland. Together, we can build a kinder
            world for every paw.
          </p>
          {/* gap-x only: the buttons carry their own mt-5, so an extra row
              gap made them drift too far apart when stacked on mobile. */}
          <div className="flex flex-wrap items-center gap-x-4">
            <Button
              text="Adopt a Pet"
              iconStr="foundation:paw"
              link={`/adoption`}
            />
            <Button
              text="Donate Now"
              iconStr="ant-design:heart-outlined"
              link={`/donate`}
              variant="outline"
            />
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand/10 sm:h-80 lg:h-[26rem]">
          <Image
            src="/HeroDogCat.jpg"
            alt="A dog and cat together at Bright Eyes Animal Sanctuary"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export const CardsSection = () => {
  return (
    <section className="mx-auto -mt-2 w-11/12 max-w-7xl 2xl:max-w-[85rem] pb-4 lg:-mt-10 lg:pb-8">
      <div className="relative z-10 grid divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <StatCard
          title="2,000+"
          text="Pets adopted within the past 5 years"
          icon="fluent-emoji-high-contrast:dog"
        />
        <StatCard
          title="20+"
          text="Helpful volunteers working at Bright Eyes"
          icon="ic:outline-volunteer-activism"
        />
        <StatCard
          title="30+"
          text="Years of experience getting pets the help they need"
          icon="iconoir:stats-square-up"
        />
      </div>
    </section>
  );
};

export const AnimalsPreviewSection = () => {
  const [filter, setFilter] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { isLoading: isPetLoading, data: availablePets } = useQuery(
    "availablePets",
    getAvailablePets,
    {
      staleTime: 10000,
    }
  );

  //Mouse users have no obvious way to move a horizontal carousel, so arrow
  //buttons scroll it a page at a time. Touch users just swipe.
  const scrollCarousel = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.scrollBy({
        left: direction * scroller.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const CarouselArrow = ({ direction }: { direction: 1 | -1 }) => (
    <button
      type="button"
      onClick={() => scrollCarousel(direction)}
      aria-label={
        direction === 1 ? "Show more animals" : "Show previous animals"
      }
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand shadow-lg shadow-gray-300/50 transition hover:bg-brand hover:text-white md:flex ${
        direction === 1 ? "-right-3" : "-left-3"
      }`}
    >
      <Icon
        icon={
          direction === 1
            ? "akar-icons:chevron-right"
            : "akar-icons:chevron-left"
        }
        width="18"
        height="18"
      />
    </button>
  );

  const pets: AnimalCardData[] = (availablePets?.data ?? []).filter(
    (animal: AnimalCardData) => (filter ? animal.type === filter : true)
  );

  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionEyebrow text="Find your new best friend" />
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
            Animals for Adoption
          </h2>
        </div>
        <Button
          text="View All Animals"
          iconStr="foundation:paw"
          link={`/adoption`}
          variant="outline"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
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
      </div>

      {isPetLoading ? (
        <div className="flex justify-center py-10">
          <LoadingIcon />
        </div>
      ) : pets.length > 0 ? (
        <div className="relative mt-8">
          <CarouselArrow direction={-1} />
          <div
            ref={scrollerRef}
            className="no-scrollbar -mx-2 flex snap-x gap-5 overflow-x-auto px-2 pb-4"
          >
            {pets.slice(0, 8).map((pet) => (
              <div
                key={pet._id + pet.breed}
                className="w-64 shrink-0 snap-start"
              >
                <AnimalCard pet={pet} />
              </div>
            ))}
          </div>
          <CarouselArrow direction={1} />
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-10 text-center font-poppins">
          <p className="text-lg font-medium text-gray-800">
            No animals to show right now.
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Check back soon &#8211; new rescues arrive regularly.
          </p>
        </div>
      )}
    </section>
  );
};

export const HomeCriteriaSection = () => {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] text-center">
        <SectionEyebrow text="Our adoption criteria" centered />
        <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
          Creating the perfect match
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {ADOPTION_CRITERIA.map((criteria) => (
            <CriteriaItem
              key={criteria.label}
              icon={criteria.icon}
              label={criteria.label}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            text="Learn About Our Adoption Process"
            iconStr="foundation:paw"
            link={`/adoption`}
          />
        </div>
      </div>
    </section>
  );
};

export const SupportSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionEyebrow text="Make a difference" />
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
            Your support <span className="text-brand">changes lives</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-gray-600 font-poppins">
            Every donation helps us provide food, vet care, shelter and love to
            animals who need it most. We receive no government funding and rely
            purely on the generosity of the public. Thank you for being their
            second chance.
          </p>
          <div className="mt-6 hidden w-80 overflow-hidden rounded-[2.5rem] lg:block">
            <Image
              src="/DonationDog.jpg"
              alt="A happy rescue dog"
              width={500}
              height={500}
            />
          </div>
        </div>
        <DonationTeaserCard />
      </div>
    </section>
  );
};

export const HappyTailsBand = () => {
  return (
    <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-14">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-brand-100 p-8 text-center sm:p-10 lg:flex-row lg:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand">
          <Icon icon="mdi:home-heart" color="#ffffff" width="38" height="38" />
        </div>
        <div className="grow">
          <h2 className="text-2xl font-semibold text-brand-deep sm:text-3xl font-poppins">
            Hundreds of happy endings &#8212; and counting
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-700 sm:text-base font-poppins">
            Every animal we rehome is a story with a happy ending. Meet some of
            the faces who found their forever homes through Bright Eyes.
          </p>
        </div>
        <div className="-mt-5 shrink-0">
          <Button
            text="See Our Happy Tails"
            iconStr="mdi:home-heart"
            link={`/happy-tails`}
          />
        </div>
      </div>
    </section>
  );
};

export const GetInvolvedSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem]">
        <SectionEyebrow text="Get involved" />
        <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
          There are many ways <span className="text-brand">to help</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <HelpCard
            icon="cil:dog"
            title="Adopt"
            text="Give a rescue animal a loving forever home. Join the 2,000+ other people who found the perfect pet for their home."
            buttonText="Learn More"
            link={`/adoption`}
          />
          <HelpCard
            icon="bx:donate-heart"
            title="Donate"
            text="Your support helps us rescue and care. We receive no government funding and rely purely on the generosity of the public."
            buttonText="Donate Now"
            link={`/donate`}
          />
          <HelpCard
            icon="carbon:person-favorite"
            title="Volunteer"
            text="Our fantastic volunteers are the backbone of Bright Eyes. Want to help care for the animals and earn some valuable experience?"
            buttonText="Get Involved"
            link={`/forms/volunteerForm`}
          />
        </div>
      </div>
    </section>
  );
};
