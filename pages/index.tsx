/* eslint-disable @next/next/no-img-element */
import React from "react";
import Map from "../components/layoutComponents/HomeLayout/MapComponent/Map";
import { FooterSection } from "../components/common/CommonComponents";
import {
  HeroSection,
  AboutUsSection,
  CardsSection,
  ContactUsSection,
  GetInvolvedSection,
} from "../components/layoutComponents/HomeLayout/HomeLayout";

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
