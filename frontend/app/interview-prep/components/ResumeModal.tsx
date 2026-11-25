"use client";

import { FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "../../job-applications/components/add-application-modal.module.css";
import prepStyles from "../page.module.css";
import { useAddResume } from "@/src/lib/interview-prep/mutations";
import { useFetchRecentResume } from "@/src/lib/interview-prep/queries";
import RequestError from "@/src/lib/components/RequestError";

type ResumeModalProps = {
  onClose: () => void;
};

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    data: savedText = "",
    isLoading,
    isError: loadFailed,
    refetch,
  } = useFetchRecentResume();
  const [editedText, setEditedText] = useState<string | null>(null);
  const draft = editedText ?? savedText;

  const { mutate: addResume, isPending, isError: saveFailed } = useAddResume();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  function dismiss() {
    dialogRef.current?.close();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.overlay}
      aria-labelledby="resume-title"
      aria-describedby="resume-hint"
      onCancel={(event) => {
        event.preventDefault();
        if (!isPending) dismiss();
      }}
      onClick={(event) => {
        if (!isPending && event.target === event.currentTarget) dismiss();
      }}
    >
      <section className={`${styles.dialog} ${styles.noteDialog}`}>
        <div className={styles.handle} aria-hidden="true">
          <span />
        </div>
        <header className={styles.header}>
          <span className={styles.icon}>
            <FileText size={20} aria-hidden="true" />
          </span>
          <h2 id="resume-title">
            {savedText ? "Update resume" : "Add resume"}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close dialog"
            onClick={dismiss}
            disabled={isPending}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <form
          id="resume-form"
          className={`${styles.form} ${styles.noteForm}`}
          onSubmit={(event) => {
            event.preventDefault();
            const text = draft.trim();
            if (text && !isPending) addResume(text, { onSuccess: dismiss });
          }}
        >
          <label>
            Resume text
            <textarea
              name="resume"
              placeholder="Paste your resume here…"
              value={draft}
              required
              disabled={isPending}
              onChange={(event) => setEditedText(event.target.value)}
            />
          </label>
          <p id="resume-hint" className={prepStyles.resumeHint}>
            {isLoading
              ? "Loading your resume…"
              : "Paste or edit your resume as plain text."}
          </p>
          {loadFailed && (
            <RequestError onRetry={() => refetch()}>Couldn’t load your saved resume.</RequestError>
          )}
          {saveFailed && (
            <p role="alert" className={styles.error}>
              Couldn’t save your resume. Please try again.
            </p>
          )}
        </form>
        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancel}
            onClick={dismiss}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="resume-form"
            className={styles.add}
            disabled={!draft.trim() || isPending}
          >
            {isPending ? "Saving…" : "Save resume"}
          </button>
        </footer>
      </section>
    </dialog>
  );
}
