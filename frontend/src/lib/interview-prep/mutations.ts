import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInterviewPrep, addResume } from "./api";
import { getCsrfToken } from "../job-applications/helpers";

export const useAddResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-resume"],
    mutationFn: async (newResume: string) => {
      const csrf = await getCsrfToken(queryClient);
      await addResume(newResume, csrf);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-resume"] });
    },
  });
};

export const useCreateInterviewPrep = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-interview-prep"],
    mutationFn: async () => {
      const csrf = await getCsrfToken(queryClient);
      await addInterviewPrep(id, csrf);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["interview-prep", id] }),
  });
};
