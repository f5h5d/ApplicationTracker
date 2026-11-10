"use client";

import { Pencil, StickyNote, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useUpdateJobApplication } from "@/src/lib/job-applications/mutations";
import type { application } from "../types";
import styles from "./add-application-modal.module.css";

const statuses: application["status"][] = [
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export default function ApplicationDetailsModal({
  application,
  mode,
  onClose,
}: {
  application: application;
  mode: "edit" | "note";
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const formId = useId();
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes ?? "");
  const {
    mutate: updateJobApplication,
    isPending: isJobApplicationPending,
    isError: isJobApplicationError,
  } = useUpdateJobApplication(application.id, onClose);
  const isEditing = mode === "edit";
  const Icon = isEditing ? Pencil : StickyNote;

  function closeModal() {
    if (!isJobApplicationPending) onClose();
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode !== "edit" || isJobApplicationPending) return;

    updateJobApplication({ status, notes });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.overlay}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={isJobApplicationPending}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        className={`${styles.dialog} ${isEditing ? "" : styles.noteDialog}`}
      >
        <div className={styles.handle} aria-hidden="true">
          <span />
        </div>
        <header className={styles.header}>
          <span className={styles.icon}>
            <Icon size={20} aria-hidden="true" />
          </span>
          <div className={styles.headerDetails}>
            <h2 id={titleId}>
              {isEditing ? "Edit application" : "Application note"}
            </h2>
            <p id={descriptionId}>
              {application.companyName} · {application.role}
            </p>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close dialog"
            onClick={closeModal}
            disabled={isJobApplicationPending}
          >
            <X size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </header>
        <form
          id={formId}
          className={`${styles.form} ${isEditing ? "" : styles.noteForm}`}
          onSubmit={handleSave}
        >
          {isEditing && (
            <>
              <label className={styles.company}>
                Company
                <input
                  name="companyName"
                  value={application.companyName}
                  readOnly
                />
              </label>
              <label className={styles.role}>
                Role
                <input name="role" value={application.role} readOnly />
              </label>
              <label className={styles.jobLink}>
                Job link
                <input
                  name="jobUrl"
                  value={application.jobUrl ?? ""}
                  placeholder="Not specified"
                  readOnly
                />
              </label>
              <label className={styles.description}>
                Job description
                <textarea
                  name="jobDescription"
                  value={application.jobDescription ?? ""}
                  placeholder="Not specified"
                  readOnly
                />
              </label>
              <label className={styles.status}>
                Status
                <select
                  name="status"
                  className={styles.select}
                  value={status}
                  disabled={isJobApplicationPending}
                  onChange={(event) => {
                    const selected = statuses.find(
                      (value) => value === event.target.value,
                    );
                    if (selected) setStatus(selected);
                  }}
                >
                  {statuses.map((value) => (
                    <option key={value} value={value}>
                      {value[0] + value.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.semester}>
                Semester
                <input
                  name="semester"
                  value={application.semester ?? ""}
                  placeholder="Not specified"
                  readOnly
                />
              </label>
              <label className={styles.deadline}>
                Deadline
                <input
                  name="deadline"
                  value={application.deadline ?? ""}
                  placeholder="Not specified"
                  readOnly
                />
              </label>
            </>
          )}
          <label className={styles.notes}>
            {isEditing ? "Notes (optional)" : "Note"}
            <textarea
              name="notes"
              value={notes}
              readOnly={!isEditing}
              disabled={isJobApplicationPending}
              placeholder={
                isEditing
                  ? "Recruiter, referral, or anything to remember."
                  : "No notes have been added."
              }
              onChange={(event) => {
                setNotes(event.target.value);
              }}
            />
          </label>
          {isJobApplicationError && (
            <p className={styles.error} role="alert">
              Unable to save changes. Please try again.
            </p>
          )}
        </form>
        <footer className={styles.footer}>
          {isEditing && <p>Only status and notes can be changed.</p>}
          <button
            type="button"
            className={styles.cancel}
            onClick={closeModal}
            disabled={isJobApplicationPending}
          >
            {isEditing ? "Cancel" : "Close"}
          </button>
          {isEditing && (
            <button
              type="submit"
              form={formId}
              className={styles.add}
              disabled={isJobApplicationPending}
            >
              {isJobApplicationPending ? "Saving…" : "Save changes"}
            </button>
          )}
        </footer>
      </section>
    </dialog>
  );
}
