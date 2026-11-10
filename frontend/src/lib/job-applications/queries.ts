"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchJobApplications,
  fetchJobApplicationsOverview,
  fetchSearchedJobApplications,
} from "./api";

export const useFetchJobApplications = (page: number, currentFilter: string) =>
  useQuery({
    queryKey: ["job-applications", currentFilter, page],
    queryFn: async () => fetchJobApplications(page, currentFilter),
  });

export const useFetchSearchedJobApplications = (
  searchTerm: string,
  page: number,
  currentFilter: string,
) =>
  useQuery({
    queryKey: ["job-applications", currentFilter, searchTerm],
    queryFn: async () =>
      fetchSearchedJobApplications(searchTerm, page, currentFilter),
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
    placeholderData: (previousData) => previousData,
  });

export const useFetchJobApplicationsOverview = () =>
  useQuery({
    queryKey: ["job-applications-overview"],
    queryFn: async () => fetchJobApplicationsOverview(),
  });
