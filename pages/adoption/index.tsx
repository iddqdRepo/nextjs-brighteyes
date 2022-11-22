import React, { useEffect, useState } from "react";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import {
  AdoptionCardSection,
  AdoptionCriteriaSection,
} from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayout";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import { getAvailablePets } from "../../routes/petRoutes";

function Adoption() {
  const [pets, setPets] = useState(undefined);

  useEffect(() => {
    const getPetsFromDB = async () => {
      let pets = await getAvailablePets();
      let allPets = pets.data.filter((item: any) => {
        return item.adopted === "No";
      });

      setPets(allPets);
    };

    getPetsFromDB();
  }, []);

  return (
    <>
      <HeadTag
        title={"Adoption"}
        linkHref={
          "View our animals up for adoption and find your perfect companion."
        }
        metaContent={"/adoption"}
      />
      <NavbarComponent />
      <AdoptionCriteriaSection />
      <AdoptionCardSection pets={pets} />

      {/* {pets ? (
        <AdoptionCardSection pets={pets} />
      ) : (
        <>
          <div className="flex justify-center">
            <LoadingIcon />
          </div>
        </>
      )} */}

      <FooterSection />
    </>
  );
}

export default Adoption;
