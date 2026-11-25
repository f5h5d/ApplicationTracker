import { useQuery } from "@tanstack/react-query";
import {
  fetchInterviewingApplications,
  fetchInterviewPrep,
  fetchRecentResume,
} from "./api";
import { interviewPrep } from "./types";

export const useFetchInterviewingApplications = () =>
  useQuery({
    queryKey: ["interviewing-applications"],
    queryFn: async () => fetchInterviewingApplications(),
  });

export const useFetchRecentResume = () =>
  useQuery({
    queryKey: ["recent-resume"],
    queryFn: async () => fetchRecentResume(),
  });

export const useFetchInterviewPrep = (id: number) =>
  useQuery({
    queryKey: ["interview-prep", id],
    queryFn: async () => fetchInterviewPrep(id),
  });
