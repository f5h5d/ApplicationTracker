"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AddApplicationModal from "./components/AddApplicationModal";
import ApplicationsTable from "./components/ApplicationsTable";
import Navbar from "@/src/lib/components/Navbar";
import { useFetchJobApplicationsOverview } from "@/src/lib/job-applications/queries";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/login/queries";

export default function ApplicationsPage() {
  const router = useRouter();
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const { data: overview } = useFetchJobApplicationsOverview();
  const totalApplications = Object.values(overview ?? {}).reduce(
    (total, count) => total + count,
    0,
  );

  const { data: hasSession, isLoading: isLoadingHasSession } = useSession();

  // check if user is logged in, if not redirect to login page
  useEffect(() => {
    if (!isLoadingHasSession && !hasSession) {
      router.push("/login");
    }
  }, [hasSession, isLoadingHasSession, router]);

  return (
    <div className={styles.container}>
      {hasSession && (
        <>
          <Navbar />
          <main className={styles.main}>
            <header className={styles.pageHeader}>
              <div>
                <div className={styles.title}>
                  <h1>Applications</h1>
                  {overview && <span>{totalApplications}</span>}
                </div>
                <p>Your co-op search, organized.</p>
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
