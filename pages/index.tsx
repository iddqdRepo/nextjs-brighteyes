/* eslint-disable @next/next/no-img-element */
import React from "react";
import Map from "../components/LayoutComponents/HomeLayout/MapComponent/Map";
import {
  FooterSection,
  ContactUsSection,
} from "../components/common/CommonComponents";
import {
  HeroSection,
  AboutUsSection,
  CardsSection,
  GetInvolvedSection,
} from "../components/LayoutComponents/HomeLayout/HomeLayout";

function Home() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <CardsSection />
      <GetInvolvedSection />
      <ContactUsSection />
      <Map />
      <FooterSection />
    </>
  );
}

export default Home;
