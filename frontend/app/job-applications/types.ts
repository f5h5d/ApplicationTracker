export type application = {
  companyName: string;
  createdAt: string;
  jobDescription: string;
  jobUrl: string;
  notes: string;
  role: string;
  status: "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  semester?: string;
  updatedAt: string;
  userId?: string;
};
