import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addResume } from "./api";
import { getCsrfToken } from "../job-applications/helpers";

export const useAddResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-resume"],
    mutationFn: async (newResume: string) => {
      const csrf = await getCsrfToken(queryClient);
      await addResume(newResume, csrf);
    },
  });
};
