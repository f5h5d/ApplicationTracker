"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchJobApplications, fetchSearchedJobApplications } from "./api";

export const useFetchJobApplications = () =>
  useQuery({
    queryKey: ["job-applications"],
    queryFn: async () => fetchJobApplications(),
  });

export const useFetchSearchedJobApplications = (searchTerm: string) =>
  useQuery({
    queryKey: ["job-applications", searchTerm],
    queryFn: async () => fetchSearchedJobApplications(searchTerm),
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  });
