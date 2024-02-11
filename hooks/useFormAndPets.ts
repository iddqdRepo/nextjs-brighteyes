import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  GiftaidFormInterface,
  PetAdoptionFormInterface,
  VolunteerFormInterface,
  ContactUsFormInterface,
  PetInterface,
} from "../interfaces/interfaces";

export const useFormsAndPets = (formType: any) => {
  const queryClient = useQueryClient();
  const [queryKey, getPetOrForm, updatePetOrForm, deletePetOrForm] = formType;

  const {
    isLoading,
    data,
  }: { isLoading: boolean; data: { success: boolean; data: any } | undefined } =
    useQuery(queryKey, getPetOrForm, {
      staleTime: 10000, // only eligible to refetch after 10 seconds
    });

  const deleteFormMutation = useMutation(
    async (id: string) => {
      await deletePetOrForm(id);
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
      await updatePetOrForm(data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const deletePetMutation = useMutation(
    async (id: string) => {
      await deletePetOrForm(id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const updatePetMutation = useMutation(
    async (data: PetInterface) => {
      await updatePetOrForm(data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return {
    isLoading,
    data,
    deleteFormMutation,
    archiveFormMutation,
    deletePetMutation,
    updatePetMutation,
  };
};
