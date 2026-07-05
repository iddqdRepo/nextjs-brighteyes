import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
  ContactUsFormInterface,
} from "../interfaces/interfaces";

//Pass enabled=false to skip fetching entirely, e.g. when the signed-in admin
//doesn't have permission for the data and the request would only 403.
export const useFormsAndPets = (formType: any, enabled: boolean = true) => {
  const queryClient = useQueryClient();
  const [queryKey, getForms, updateForm, deleteForm] = formType;
  const {
    isLoading,
    data,
  }: { isLoading: boolean; data: { success: boolean; data: any } | undefined } =
    useQuery(queryKey, getForms, { enabled });
  const deleteFormMutation = useMutation(
    async (id: string) => {
      await deleteForm(id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const archiveFormMutation = useMutation(
    async (
      data:
        | GiftaidFormInterface
        | PetAdoptionFormInterface
        | VolunteerFormInterface
        | ContactUsFormInterface
    ) => {
      await updateForm(data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { isLoading, data, deleteFormMutation, archiveFormMutation };
};
