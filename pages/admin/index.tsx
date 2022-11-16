import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AdminSidebarComponent from "../../adminComponents/AdminSidebarComponent";
import { PageContainerComponent } from "../../adminComponents/commonAdminComponents";
import {
  getPetForms,
  getGiftAidForms,
  getVolunteerForms,
  getContactUsForms,
} from "../../routes/formRoutes";
import { getPets } from "../../routes/petRoutes";
import { Icon } from "@iconify/react";

function Index() {
  const { isLoading: isPetLoading, data: pets } = useQuery("pets", getPets);
  const { isLoading: isAdoptionFormsLoading, data: adoptionForms } = useQuery(
    "adoptionForms",
    getPetForms
  );
  const { isLoading: isGiftAidFormsLoading, data: giftAidForms } = useQuery(
    "giftAidForms",
    getGiftAidForms
  );

  const { isLoading: isVolunteerFormsLoading, data: volunteerForms } = useQuery(
    "volunteerForms",
    getVolunteerForms
  );
  const { isLoading: isContactUsFormsLoading, data: contactUsForms } = useQuery(
    "contactUsForms",
    getContactUsForms
  );

  const [dogActiveCount, setDogActiveCount] = useState(0);
  const [dogArchiveCount, setDogArchiveCount] = useState(0);
  const [catActiveCount, setCatActiveCount] = useState(0);
  const [catArchiveCount, setCatArchiveCount] = useState(0);
  const [adoptionFormPendingCount, setAdoptionFormPendingCount] = useState(0);
  const [giftAidFormPendingCount, setGiftAidFormPendingCount] = useState(0);
  const [volunteerFormPendingCount, setVolunteerFormPendingCount] = useState(0);
  const [contactUsFormPendingCount, setContactUsFormPendingCount] = useState(0);

  useEffect(() => {
    if (!isPetLoading) {
      setDogActiveCount(
        pets.data.filter((pet: { type: string; adopted: string }) => {
          return pet.type === "Dog" && pet.adopted === "No";
        }).length
      );
      setDogArchiveCount(
        pets.data.filter((pet: { type: string; adopted: string }) => {
          return pet.type === "Dog" && pet.adopted === "Yes";
        }).length
      );
      setCatActiveCount(
        pets.data.filter((pet: { type: string; adopted: string }) => {
          return pet.type === "Cat" && pet.adopted === "No";
        }).length
      );
      setCatArchiveCount(
        pets.data.filter((pet: { type: string; adopted: string }) => {
          return pet.type === "Cat" && pet.adopted === "Yes";
        }).length
      );
    }

    if (!isAdoptionFormsLoading) {
      setAdoptionFormPendingCount(
        adoptionForms.data.filter((form: { archive: string }) => {
          return form.archive === "No";
        }).length
      );
    }
    if (!isGiftAidFormsLoading) {
      setGiftAidFormPendingCount(
        giftAidForms.data.filter((form: { archive: string }) => {
          return form.archive === "No";
        }).length
      );
    }
    if (!isVolunteerFormsLoading) {
      setVolunteerFormPendingCount(
        volunteerForms.data.filter((form: { archive: string }) => {
          return form.archive === "No";
        }).length
      );
    }
    if (!isContactUsFormsLoading) {
      setContactUsFormPendingCount(
        contactUsForms.data.filter((form: { archive: string }) => {
          return form.archive === "No";
        }).length
      );
    }
  }, [isPetLoading]);

  const BigCard = ({
    header,
    data,
  }: {
    header: string;
    data: number | React.ReactElement;
  }) => {
    return (
      <div className="flex flex-col items-center justify-start pt-10 mb-5 ml-2 mr-2 rounded-lg w-96 h-80 bg-gradient-to-b to-slate-100 from-slate-200 ">
        <div className="flex flex-col items-center mb-2">
          <Icon
            className="w-auto mb-3 text-red-600 h-7 group-hover:text-white"
            icon="akar-icons:circle-alert"
          />
          <span className="text-2xl text-center text-[#8B3479] font-roboto">
            Pending
          </span>
        </div>
        <span className="mb-5 text-3xl text-center text-[#8B3479] font-poppins">
          {header}
        </span>
        <span className="text-6xl text-[#8B3479] font-roboto">{data}</span>
      </div>
    );
  };
  const SmallCard = ({
    header,
    data,
  }: {
    header: string;
    data: number | React.ReactElement;
  }) => {
    return (
      <div className="flex flex-col items-center justify-start pt-10 mb-2 ml-2 mr-2 border border-gray-200 rounded-lg shaow-md w-80 md:w-96 h-52">
        <span className="mb-5 text-2xl font-roboto">{header}</span>
        <span className="text-7xl font-roboto">{data}</span>
      </div>
    );
  };
  const Container = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-col items-center p-5 mb-2 rounded-lg xl:flex-col">
        {children}
      </div>
    );
  };
  const LoadingSpinner = () => {
    return (
      <div className="w-10 h-10 border-8 border-[#8B3479] border-solid rounded-full animate-ping mt-5"></div>
    );
  };

  return (
    <>
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
              <Container>
                <Icon
                  className="w-auto h-20 mb-3 text-[#B0B0B8] group-hover:text-white"
                  icon="cil:dog"
                />
                <div className="flex flex-col lg:flex-row">
                  <SmallCard
                    header="Active Dogs"
                    data={dogActiveCount ? dogActiveCount : <LoadingSpinner />}
                  />
                  <SmallCard
                    header="Adopted Dogs"
                    data={
                      dogArchiveCount ? dogArchiveCount : <LoadingSpinner />
                    }
                  />
                </div>
              </Container>
              <Container>
                <Icon
                  className="w-auto h-20 mb-3 text-[#B0B0B8] group-hover:text-white"
                  icon="cil:cat"
                />
                <div className="flex flex-col lg:flex-row">
                  <SmallCard
                    header="Active Cats"
                    data={catActiveCount ? catActiveCount : <LoadingSpinner />}
                  />
                  <SmallCard
                    header="Adopted Cats"
                    data={
                      catArchiveCount ? catArchiveCount : <LoadingSpinner />
                    }
                  />
                </div>
              </Container>
            </div>
          </div>
        </PageContainerComponent>
      </AdminSidebarComponent>
    </>
  );
}

export default Index;
