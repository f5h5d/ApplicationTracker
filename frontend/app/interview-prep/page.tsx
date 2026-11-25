"use client";

import { FileText, LoaderCircle, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/src/lib/components/Navbar";
import RequestError from "@/src/lib/components/RequestError";
import { useSession } from "@/src/lib/login/queries";
import layoutStyles from "../job-applications/page.module.css";
import ApplicationSelector from "./components/ApplicationSelector";
import ResumeModal from "./components/ResumeModal";
import InterviewPrepPlan from "./components/InterviewPrepPlan";
import styles from "./page.module.css";
import { useCreateInterviewPrep } from "@/src/lib/interview-prep/mutations";
import {
  useFetchInterviewingApplications,
  useFetchInterviewPrep,
} from "@/src/lib/interview-prep/queries";

export default function InterviewPrepPage() {
  const router = useRouter();
  const session = useSession();
  const [resumeOpen, setResumeOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const applications = useFetchInterviewingApplications(session.data === true);
  const selected = applications.data?.find((item) => item.id === selectedId);
  const prep = useFetchInterviewPrep(selected?.id);
  const generation = useCreateInterviewPrep();

  useEffect(() => {
    if (session.data === false) router.replace("/login");
  }, [session.data, router]);

  if (session.isError && session.data === undefined) {
    return (
      <main className={layoutStyles.main}>
        <RequestError onRetry={() => session.refetch()}>Couldn’t check your session.</RequestError>
      </main>
    );
  }
  if (!session.data) return null;

  let notice = "No interview prep plan has been generated yet.";
  if (!selected) notice = "Select an application to view its prep plan.";
  else if (generation.isPending)
    notice = "Generating your interview prep plan…";
  else if (prep.isLoading) notice = "Loading your prep plan…";
  else if (generation.isError)
    notice = "Couldn’t generate your prep plan. Please try again.";

  return (
    <div className={layoutStyles.container}>
      <Navbar />
      <main className={layoutStyles.main}>
        <header className={`${layoutStyles.pageHeader} ${styles.header}`}>
          <div className={layoutStyles.title}>
            <h1>Interview prep</h1>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.resumeButton}
              aria-haspopup="dialog"
              onClick={() => setResumeOpen(true)}
            >
              <FileText size={16} aria-hidden="true" />
              Resume
            </button>
            <button
              type="button"
              className={styles.generateButton}
              disabled={
                !selected ||
                prep.isLoading ||
                prep.isError ||
                !!prep.data ||
                generation.isPending
              }
              aria-busy={generation.isPending}
              onClick={() => {
                if (selected) generation.mutate(selected.id);
              }}
            >
              {generation.isPending ? (
                <>
                  <LoaderCircle
                    className="motion-safe:animate-spin"
                    size={18}
                    aria-hidden="true"
                  />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkle size={18} aria-hidden="true" /> Generate prep
                </>
              )}
            </button>
          </div>
        </header>
        <ApplicationSelector
          applications={applications.data ?? []}
          currentApplication={selected}
          isLoading={applications.isLoading}
          onRetry={applications.isError ? () => applications.refetch() : undefined}
          onSelect={(id) => {
            generation.reset();
            setSelectedId(id);
          }}
          isGeneratingInterviewPrep={generation.isPending}
        />
        {prep.isError && (
          <RequestError onRetry={() => prep.refetch()}>Couldn’t load your prep plan.</RequestError>
        )}
        {prep.data && !generation.isPending ? (
          <InterviewPrepPlan plan={prep.data.interviewPrep} />
        ) : !prep.isError && (selected || !applications.isError) && (
          <p className={`${styles.card} ${styles.planNotice}`} role={generation.isError ? "alert" : "status"}>
            {notice}
          </p>
        )}
      </main>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  );
}
