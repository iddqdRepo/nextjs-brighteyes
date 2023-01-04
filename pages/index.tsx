/* eslint-disable @next/next/no-img-element */
import React from "react";
import Map from "../components/LayoutComponents/HomeLayout/MapComponent/Map";
import {
  FooterSection,
  ContactUsSection,
  HeadTag,
} from "../components/common/CommonComponents";
import {
  HeroSection,
  AboutUsSection,
  CardsSection,
  GetInvolvedSection,
} from "../components/LayoutComponents/HomeLayout/HomeLayout";
import NavbarComponent from "../components/Navbar/NavbarComponent";

function Home() {
  return (
    <>
      <HeadTag
        title={"Home"}
        metaContent={
          "Bright Eyes was established in 1989 and is based in Co.Fermanagh, Northern Ireland."
        }
        linkHref={"/"}
      />
      <NavbarComponent />
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
