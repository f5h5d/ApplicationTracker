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
    onSuccess: (_, text) => {
      queryClient.setQueryData(["recent-resume"], text);
    },
  });
};

export const useCreateInterviewPrep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-interview-prep"],
    mutationFn: async (id: number) => {
      const csrf = await getCsrfToken(queryClient);
      await addInterviewPrep(id, csrf);
    },
    onSuccess: (_, id) =>
      queryClient.invalidateQueries({ queryKey: ["interview-prep", id] }),
  });
};
