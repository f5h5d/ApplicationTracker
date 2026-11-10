export type application = {
  id: number;
  companyName: string;
  createdAt: string;
  jobDescription: string;
  jobUrl: string;
  notes: string;
  role: string;
  status: "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  deadline?: string;
  semester?: string;
  updatedAt: string;
  userId?: string;
};

export type NewApplication = Omit<application, "id">;

export type UpdateApplication = Pick<application, "id" | "status" | "notes">;
