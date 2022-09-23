import {
  ContactUsSection,
  FooterSection,
} from "../../components/common/CommonComponents";
import {
  DonateHeroSection,
  DonateUsesSection,
  DonationTypesSection,
} from "../../components/LayoutComponents/DonateLayout/DonateLayout";

function Donate() {
  return (
    <>
      <DonateHeroSection />
      <DonationTypesSection />
      <DonateUsesSection />
      <ContactUsSection />
      <FooterSection />
    </>
  );
}

export default Donate;
