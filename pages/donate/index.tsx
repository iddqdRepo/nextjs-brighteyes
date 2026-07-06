import {
  ContactUsSection,
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  DonateSection,
  DonateQuoteSection,
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
      <DonateSection />
      <DonateUsesSection />
      <DonateQuoteSection />
      <ContactUsSection
        eyebrow="Questions about donating?"
        title="We're here to help"
        text="If you have any questions about your donation or need assistance, please get in touch with our team."
      />
      <FooterSection />
    </>
  );
}

export default Donate;
