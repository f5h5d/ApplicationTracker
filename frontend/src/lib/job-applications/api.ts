"use client";
import type {
  application,
  NewApplication,
  UpdateApplication,
} from "@/app/job-applications/types";
import { csrf } from "@/app/login/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const fetchJobApplications = async (page: number, filter: string) => {
  const response = await api.get(
    `/api/applications/?page=${page}${filter && filter !== "ALL" ? `&filter=${filter}` : ""}`,
  );

  return response.data;
};

export const fetchSearchedJobApplications = async (
  searchTerm: string,
  page: number,
  filter: string,
) => {
  const response = await api.get(
    `/api/applications/search?search=${searchTerm}&page=${page}${filter && filter !== "ALL" ? `&filter=${filter}` : ""}`,
  );

  return response.data;
};

export type ApplicationCounts = Partial<Record<application["status"], number>>;

export const fetchJobApplicationsOverview = async () => {
  const response = await api.get<ApplicationCounts>(
    `/api/applications/overview`,
  );

  return response.data;
};

export const addJobApplication = async (
  newApplication: NewApplication,
  csrf: csrf,
) => {
  if (!csrf) {
    throw new Error("CSRF token is not available");
  }

  await axios.post(`http://localhost:8080/api/applications/`, newApplication, {
    withCredentials: true,
    headers: {
      [csrf.headerName]: csrf.token,
    },
  });
};

export const deleteJobApplication = async (
  applicationId: number,
  csrf: csrf,
) => {
  await axios.delete(
    `http://localhost:8080/api/applications/${applicationId}`,
    {
      withCredentials: true,
      headers: {
        [csrf?.headerName || ""]: csrf?.token || "",
      },
    },
  );
};

export const updateJobApplication = async (
  applicationId: number,
  status: string,
  notes: string,
  csrf: csrf,
) => {
  await axios.put(
    `http://localhost:8080/api/applications/${applicationId}`,
    {
      status,
      notes,
    },
    {
      withCredentials: true,
      headers: {
        [csrf?.headerName || ""]: csrf?.token || "",
      },
    },
  );
};
