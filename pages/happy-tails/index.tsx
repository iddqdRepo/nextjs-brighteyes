import React from "react";
import { GetServerSideProps } from "next";
import { Icon } from "@iconify/react";
import petModel from "../../models/petModel";
import dbConnect from "../../utils/dbConnect";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import {
  Button,
  DonationComponent,
  FooterSection,
  HeadTag,
  SectionEyebrow,
} from "../../components/common/CommonComponents";
import { PetPhoto } from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";

type HappyTail = {
  _id: string;
  name: string;
  breed: string;
  type: string;
  image: string;
};

function HappyTails({
  tails,
  totalAdopted,
}: {
  tails: HappyTail[];
  totalAdopted: number;
}) {
  return (
    <>
      <HeadTag
        title={"Happy Tails - Bright Eyes Animal Sanctuary"}
        metaContent={`Over ${totalAdopted} rescued animals have found their forever homes through Bright Eyes Animal Sanctuary. Meet some of our happy endings.`}
        linkHref={"/happy-tails"}
      />
      <NavbarComponent />

      <section className="overflow-hidden bg-gradient-to-br from-brand-50 via-white to-white">
        <div className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-12 lg:py-16">
          <SectionEyebrow text="Happy Tails" />
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl font-poppins">
            <span className="text-brand">{totalAdopted}</span> happy ending
            {totalAdopted === 1 ? "" : "s"}{" "}
            <Icon
              className="inline"
              icon="foundation:paw"
              color="#8b3479"
              width="36"
              height="36"
              inline={true}
            />
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg font-poppins">
            Every one of these faces was rescued, cared for, and welcomed into a
            loving forever home. This page exists because of adopters,
            volunteers and supporters like you &#8212; thank you.
          </p>
        </div>
      </section>

      <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tails.map((pet) => (
            <div
              key={pet._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
            >
              <PetPhoto image={pet.image} className="h-56 w-full" />
              <div className="flex grow flex-col p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-lg font-semibold text-gray-900 font-poppins">
                    {pet.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 font-poppins">
                    Adopted
                  </span>
                </div>
                <span className="text-sm font-medium text-brand font-poppins">
                  {pet.breed}
                </span>
                <span className="mt-2 flex items-center gap-1.5 text-sm text-gray-600 font-poppins">
                  <Icon icon="mdi:home-heart" color="#8b3479" width="16" />
                  Found their forever home
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 rounded-[2rem] bg-cream-deep p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl font-poppins">
            The next happy ending could be yours
          </h2>
          <p className="max-w-xl text-sm leading-6 text-gray-600 sm:text-base font-poppins">
            There are animals at Bright Eyes waiting for their person right now.
            Come and meet them.
          </p>
          <Button
            text="Meet the Animals"
            iconStr="foundation:paw"
            link={`/adoption`}
          />
        </div>
      </section>

      <DonationComponent />
      <FooterSection />
    </>
  );
}

export default HappyTails;

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const [tails, totalAdopted] = await Promise.all([
    //Newest arrivals first. updatedAt would be the natural sort, but a bulk
    //image migration touched every record's updatedAt, so it's unreliable.
    petModel
      .find(
        { adopted: "Yes" },
        { name: 1, breed: 1, type: 1, image: 1, createdAt: 1 }
      )
      .sort({ createdAt: -1 })
      .limit(24)
      .lean(),
    petModel.countDocuments({ adopted: "Yes" }),
  ]);

  return {
    props: {
      tails: tails.map((doc: any) => ({
        _id: doc._id.toString(),
        name: (doc.name || "").trim(),
        breed: doc.breed || "",
        type: doc.type || "",
        image: doc.image || "",
      })),
      totalAdopted,
    },
  };
};
