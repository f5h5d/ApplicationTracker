import { CircleUserRound } from "lucide-react";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.tabs} aria-label="Main navigation">
        <button
          type="button"
          className={`${styles.tab} ${styles.active}`}
          aria-current="page"
        >
          Applications
        </button>
        <button type="button" className={styles.tab}>
          Interview prep
        </button>
      </nav>
      <button type="button" className={styles.user} aria-label="User account">
        <CircleUserRound size={24} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </header>
  );
}
