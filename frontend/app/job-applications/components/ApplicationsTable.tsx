"use client";

import Image from "next/image";
import { ExternalLink, Search } from "lucide-react";
import styles from "./applications-table.module.css";
import {
  useFetchJobApplications,
  useFetchSearchedJobApplications,
} from "@/src/lib/job-applications/queries";
import { application } from "../types";
import { useEffect, useState } from "react";

// type Application = {};

export default function ApplicationsTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const { data: applications } = useFetchJobApplications();
  const { data: searchedApplications } =
    useFetchSearchedJobApplications(debouncedSearchTerm);

  console.log("searchedApplications", searchedApplications);
  const [currentFilter, setCurrentFilter] = useState<string>("ALL");
  const filteredApplications = (
    searchedApplications?.length > 0 ? searchedApplications : applications
  )?.filter((application: application) => {
    if (currentFilter === "ALL") {
      return true;
    }
    console.log("application.status", application.status, currentFilter);
    return application.status === currentFilter;
  });
  const filters = [
    {
      name: "All",
      count: applications ? applications.length : 0,
    },
    {
      name: "Saved",
      count: applications
        ? applications.filter((a: application) => a.status === "SAVED").length
        : 0,
    },
    {
      name: "Applied",
      count: applications
        ? applications.filter((a: application) => a.status === "APPLIED").length
        : 0,
    },
    {
      name: "Interview",
      count: applications
        ? applications.filter((a: application) => a.status === "INTERVIEW")
            .length
        : 0,
    },
    {
      name: "Offers",
      count: applications
        ? applications.filter((a: application) => a.status === "OFFER").length
        : 0,
    },
    {
      name: "Rejected",
      count: applications
        ? applications.filter((a: application) => a.status === "REJECTED")
            .length
        : 0,
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
            <small>{filter.count}</small>
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
        <button type="button" className={styles.sort}>
          <span className={styles.desktopText}>Newest first</span>
          <span className={styles.mobileText}>Newest</span>
          <Image
            src="/icons/dropdown.svg"
            alt=""
            width={18}
            height={18}
            unoptimized
          />
        </button>
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
          {filteredApplications?.map((application: application) => (
            <article
              className={styles.row}
              key={application.companyName + application.role}
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
              <button
                type="button"
                className={styles.more}
                aria-label={`More options for ${application.companyName}`}
              >
                <Image
                  className={styles.desktopText}
                  src="/icons/more.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
                <Image
                  className={styles.mobileText}
                  src="/icons/mobile-more.svg"
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                />
              </button>
            </article>
          ))}
        </div>
        <footer className={styles.pagination}>
          <span className={styles.desktopText}>
            Showing 1–8 of 12 applications
          </span>
          <span className={styles.mobileText}>Showing 8 of 12</span>
          <div className={styles.pages}>
            <button type="button" className={styles.previous}>
              Previous
            </button>
            <span className={styles.currentPage}>1</span>
            <span className={styles.secondPage}>2</span>
            <button type="button">Next</button>
          </div>
        </footer>
      </div>
    </section>
  );
}
