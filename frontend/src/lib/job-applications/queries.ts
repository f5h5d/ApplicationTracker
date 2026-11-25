"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchJobApplications, fetchJobApplicationsOverview } from "./api";

export const useFetchJobApplications = (
  page: number,
  filter: string,
  search: string,
) =>
  useQuery({
    queryKey: ["job-applications", filter, search, page],
    queryFn: () => fetchJobApplications(page, filter, search),
  });

export const useFetchJobApplicationsOverview = (enabled: boolean) =>
  useQuery({
    enabled,
    queryKey: ["job-applications-overview"],
    queryFn: async () => fetchJobApplicationsOverview(),
  });
