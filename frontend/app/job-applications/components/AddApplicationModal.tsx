"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getUpcomingSemesters } from "@/src/lib/job-applications/semesters";
import styles from "./add-application-modal.module.css";
import { useAddJobApplication } from "@/src/lib/job-applications/mutations";
import type { NewApplication } from "../types";

type AddApplicationModalProps = {
  onClose: () => void;
};

export default function AddApplicationModal({
  onClose,
}: AddApplicationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const semesters = getUpcomingSemesters();
  const [formValues, setFormValues] = useState<NewApplication>({
    companyName: "",
    role: "",
    jobUrl: "",
    jobDescription: "",
    status: "SAVED",
    semester: "",
    deadline: "",
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [error, setError] = useState("");
  const { mutate: addApplication } = useAddJobApplication();

  function updateField(field: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setError("");
  }

  const handleAddApplication = () => {
    if (formValues.companyName.length === 0) {
      setError("Company name is required.");
      return;
    }

    if (formValues.companyName.length > 255) {
      setError("Company name must be 255 characters or fewer.");
      return;
    }

    if (formValues.role.length === 0) {
      setError("Role is required.");
      return;
    }

    if (formValues.role.length > 100) {
      setError("Role must be 100 characters or fewer.");
      return;
    }

    setError("");
    addApplication(formValues);
    onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();

    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.overlay}
      aria-labelledby="add-application-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className={styles.dialog}>
        <div className={styles.handle} aria-hidden="true">
          <span />
        </div>
        <header className={styles.header}>
          <span className={styles.icon}>
            <Image
              src="/icons/modal-briefcase.svg"
              alt=""
              width={20}
              height={20}
              unoptimized
            />
          </span>
          <div>
            <h2 id="add-application-title">Add application</h2>
            <p>Save the details. Keep your next steps in view.</p>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close dialog"
            onClick={onClose}
          >
            <Image
              className={styles.desktopClose}
              src="/icons/modal-close.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
            <Image
              className={styles.mobileClose}
              src="/icons/mobile-modal-close.svg"
              alt=""
              width={18}
              height={18}
              unoptimized
            />
          </button>
        </header>
        <div className={styles.form}>
          <label className={styles.company}>
            Company *
            <input
              name="companyName"
              placeholder="e.g. Shopify"
              value={formValues.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
            />
          </label>
          <label className={styles.role}>
            Role *
            <input
              name="role"
              placeholder="e.g. Backend Developer Co-op"
              value={formValues.role}
              onChange={(event) => updateField("role", event.target.value)}
            />
          </label>
          <label className={styles.jobLink}>
            Job link
            <input
              name="jobUrl"
              placeholder="https://company.com/careers/role"
              value={formValues.jobUrl}
              onChange={(event) => updateField("jobUrl", event.target.value)}
            />
          </label>
          <label className={styles.description}>
            Job description
            <textarea
              name="jobDescription"
              placeholder="Paste the posting to personalize your interview prep."
              value={formValues.jobDescription}
              onChange={(event) =>
                updateField("jobDescription", event.target.value)
              }
            />
          </label>
          <label className={styles.status}>
            Status
            <select
              name="status"
              className={styles.select}
              value={formValues.status}
              onChange={(event) => updateField("status", event.target.value)}
            >
              <option value="SAVED">Saved</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </label>
          <label className={styles.semester}>
            Semester (optional)
            <select
              name="semester"
              className={styles.select}
              value={formValues.semester}
              onChange={(event) => updateField("semester", event.target.value)}
            >
              <option value="">Select semester</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.deadline}>
            Deadline (optional)
            <input
              name="deadline"
              placeholder="YYYY-MM-DD"
              value={formValues.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
            />
          </label>
          <label className={styles.notes}>
            Notes (optional)
            <textarea
              name="notes"
              placeholder="Recruiter, referral, or anything to remember."
              value={formValues.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <p className={styles.mobileHelp}>
            Only company and role are required.
          </p>
        </div>
        <footer className={styles.footer}>
          <p>Fields marked * are required.</p>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.add}
            onClick={handleAddApplication}
          >
            <Image
              src="/icons/plus.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
            />
            Add application
          </button>
        </footer>
      </section>
    </dialog>
  );
}
