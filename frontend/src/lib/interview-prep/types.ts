import type { application } from "@/app/job-applications/types";

export type PlanPoint = {
  header: string;
  description: string;
};
export type PrepPlan = {
  practiceQuestions: PlanPoint[];
  talkingPoints: PlanPoint[];
  topicsToReview: PlanPoint[];
};

export type InterviewPrep = {
  id: number;
  createdAt: string;
  updatedAt: string;
  interviewPrep: PrepPlan;
  application: application;
};
