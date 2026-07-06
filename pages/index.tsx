import React from "react";
import Map from "../components/LayoutComponents/HomeLayout/MapComponent/Map";
import {
  FooterSection,
  ContactUsSection,
  HeadTag,
  SectionEyebrow,
} from "../components/common/CommonComponents";
import {
  HeroSection,
  CardsSection,
  AnimalsPreviewSection,
  HappyTailsBand,
  HomeCriteriaSection,
  SupportSection,
  GetInvolvedSection,
} from "../components/LayoutComponents/HomeLayout/HomeLayout";
import NavbarComponent from "../components/Navbar/NavbarComponent";

function Home() {
  return (
    <>
      <HeadTag
        title={"Bright Eyes Animal Sanctuary - Don't buy, adopt!"}
        metaContent={
          "Bright Eyes was established in 1989 and is based in Co.Fermanagh, Northern Ireland."
        }
        linkHref={"/"}
      />
      <NavbarComponent />
      <HeroSection />
      <CardsSection />
      <AnimalsPreviewSection />
      <HomeCriteriaSection />
      <SupportSection />
      <HappyTailsBand />
      <GetInvolvedSection />
      <ContactUsSection />
      <section className="mx-auto w-11/12 max-w-7xl 2xl:max-w-[85rem] pb-16 pt-10">
        <SectionEyebrow text="Come and visit us" centered />
        <h2 className="mb-8 text-center text-3xl font-semibold text-gray-900 sm:text-4xl font-poppins">
          Where to find us
        </h2>
        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/60">
          <Map />
        </div>
      </section>
      <FooterSection />
    </>
  );
}

export default Home;
