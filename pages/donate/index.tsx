import {
  ContactUsSection,
  FooterSection,
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
