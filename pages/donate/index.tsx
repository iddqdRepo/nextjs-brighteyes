import {
  ContactUsSection,
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  DonateHeroSection,
  DonationFormSection,
  DonateUsesSection,
} from "../../components/LayoutComponents/DonateLayout/DonateLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function Donate() {
  return (
    <>
      <HeadTag
        title={"Donate by Card - Bright Eyes Animal Sanctuary"}
        metaContent={
          "Donate by card to Bright Eyes Animal Sanctuary with optional Gift Aid and monthly giving."
        }
        linkHref={"/donate"}
      />
      <NavbarComponent />
      <DonateHeroSection />
      <DonationFormSection />
      <DonateUsesSection />
      <ContactUsSection />
      <FooterSection />
    </>
  );
}

export default Donate;
