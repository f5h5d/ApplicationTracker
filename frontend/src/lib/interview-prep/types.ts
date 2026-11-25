import { application } from "@/app/job-applications/types";

type planPoint = {
  header: string;
  description: string;
};
export type interviewPrep = {
  id: number;
  createdAt: string;
  updatedAt: string;
  interviewPrep: {
    practiceQuestions: planPoint[];
    talkingPoints: planPoint[];
    topicsToReview: planPoint[];
  };
  application: application;
} | null;
