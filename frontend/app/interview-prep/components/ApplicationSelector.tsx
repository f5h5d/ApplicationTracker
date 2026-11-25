import { ArrowUpRight } from "lucide-react";
import tableStyles from "../../job-applications/components/applications-table.module.css";
import styles from "../page.module.css";
import {
  formatApplicationDate,
  formatStatus,
  getPostingUrl,
} from "@/src/lib/job-applications/display";
import type { application } from "@/app/job-applications/types";
import RequestError from "@/src/lib/components/RequestError";

type ApplicationSelectorProps = {
  applications: application[];
  currentApplication?: application;
  onSelect: (id: number) => void;
  isLoading: boolean;
  onRetry?: () => void;
  isGeneratingInterviewPrep: boolean;
};

export default function ApplicationSelector({
  currentApplication,
  applications,
  onSelect,
  isLoading,
  onRetry,
  isGeneratingInterviewPrep,
}: ApplicationSelectorProps) {
  const postingUrl = getPostingUrl(currentApplication?.jobUrl);
  let placeholder = "Select an application";
  if (isLoading) placeholder = "Loading applications…";
  else if (!applications.length && !onRetry) placeholder = "No applications in interview";

  return (
    <section
      className={styles.applicationCard}
      aria-label="Application details"
    >
      <div className={styles.applicationField}>
        <label htmlFor="prep-application">Application</label>
        <select
          id="prep-application"
          disabled={isGeneratingInterviewPrep || !applications.length}
          value={currentApplication?.id ?? ""}
          onChange={(event) => onSelect(Number(event.target.value))}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {applications.map((item) => (
            <option key={item.id} value={item.id}>
              {item.companyName} · {item.role}
            </option>
          ))}
        </select>
        {onRetry && (
          <RequestError onRetry={onRetry}>Couldn’t load applications for interview prep.</RequestError>
        )}
        {currentApplication && (
          <p className={styles.metadata}>
            {currentApplication.semester && (
              <>
                {currentApplication.semester}
                <span aria-hidden="true">·</span>
              </>
            )}
            <span
              className={`${styles.status} ${tableStyles[currentApplication.status.toLowerCase()]}`}
            >
              {formatStatus(currentApplication.status)}
            </span>
            <span aria-hidden="true">·</span>
            Saved {formatApplicationDate(currentApplication.createdAt, true)}
          </p>
        )}
      </div>
      {postingUrl && (
        <a
          href={postingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.postingButton}
        >
          Open posting <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </section>
  );
}
