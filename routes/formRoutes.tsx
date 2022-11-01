import axios from "axios";

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

export const deletePetForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=pet`);
};
export const deleteGiftAidForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=giftaid`);
};
export const deleteVolunteerForm = async (id: string) => {
  await axios.delete(`http://localhost:3000/api/forms/${id}?type=volunteer`);
};
