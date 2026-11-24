"use client";

import { FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "../../job-applications/components/add-application-modal.module.css";
import prepStyles from "../page.module.css";
import { useAddResume } from "@/src/lib/interview-prep/mutations";
import { useFetchRecentResume } from "@/src/lib/interview-prep/queries";

type ResumeModalProps = {
  resume: string;
  onSave: (resume: string) => void;
  onClose: () => void;
};

export default function ResumeModal({
  resume,
  onSave,
  onClose,
}: ResumeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data: currentResume } = useFetchRecentResume();
  const [editedText, setEditedText] = useState<string | null>(null);
  const savedText = currentResume ?? resume;
  const draft = editedText ?? savedText;

  const { mutate: addResume } = useAddResume();

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
        dismiss();
      }}
      onClick={(event) => {
        // Dismiss the modal if the user clicks outside of the dialog content
        if (event.target === event.currentTarget) dismiss();
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
          <h2 id="resume-title">{savedText ? "Update resume" : "Add resume"}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close dialog"
            onClick={dismiss}
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
            if (text) {
              addResume(text);
              dialogRef.current?.close();
              onSave(text);
            }
          }}
        >
          <label>
            Resume text
            <textarea
              name="resume"
              placeholder="Paste your resume here…"
              value={draft}
              required
              onChange={(event) => setEditedText(event.target.value)}
            />
          </label>
          <p id="resume-hint" className={prepStyles.resumeHint}>
            Paste or edit your resume as plain text.
          </p>
        </form>
        <footer className={styles.footer}>
          <button type="button" className={styles.cancel} onClick={dismiss}>
            Cancel
          </button>
          <button
            type="submit"
            form="resume-form"
            className={styles.add}
            disabled={!draft.trim()}
          >
            Save resume
          </button>
        </footer>
      </section>
    </dialog>
  );
}
