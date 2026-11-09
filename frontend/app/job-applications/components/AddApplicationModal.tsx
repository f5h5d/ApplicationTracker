import Image from "next/image";
import styles from "./add-application-modal.module.css";

export default function AddApplicationModal() {
  return (
    <div className={styles.overlay}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-application-title"
      >
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
            Company *<input placeholder="e.g. Shopify" readOnly />
          </label>
          <label className={styles.role}>
            Role *<input placeholder="e.g. Backend Developer Co-op" readOnly />
          </label>
          <label className={styles.jobLink}>
            Job link
            <input placeholder="https://company.com/careers/role" readOnly />
          </label>
          <label className={styles.description}>
            Job description
            <textarea
              placeholder="Paste the posting to personalize your interview prep."
              readOnly
            />
          </label>
          <div className={styles.status}>
            <span id="status-label">Status</span>
            <button
              type="button"
              className={styles.select}
              aria-labelledby="status-label status-value"
            >
              <span id="status-value">Saved</span>
              <Image
                src="/icons/dropdown.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
              />
            </button>
          </div>
          <div className={styles.semester}>
            <span id="semester-label">Semester (optional)</span>
            <button
              type="button"
              className={styles.select}
              aria-labelledby="semester-label semester-value"
            >
              <span id="semester-value">Select semester</span>
              <Image
                src="/icons/dropdown.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
              />
            </button>
          </div>
          <label className={styles.deadline}>
            Deadline (optional)
            <input placeholder="YYYY-MM-DD" readOnly />
          </label>
          <label className={styles.notes}>
            Notes (optional)
            <textarea
              placeholder="Recruiter, referral, or anything to remember."
              readOnly
            />
          </label>
          <p className={styles.mobileHelp}>
            Only company and role are required.
          </p>
        </div>
        <footer className={styles.footer}>
          <p>Fields marked * are required.</p>
          <button type="button" className={styles.cancel}>
            Cancel
          </button>
          <button type="button" className={styles.add}>
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
    </div>
  );
}
