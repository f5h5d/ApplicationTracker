"use client";

import { CircleUserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useLogout } from "../login/mutations";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const profileMenu = useId();
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !profileRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isOpen]);

  return (
    <header className={styles.navbar}>
      <nav className={styles.tabs} aria-label="Main navigation">
        <Link href="/job-applications" className={styles.tab} aria-current={pathname === "/job-applications" ? "page" : undefined}>
          Applications
        </Link>
        <Link href="/interview-prep" className={styles.tab} aria-current={pathname === "/interview-prep" ? "page" : undefined}>
          Interview prep
        </Link>
      </nav>
      <div
        ref={profileRef}
        className={styles.profile}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.user}
          aria-label="Profile menu"
          aria-expanded={isOpen}
          aria-controls={profileMenu}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CircleUserRound size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div id={profileMenu} hidden={!isOpen} className={styles.profileMenu}>
          <button
            type="button"
            className={styles.logout}
            aria-disabled={logout.isPending}
            onClick={() => { if (!logout.isPending) logout.mutate(); }}
          >
            <LogOut size={16} strokeWidth={1.7} aria-hidden="true" />
            {logout.isPending ? "Logging out…" : "Log out"}
          </button>
          {logout.isError && (
            <p role="alert" className={styles.error}>Couldn’t log out. Try again.</p>
          )}
        </div>
      </div>
    </header>
  );
}
