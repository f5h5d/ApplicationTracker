import { ArrowUpRight } from "lucide-react";
import tableStyles from "../../job-applications/components/applications-table.module.css";
import styles from "../page.module.css";
import { useFetchInterviewingApplications } from "@/src/lib/interview-prep/queries";
import type { application } from "@/app/job-applications/types";

type ApplicationSelectorProps = {
  currentApplication: application;
  setCurrentApplication: (selected: application) => void;
  isGeneratingInterviewPrep: boolean;
};

export default function ApplicationSelector({
  currentApplication,
  setCurrentApplication,
  isGeneratingInterviewPrep,
}: ApplicationSelectorProps) {
  const { data: interviewingApplications = [] } =
    useFetchInterviewingApplications();

  return (
    <section
      className={styles.applicationCard}
      aria-label="Application details"
    >
      <div className={styles.applicationField}>
        <label htmlFor="prep-application">Application</label>
        <select
          id="prep-application"
          disabled={isGeneratingInterviewPrep}
          value={currentApplication.id || ""}
          onChange={(event) => {
            const selected = interviewingApplications.find(
              (item) => item.id === Number(event.target.value),
            );
            if (selected) setCurrentApplication(selected);
          }}
        >
          <option value="" disabled>
            Select an application
          </option>
          {interviewingApplications.map((item) => (
            <option key={item.id} value={item.id}>
              {item.companyName} · {item.role}
            </option>
          ))}
        </select>
        <p className={styles.metadata}>
          {currentApplication.semester}
          <span aria-hidden="true">·</span>
          <span
            className={`${styles.status} ${tableStyles[currentApplication.status.toLowerCase()]}`}
          >
            {currentApplication.status}
          </span>
          <span aria-hidden="true">·</span>
          Saved {currentApplication.createdAt}, 2026
        </p>
      </div>
      <button
        type="button"
        className={styles.postingButton}
        title="This sample application has no posting link"
        onClick={() => window.open(currentApplication.jobUrl, "_blank")}
      >
        Open posting <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </section>
  );
}
