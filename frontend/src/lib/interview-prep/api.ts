import type { application } from "@/app/job-applications/types";
import { csrf } from "@/app/login/types";
import axios from "axios";
import type { InterviewPrep } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const addResume = async (resumeText: string, csrf: csrf) => {
  if (!csrf) {
    throw new Error("CSRF token is not available");
  }

  await api.post(
    "/api/interview-prep/resume",
    {
      resumeText: resumeText,
    },
    {
      headers: {
        [csrf.headerName]: csrf.token,
      },
    },
  );
};

export const fetchInterviewingApplications = async () => {
  const response = await api.get<application[]>(
    "/api/interview-prep/applications",
  );
  return response.data;
};

export const fetchRecentResume = async () => {
  const response = await api.get<string>("/api/interview-prep/resume", {
    responseType: "text",
  });
  return response.data;
};

export const addInterviewPrep = async (id: number, csrf: csrf) => {
  if (!csrf) {
    throw new Error("CSRF token is not available");
  }

  const response = await api.post(
    `/api/interview-prep/${id}`,
    {},
    {
      headers: {
        [csrf.headerName]: csrf.token,
      },
    },
  );

  return response.data;
};

export const fetchInterviewPrep = async (id: number) => {
  const response = await api.get<InterviewPrep | "" | null>(`/api/interview-prep/${id}`);
  return response.data || null;
};
