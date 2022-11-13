import axios from "axios";
import {
  ContactUsFormInterface,
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
} from "../interfaces/interfaces";

export const getPetForms = async () => {
  const petforms = await axios.get("http://localhost:3000/api/forms?type=pet");
  return petforms.data;
};
export const getGiftAidForms = async () => {
  const giftAidforms = await axios.get(
    "http://localhost:3000/api/forms?type=giftaid"
  );
  return giftAidforms.data;
};
export const getVolunteerForms = async () => {
  const volunteerforms = await axios.get(
    "http://localhost:3000/api/forms?type=volunteer"
  );
  return volunteerforms.data;
};
export const getContactUsForms = async () => {
  const contactUsforms = await axios.get(
    "http://localhost:3000/api/forms?type=contactus"
  );
  return contactUsforms.data;
};

export const deletePetForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=pet`);
};
export const deleteGiftAidForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=giftaid`);
};
export const deleteVolunteerForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=volunteer`);
};
export const deleteContactUsForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=contactus`);
};

export const udpatePetForm = async (data: PetAdoptionFormInterface) => {
  await axios.put(`http://localhost:3000/api/forms/${data._id}?type=pet`, data);
};

export const udpateGiftAidForm = async (data: GiftaidFormInterface) => {
  await axios.put(
    `http://localhost:3000/api/forms/${data._id}?type=giftaid`,
    data
  );
};
export const udpateVolunteerForm = async (data: VolunteerFormInterface) => {
  await axios.put(
    `http://localhost:3000/api/forms/${data._id}?type=volunteer`,
    data
  );
};
export const udpateContactUsForm = async (data: ContactUsFormInterface) => {
  await axios.put(
    `http://localhost:3000/api/forms/${data._id}?type=contactus`,
    data
  );
};
