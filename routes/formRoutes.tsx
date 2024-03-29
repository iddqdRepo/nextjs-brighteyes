import axios from "axios";
import {
  ContactUsFormInterface,
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
} from "../interfaces/interfaces";
//^-----------------GET ROUTES-----------------

export const getPetForms = async () => {
  const petforms = await axios.get(`/api/forms?type=pet`);
  return petforms.data;
};
export const getGiftAidForms = async () => {
  const giftAidforms = await axios.get(`/api/forms?type=giftaid`);
  return giftAidforms.data;
};
export const getVolunteerForms = async () => {
  const volunteerforms = await axios.get(`/api/forms?type=volunteer`);
  return volunteerforms.data;
};
export const getContactUsForms = async () => {
  const contactUsforms = await axios.get(`/api/forms?type=contactus`);
  return contactUsforms.data;
};

//^-----------------POST ROUTES-----------------

export const postPetForm = async (data: PetAdoptionFormInterface) => {
  const petform = await axios.post(`/api/forms?type=pet`, data);
  return petform.data;
};
export const postGiftAidForm = async (data: GiftaidFormInterface) => {
  const giftaidForm = await axios.post(`/api/forms?type=giftaid`, data);
  return giftaidForm.data;
};
export const postVolunteerForm = async (data: VolunteerFormInterface) => {
  const volunteerform = await axios.post(`/api/forms?type=volunteer`, data);
  return volunteerform.data;
};
export const postContactUsForm = async (data: ContactUsFormInterface) => {
  const contactUsform = await axios.post(`/api/forms?type=contactus`, data);
  return contactUsform.data;
};

//^-----------------UPDATE ROUTES-----------------
export const udpatePetForm = async (data: PetAdoptionFormInterface) => {
  await axios.put(`/api/forms/${data._id}?type=pet`, data);
};

export const udpateGiftAidForm = async (data: GiftaidFormInterface) => {
  await axios.put(`/api/forms/${data._id}?type=giftaid`, data);
};
export const udpateVolunteerForm = async (data: VolunteerFormInterface) => {
  await axios.put(`/api/forms/${data._id}?type=volunteer`, data);
};
export const udpateContactUsForm = async (data: ContactUsFormInterface) => {
  await axios.put(`/api/forms/${data._id}?type=contactus`, data);
};

//^-----------------DELETE ROUTES-----------------

export const deletePetForm = async (id: string) => {
  await axios.delete(`/api/forms/${id}?type=pet`);
};
export const deleteGiftAidForm = async (id: string) => {
  await axios.delete(`/api/forms/${id}?type=giftaid`);
};
export const deleteVolunteerForm = async (id: string) => {
  await axios.delete(`/api/forms/${id}?type=volunteer`);
};
export const deleteContactUsForm = async (id: string) => {
  await axios.delete(`/api/forms/${id}?type=contactus`);
};
