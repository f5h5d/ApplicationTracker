"use client";

import Image from "next/image";
import { ExternalLink, Search } from "lucide-react";
import styles from "./applications-table.module.css";
import {
  useFetchJobApplications,
  useFetchJobApplicationsOverview,
  useFetchSearchedJobApplications,
} from "@/src/lib/job-applications/queries";
import { application } from "../types";
import { useEffect, useState } from "react";
import { APPLICATIONS_PER_PAGE } from "@/src/lib/constants";
import ApplicationOptionsMenu from "./ApplicationOptionsMenu";
import { useDeleteJobApplication } from "@/src/lib/job-applications/mutations";

// type Application = {};

export default function ApplicationsTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [currentFilter, setCurrentFilter] = useState<string>("ALL");
  const { data: overview } = useFetchJobApplicationsOverview();
  const { data: applications } = useFetchJobApplications(page, currentFilter);
  const { data: searchedApplications } = useFetchSearchedJobApplications(
    debouncedSearchTerm,
    page,
    currentFilter,
  );

  const totalApplications =
    (overview?.SAVED ?? 0) +
    (overview?.APPLIED ?? 0) +
    (overview?.INTERVIEW ?? 0) +
    (overview?.OFFER ?? 0) +
    (overview?.REJECTED ?? 0);

  const currentlyShownApplications = debouncedSearchTerm
    ? searchedApplications
    : applications;

  const filters = [
    {
      name: "All",
      count: totalApplications,
    },
    {
      name: "Saved",
      count: overview?.SAVED || 0,
    },
    {
      name: "Applied",
      count: overview?.APPLIED || 0,
    },
    {
      name: "Interview",
      count: overview?.INTERVIEW || 0,
    },
    {
      name: "Offers",
      count: overview?.OFFER || 0,
    },
    {
      name: "Rejected",
      count: overview?.REJECTED || 0,
    },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  });

  return (
    <section className={styles.applications} aria-label="Sample applications">
      <div className={styles.filters} aria-label="Application status filters">
        {filters.map((filter) => (
          <button
            key={filter.name}
            type="button"
            onClick={() => setCurrentFilter(filter.name.toUpperCase())}
            className={
              currentFilter === filter.name.toUpperCase()
                ? styles.selectedFilter
                : ""
            }
          >
            {filter.name}
            <span style={{ fontSize: 12 }}>&nbsp;({filter.count})</span>
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
      <p className={styles.sampleLabel}>Sample applications</p>
      <div className={styles.table}>
        <div className={styles.headings} aria-hidden="true">
          <span>Company &amp; role</span>
          <span>Semester</span>
          <span>Status</span>
          <span>Added</span>
          <span>Interview prep</span>
          <span />
        </div>
        <div className={styles.rows}>
          {currentlyShownApplications?.map((application: application) => (
            <article
              className={styles.row}
              key={application.id}
              aria-label={`${application.companyName}, ${application.role}`}
            >
              <div className={styles.company}>
                <span className={styles.monogram}>
                  {application.companyName[0]}
                </span>
                <div className={styles.companyText}>
                  <h2>
                    {application.companyName}
                    <ExternalLink
                      size={12}
                      strokeWidth={1.4}
                      aria-hidden="true"
                      onClick={() => window.open(application.jobUrl, "_blank")}
                    />
                  </h2>
                  <p>{application.role}</p>
                </div>
              </div>
              <div className={styles.semester}>
                <span className={styles.mobileText}>Semester</span>
                <span>Winter 27</span>
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
                  {application.status[0] +
                    application.status.slice(1).toLowerCase()}
                </span>
              </div>
              <div className={styles.added}>
                <span className={styles.mobileText}>Added</span>
                {/*{application.added}*/}
                Nov 08
              </div>
              <div className={styles.prep}>
                <button type="button" className={styles.generatePrep}>
                  <Image
                    src="/icons/prep-spark.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                  {/*{application.prep}*/}
                </button>
              </div>
              <ApplicationOptionsMenu application={application} />
            </article>
          ))}
        </div>
        <footer className={styles.pagination}>
          <span className={styles.desktopText}>
            Showing {page * APPLICATIONS_PER_PAGE + 1}–
            {page * APPLICATIONS_PER_PAGE + currentlyShownApplications?.length}{" "}
            of {totalApplications} applications
          </span>
          <span className={styles.mobileText}>
            {" "}
            Showing {page * APPLICATIONS_PER_PAGE + 1}–
            {page * APPLICATIONS_PER_PAGE + currentlyShownApplications?.length}{" "}
            of applications
          </span>
          <div className={styles.pages}>
            <button
              type="button"
              className={styles.previous}
              onClick={() => setPage((page) => Math.max(0, page - 1))}
            >
              Previous
            </button>
            {/*<span className={styles.currentPage}>1</span>
            <span className={styles.secondPage}>2</span>*/}
            <button
              type="button"
              onClick={() => setPage((page) => page + 1)}
              disabled={
                currentlyShownApplications
                  ? currentlyShownApplications.length < APPLICATIONS_PER_PAGE
                  : true
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
