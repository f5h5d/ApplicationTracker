import { useQuery } from "@tanstack/react-query";
import { fetchInterviewingApplications, fetchRecentResume } from "./api";

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
