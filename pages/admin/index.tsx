import React, { useEffect, useState } from "react";
import AdminSidebarComponent from "../../adminComponents/AdminSidebarComponent";
import {
  AdminHeadTag,
  PageContainerComponent,
} from "../../adminComponents/commonAdminComponents";
import {
  getPetForms,
  getGiftAidForms,
  getVolunteerForms,
  getContactUsForms,
} from "../../routes/formRoutes";
import { getPets } from "../../routes/petRoutes";
import { Icon } from "@iconify/react";
import { useFormsAndPets } from "../../hooks/useFormAndPets";
import {
  LoadingSpinner,
  BigCard,
  SmallCard,
} from "../../adminComponents/DashboardHome/DashboardHomeLayoutComponents";

const countPetsByStatus = (
  pets: { data: { type: string; adopted: string }[] } | undefined,
  type: string,
  adopted: string
) => {
  return (
    pets?.data.filter((pet) => pet.type === type && pet.adopted === adopted)
      .length ?? 0
  );
};

const countFormsByArchive = (
  forms: { archive: string }[] | undefined,
  archived: string
) => {
  return forms?.filter((form) => form.archive === archived).length ?? 0;
};

function Index() {
  const petsData = ["pets", getPets];
  const { isLoading: isPetLoading, data: pets } = useFormsAndPets(petsData);

  const petFormType = ["petForms", getPetForms];
  const { isLoading: isAdoptionFormsLoading, data: adoptionForms } =
    useFormsAndPets(petFormType);

  const giftAidFormType = ["giftAidForms", getGiftAidForms];
  const { isLoading: isGiftAidFormsLoading, data: giftAidForms } =
    useFormsAndPets(giftAidFormType);

  const volunteerFormType = ["volunteerForms", getVolunteerForms];
  const { isLoading: isVolunteerFormsLoading, data: volunteerForms } =
    useFormsAndPets(volunteerFormType);

  const contactFormType = ["contactForms", getContactUsForms];
  const { isLoading: isContactUsFormsLoading, data: contactUsForms } =
    useFormsAndPets(contactFormType);

  const [dogActiveCount, setDogActiveCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [dogArchiveCount, setDogArchiveCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [catActiveCount, setCatActiveCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [catArchiveCount, setCatArchiveCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [adoptionFormPendingCount, setAdoptionFormPendingCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [giftAidFormPendingCount, setGiftAidFormPendingCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [volunteerFormPendingCount, setVolunteerFormPendingCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);
  const [contactUsFormPendingCount, setContactUsFormPendingCount] = useState<
    number | React.ReactElement
  >(<LoadingSpinner />);

  useEffect(() => {
    if (!isPetLoading && pets) {
      setDogActiveCount(countPetsByStatus(pets, "Dog", "No"));
      setDogArchiveCount(countPetsByStatus(pets, "Dog", "Yes"));
      setCatActiveCount(countPetsByStatus(pets, "Cat", "No"));
      setCatArchiveCount(countPetsByStatus(pets, "Cat", "Yes"));
    }

    if (!isAdoptionFormsLoading && adoptionForms) {
      setAdoptionFormPendingCount(
        countFormsByArchive(adoptionForms.data, "No")
      );
    }
    if (!isGiftAidFormsLoading && giftAidForms) {
      setGiftAidFormPendingCount(countFormsByArchive(giftAidForms.data, "No"));
    }
    if (!isVolunteerFormsLoading && volunteerForms) {
      setVolunteerFormPendingCount(
        countFormsByArchive(volunteerForms.data, "No")
      );
    }
    if (!isContactUsFormsLoading && contactUsForms) {
      setContactUsFormPendingCount(
        countFormsByArchive(contactUsForms.data, "No")
      );
    }
  }, [
    adoptionForms,
    contactUsForms,
    giftAidForms,
    isPetLoading,
    isAdoptionFormsLoading,
    isGiftAidFormsLoading,
    isVolunteerFormsLoading,
    isContactUsFormsLoading,
    pets,
    volunteerForms,
  ]);

  return (
    <>
      <AdminHeadTag
        title={"Dashboard"}
        metaContent={"Admin add a new animal, Bright Eyes"}
        linkHref={"/admin"}
      />

      <AdminSidebarComponent highlighted="Dashboard">
        <PageContainerComponent>
          <div className="flex items-center py-3 pl-5 text-lg font-semibold">
            Bright Eyes Dashboard
          </div>
          <div className="border-t-2 border-[#8B3479] w-full "></div>
          <div className="flex flex-col items-center w-full mt-3 ">
            <div className="flex flex-wrap justify-center w-full mb-4 md:justify-center">
              <BigCard
                header="Unread Messages"
                data={
                  !isContactUsFormsLoading ? (
                    contactUsFormPendingCount
                  ) : (
                    <LoadingSpinner />
                  )
                }
              />
              <BigCard
                header="Adoption Forms"
                data={
                  !isAdoptionFormsLoading ? (
                    adoptionFormPendingCount
                  ) : (
                    <LoadingSpinner />
                  )
                }
              />
              <BigCard
                header="GiftAid Forms"
                data={
                  !isGiftAidFormsLoading ? (
                    giftAidFormPendingCount
                  ) : (
                    <LoadingSpinner />
                  )
                }
              />
              <BigCard
                header="Volunteer Forms"
                data={
                  !isVolunteerFormsLoading ? (
                    volunteerFormPendingCount
                  ) : (
                    <LoadingSpinner />
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center w-full mb-10 md:justify-center">
              <div className="flex flex-col items-center p-5 mb-2 rounded-lg xl:flex-col">
                <Icon
                  className="w-auto h-20 mb-3 text-[#B0B0B8] group-hover:text-white"
                  icon="cil:dog"
                />
                <div className="flex flex-col lg:flex-row">
                  <SmallCard
                    header="Active Dogs"
                    data={!isPetLoading ? dogActiveCount : <LoadingSpinner />}
                  />
                  <SmallCard
                    header="Adopted Dogs"
                    data={!isPetLoading ? dogArchiveCount : <LoadingSpinner />}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center p-5 mb-2 rounded-lg xl:flex-col">
                <Icon
                  className="w-auto h-20 mb-3 text-[#B0B0B8] group-hover:text-white"
                  icon="cil:cat"
                />
                <div className="flex flex-col lg:flex-row">
                  <SmallCard
                    header="Active Cats"
                    data={!isPetLoading ? catActiveCount : <LoadingSpinner />}
                  />
                  <SmallCard
                    header="Adopted Cats"
                    data={!isPetLoading ? catArchiveCount : <LoadingSpinner />}
                  />
                </div>
              </div>
            </div>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
