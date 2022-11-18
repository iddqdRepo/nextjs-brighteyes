import {
  ContactUsSection,
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  DonateHeroSection,
  DonateUsesSection,
  DonationTypesSection,
} from "../../components/LayoutComponents/DonateLayout/DonateLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Donate() {
  return (
    <>
      <HeadTag
        title={"Donate"}
        metaContent={
          "In the past 5 years we have rehomed over 1000 cats and dogs. We receive no government funding, every little helps."
        }
        linkHref={"/donate"}
      />
      <NavbarComponent />
      <DonateHeroSection />
      <DonationTypesSection />
      <DonateUsesSection />
      <ContactUsSection />
      <FooterSection />
    </>
  );
}

export default Donate;
