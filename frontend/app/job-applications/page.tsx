"use client";

import Image from "next/image";
import { useState } from "react";
import AddApplicationModal from "./components/AddApplicationModal";
import ApplicationsTable from "./components/ApplicationsTable";
import Navbar from "@/src/lib/components/Navbar";
import styles from "./page.module.css";

export default function ApplicationsPage() {
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <div>
            <div className={styles.title}>
              <h1>Applications</h1>
              <span>12</span>
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
        <ApplicationsTable />
      </main>
      {isAddApplicationOpen && (
        <AddApplicationModal onClose={() => setIsAddApplicationOpen(false)} />
      )}
    </div>
  );
}
