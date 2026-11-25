import { skipToken, useQuery } from "@tanstack/react-query";
import {
  fetchInterviewingApplications,
  fetchInterviewPrep,
  fetchRecentResume,
} from "./api";

export const useFetchInterviewingApplications = (enabled: boolean) =>
  useQuery({
    queryKey: ["interviewing-applications"],
    enabled,
    queryFn: async () => fetchInterviewingApplications(),
  });

export const useFetchRecentResume = () =>
  useQuery({
    queryKey: ["recent-resume"],
    queryFn: async () => fetchRecentResume(),
  });

export const useFetchInterviewPrep = (id: number | undefined) =>
  useQuery({
    queryKey: ["interview-prep", id],
    queryFn: id === undefined ? skipToken : () => fetchInterviewPrep(id),
  });
