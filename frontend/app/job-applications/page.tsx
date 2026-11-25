"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AddApplicationModal from "./components/AddApplicationModal";
import ApplicationsTable from "./components/ApplicationsTable";
import Navbar from "@/src/lib/components/Navbar";
import RequestError from "@/src/lib/components/RequestError";
import { useFetchJobApplicationsOverview } from "@/src/lib/job-applications/queries";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/login/queries";

export default function ApplicationsPage() {
  const router = useRouter();
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const session = useSession();
  const counts = useFetchJobApplicationsOverview(session.data === true);
  const overview = counts.data;
  const totalApplications = Object.values(overview ?? {}).reduce(
    (total, count) => total + count,
    0,
  );

  useEffect(() => {
    if (session.data === false) router.replace("/login");
  }, [session.data, router]);

  if (session.isError && session.data === undefined) {
    return (
      <main className={styles.main}>
        <RequestError onRetry={() => session.refetch()}>Couldn’t check your session.</RequestError>
      </main>
    );
  }

  return (
    <div className={styles.container}>
      {session.data && (
        <>
          <Navbar />
          <main className={styles.main}>
            <header className={styles.pageHeader}>
              <div className={styles.title}>
                <h1>Applications</h1>
                {overview && <span>{totalApplications}</span>}
              </div>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => setIsAddApplicationOpen(true)}
                aria-haspopup="dialog"
              >
                <Image
                  src="/icons/plus.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
                <span className={styles.desktopLabel}>Add application</span>
                <span className={styles.mobileLabel}>Add</span>
              </button>
            </header>
            {counts.isError && (
              <RequestError onRetry={() => counts.refetch()}>Couldn’t load application counts.</RequestError>
            )}
            <ApplicationsTable
              overview={overview}
              totalApplications={totalApplications}
            />
          </main>
          {isAddApplicationOpen && (
            <AddApplicationModal
              onClose={() => setIsAddApplicationOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
