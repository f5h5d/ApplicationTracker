"use client";

import { ArrowUpRight, FileText, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/src/lib/components/Navbar";
import { useSession } from "@/src/lib/login/queries";
import { sampleApplications } from "../job-applications/components/sample-data";
import tableStyles from "../job-applications/components/applications-table.module.css";
import layoutStyles from "../job-applications/page.module.css";
import ResumeModal from "./components/ResumeModal";
import SamplePrepPlan from "./components/SamplePrepPlan";
import styles from "./page.module.css";

export default function InterviewPrepPage() {
  const router = useRouter();
  const { data: hasSession, isLoading } = useSession();
  const [application, setApplication] = useState(sampleApplications[0]);
  const [resume, setResume] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);

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
            <button type="button" className={styles.resumeButton} aria-haspopup="dialog" onClick={() => setResumeOpen(true)}>
              <FileText size={16} aria-hidden="true" />
              {resume ? "Update resume" : "Add resume"}
            </button>
            <button type="button" className={styles.generateButton} disabled title="Prep generation is unavailable in the sample preview">
              <Sparkle size={18} aria-hidden="true" /> Generate prep
            </button>
          </div>
        </header>
        <section className={styles.applicationCard} aria-label="Application details">
          <div className={styles.applicationField}>
            <label htmlFor="prep-application">Application</label>
            <select
              id="prep-application"
              value={application.company}
              onChange={(event) => {
                const selected = sampleApplications.find((item) => item.company === event.target.value);
                if (selected) setApplication(selected);
              }}
            >
              {sampleApplications.map((item) => (
                <option key={item.company} value={item.company}>{item.company} · {item.role}</option>
              ))}
            </select>
            <p className={styles.metadata}>
              {application.semester}
              <span aria-hidden="true">·</span>
              <span className={`${styles.status} ${tableStyles[application.appearance]}`}>{application.status}</span>
              <span aria-hidden="true">·</span>
              Saved {application.added}, 2026
            </p>
          </div>
          <button type="button" className={styles.postingButton} disabled title="This sample application has no posting link">
            Open posting <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </section>
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
