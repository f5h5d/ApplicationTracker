import type { NewApplication } from "@/app/job-applications/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addJobApplication,
  deleteJobApplication,
  updateJobApplication,
} from "./api";
import { getCsrfToken } from "./helpers";

export const useAddJobApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-job-application"],
    mutationFn: async (newApplication: NewApplication) => {
      const csrf = await getCsrfToken(queryClient);
      await addJobApplication(newApplication, csrf);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["job-applications-overview"],
      });
    },
  });
};

export const useDeleteJobApplication = (applicationId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-job-application"],
    mutationFn: async () => {
      const csrf = await getCsrfToken(queryClient);
      await deleteJobApplication(applicationId, csrf);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["job-applications-overview"],
      });
    },
  });
};

export const useUpdateJobApplication = (
  applicationId: number,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-job-application"],
    mutationFn: async ({
      status,
      notes,
    }: {
      status: string;
      notes: string;
    }) => {
      const csrf = await getCsrfToken(queryClient);
      await updateJobApplication(applicationId, status, notes, csrf);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["job-applications-overview"],
      });
      queryClient.invalidateQueries({
        queryKey: ["interviewing-applications"],
      });
      onClose();
    },
  });
};
