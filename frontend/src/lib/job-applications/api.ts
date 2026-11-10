"use client";
import type {
  application,
  NewApplication,
  UpdateApplication,
} from "@/app/job-applications/types";
import axios from "axios";

export const fetchJobApplications = async (page: number, filter: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/applications/?page=${page}${filter && filter !== "ALL" ? `&filter=${filter}` : ""}`,
  );

  return response.data;
};

export const fetchSearchedJobApplications = async (
  searchTerm: string,
  page: number,
  filter: string,
) => {
  const response = await axios.get(
    `http://localhost:8080/api/applications/search?search=${searchTerm}&page=${page}${filter && filter !== "ALL" ? `&filter=${filter}` : ""}`,
  );

  return response.data;
};

export const fetchJobApplicationsOverview = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/applications/overview`,
  );

  return response.data;
};

export const addJobApplication = async (newApplication: NewApplication) => {
  await axios.post(`http://localhost:8080/api/applications/`, newApplication);
};

export const deleteJobApplication = async (applicationId: number) => {
  await axios.delete(`http://localhost:8080/api/applications/${applicationId}`);
};

export const updateJobApplication = async (
  applicationId: number,
  status: string,
  notes: string,
) => {
  await axios.put(`http://localhost:8080/api/applications/${applicationId}`, {
    status,
    notes,
  });
};
