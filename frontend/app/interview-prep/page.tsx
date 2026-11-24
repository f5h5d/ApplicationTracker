"use client";

import { FileText, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/src/lib/components/Navbar";
import { useSession } from "@/src/lib/login/queries";
import layoutStyles from "../job-applications/page.module.css";
import ApplicationSelector from "./components/ApplicationSelector";
import ResumeModal from "./components/ResumeModal";
import SamplePrepPlan from "./components/SamplePrepPlan";
import styles from "./page.module.css";
import { useFetchInterviewingApplications } from "../../src/lib/interview-prep/queries";
import { application } from "../job-applications/types";

export default function InterviewPrepPage() {
  const router = useRouter();
  const { data: hasSession, isLoading } = useSession();
  const [resume, setResume] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);

  const [currentApplication, setCurrentApplication] = useState<application>({
    id: 0,
    companyName: "",
    role: "",
    jobUrl: "",
    jobDescription: "",
    status: "INTERVIEW",
    semester: "",
    deadline: "",
    notes: "",
    createdAt: "",
    updatedAt: "",
  });

  const {
    data: interviewingApplications,
    isLoading: isLoadingInterviewingApplications,
  } = useFetchInterviewingApplications();

  useEffect(() => {
    if (!isLoading && !hasSession) router.replace("/login");
  }, [hasSession, isLoading, router]);

  if (!hasSession) return null;

  return (
    <div className={layoutStyles.container}>
      <Navbar />
      <main className={layoutStyles.main}>
        <header className={styles.header}>
          <div>
            <h1>Interview prep</h1>
            <p>A focused prep plan for the role you’re working toward.</p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.resumeButton}
              aria-haspopup="dialog"
              onClick={() => setResumeOpen(true)}
            >
              <FileText size={16} aria-hidden="true" />
              {resume ? "Update resume" : "Add resume"}
            </button>
            <button
              type="button"
              className={styles.generateButton}
              disabled
              title="Prep generation is unavailable in the sample preview"
            >
              <Sparkle size={18} aria-hidden="true" /> Generate prep
            </button>
          </div>
        </header>
        <ApplicationSelector
          currentApplication={currentApplication}
          setCurrentApplication={setCurrentApplication}
        />
        <SamplePrepPlan />
      </main>
      {resumeOpen && (
        <ResumeModal
          resume={resume}
          onClose={() => setResumeOpen(false)}
          onSave={(text) => {
            setResume(text);
            setResumeOpen(false);
          }}
        />
      )}
    </div>
  );
}
