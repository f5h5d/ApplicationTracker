import type { NewApplication } from "@/app/job-applications/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addJobApplication,
  deleteJobApplication,
  updateJobApplication,
} from "./api";

export const useAddJobApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-job-application"],
    mutationFn: async (newApplication: NewApplication) =>
      addJobApplication(newApplication),
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
    mutationFn: async () => deleteJobApplication(applicationId),
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
    mutationFn: async ({ status, notes }: { status: string; notes: string }) =>
      updateJobApplication(applicationId, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({
        queryKey: ["job-applications-overview"],
      });
      onClose();
    },
  });
};
