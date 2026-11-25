"use client";

import Image from "next/image";
import { ExternalLink, Search } from "lucide-react";
import styles from "./applications-table.module.css";
import { useFetchJobApplications } from "@/src/lib/job-applications/queries";
import { useDeleteJobApplication } from "@/src/lib/job-applications/mutations";
import RequestError from "@/src/lib/components/RequestError";
import {
  formatApplicationDate,
  formatStatus,
  getPostingUrl,
} from "@/src/lib/job-applications/display";
import type { ApplicationCounts } from "@/src/lib/job-applications/api";
import type { application } from "../types";
import { Fragment, useEffect, useState } from "react";
import { APPLICATIONS_PER_PAGE } from "@/src/lib/constants";
import ApplicationOptionsMenu from "./ApplicationOptionsMenu";

type Filter = "ALL" | application["status"];
const filters: Filter[] = [
  "ALL",
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export default function ApplicationsTable({
  overview,
  totalApplications,
}: {
  overview: ApplicationCounts | undefined;
  totalApplications: number;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<Filter>("ALL");
  const deletion = useDeleteJobApplication();
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useFetchJobApplications(page, currentFilter, debouncedSearchTerm);
  const total =
    currentFilter === "ALL"
      ? totalApplications
      : (overview?.[currentFilter] ?? 0);
  const end = page * APPLICATIONS_PER_PAGE + applications.length;

  useEffect(() => {
    const search = searchTerm.trim();
    if (search === debouncedSearchTerm) return;
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
      setPage(0);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debouncedSearchTerm]);

  return (
    <section className={styles.applications} aria-label="Applications">
      <div className={styles.filters} aria-label="Application status filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setCurrentFilter(filter);
              setPage(0);
            }}
            aria-pressed={currentFilter === filter}
            className={
              currentFilter === filter ? styles.selectedFilter : undefined
            }
          >
            {filter === "OFFER" ? "Offers" : formatStatus(filter)}
            {overview && (
              <small>
                (
                {filter === "ALL" ? totalApplications : (overview[filter] ?? 0)}
                )
              </small>
            )}
          </button>
        ))}
      </div>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Search size={16} strokeWidth={1.5} aria-hidden="true" />
          <input
            aria-label="Search applications"
            placeholder="Search applications…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.table}>
        <div className={styles.headings} aria-hidden="true">
          <span>Company &amp; role</span>
          <span>Semester</span>
          <span>Status</span>
          <span>Added</span>
          <span />
        </div>
        <div className={styles.rows}>
          {isError && (
            <RequestError onRetry={() => refetch()}>Couldn’t load applications.</RequestError>
          )}
          {!isError && applications.length === 0 && (
            <p className={styles.tableNotice} role="status">
              {isLoading ? "Loading applications…" : "No applications found."}
            </p>
          )}
          {applications.map((application) => {
            const postingUrl = getPostingUrl(application.jobUrl);
            return (
              <Fragment key={application.id}>
                <article
                  className={styles.row}
                  aria-label={`${application.companyName}, ${application.role}`}
                >
                  <div className={styles.company}>
                    <span className={styles.monogram}>
                      {application.companyName[0]}
                    </span>
                    <div className={styles.companyText}>
                      <h2>
                        {postingUrl ? (
                          <a
                            href={postingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {application.companyName}
                            <ExternalLink
                              size={12}
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          application.companyName
                        )}
                      </h2>
                      <p>{application.role}</p>
                    </div>
                  </div>
                  <div className={styles.semester}>
                    <span className={styles.mobileText}>Semester</span>
                    <span>{application.semester?.trim() || "—"}</span>
                  </div>
                  <div className={styles.statusCell}>
                    <span
                      className={`${styles.status} ${styles[application.status.toLowerCase()]}`}
                    >
                      <Image
                        src={`/icons/status-${application.status.toLowerCase()}.svg`}
                        alt=""
                        width={5}
                        height={5}
                        unoptimized
                      />
                      {formatStatus(application.status)}
                    </span>
                  </div>
                  <div className={styles.added}>
                    <span className={styles.mobileText}>Added</span>
                    {formatApplicationDate(application.createdAt)}
                  </div>
                  <ApplicationOptionsMenu
                    application={application}
                    deletePending={deletion.isPending}
                    onDelete={() => deletion.mutate(application.id)}
                  />
                </article>
                {deletion.isError && deletion.variables === application.id && (
                  <RequestError onRetry={() => deletion.mutate(application.id)}>
                    {`Couldn’t delete the ${application.role} application at ${application.companyName}.`}
                  </RequestError>
                )}
              </Fragment>
            );
          })}
        </div>
        <footer className={styles.pagination}>
          <span>
            {applications.length > 0 && (
              <>
                Showing {page * APPLICATIONS_PER_PAGE + 1}–{end}
                {!debouncedSearchTerm && overview && ` of ${total}`}
              </>
            )}
          </span>
          <div className={styles.pages}>
            <button
              type="button"
              className={styles.previous}
              disabled={page === 0}
              onClick={() => setPage((page) => Math.max(0, page - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((page) => page + 1)}
              disabled={
                applications.length < APPLICATIONS_PER_PAGE ||
                (!!overview && end >= total)
              }
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
