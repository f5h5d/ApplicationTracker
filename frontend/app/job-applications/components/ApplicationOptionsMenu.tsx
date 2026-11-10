"use client";

import Image from "next/image";
import { Pencil, StickyNote, Trash2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { application } from "../types";
import styles from "./applications-table.module.css";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import { useDeleteJobApplication } from "@/src/lib/job-applications/mutations";

export default function ApplicationOptionsMenu({
  application,
}: {
  application: application;
}) {
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<"edit" | "note" | null>(null);

  const { mutate: deleteApplication } = useDeleteJobApplication(application.id);

  function closeMenu() {
    menuRef.current?.hidePopover();
    triggerRef.current?.focus();
  }

  function openMenu() {
    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu || !trigger) return;

    if (!menu.matches(":popover-open")) menu.showPopover();
    const anchor = trigger.getBoundingClientRect();
    const bounds = menu.getBoundingClientRect();
    const left = Math.max(
      8,
      Math.min(
        anchor.right - bounds.width,
        window.innerWidth - bounds.width - 8,
      ),
    );
    const top =
      anchor.bottom + bounds.height + 8 <= window.innerHeight - 8
        ? anchor.bottom + 8
        : Math.max(8, anchor.top - bounds.height - 8);

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.querySelector<HTMLButtonElement>("button")?.focus();
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === "Tab") {
      menuRef.current?.hidePopover();
      return;
    }

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
    );
    const current = items.findIndex((item) => item === document.activeElement);
    let next: number;

    switch (event.key) {
      case "ArrowDown":
        next = (current + 1) % items.length;
        break;
      case "ArrowUp":
        next = (current - 1 + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    items[next]?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;

    const dismiss = () => menuRef.current?.hidePopover();
    window.addEventListener("resize", dismiss);
    window.addEventListener("scroll", dismiss, true);
    return () => {
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("scroll", dismiss, true);
    };
  }, [isOpen]);

  const handleDelete = () => {
    deleteApplication();
    closeMenu();
  };

  return (
    <div className={styles.more}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.optionsTrigger}
        aria-label={`More options for ${application.companyName}, ${application.role}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        popoverTarget={menuId}
        onClick={(event) => {
          event.preventDefault();
          if (menuRef.current?.matches(":popover-open")) closeMenu();
          else openMenu();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
            if (event.key === "ArrowUp") {
              menuRef.current
                ?.querySelector<HTMLButtonElement>("button:last-child")
                ?.focus();
            }
          }
        }}
      >
        <Image
          className={styles.desktopText}
          src="/icons/more.svg"
          alt=""
          width={16}
          height={16}
          unoptimized
        />
        <Image
          className={styles.mobileText}
          src="/icons/mobile-more.svg"
          alt=""
          width={18}
          height={18}
          unoptimized
        />
      </button>
      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        role="menu"
        aria-label={`Actions for ${application.companyName}, ${application.role}`}
        className={styles.optionsMenu}
        onToggle={(event) => setIsOpen(event.newState === "open")}
        onKeyDown={handleMenuKeyDown}
      >
        <button
          type="button"
          role="menuitem"
          tabIndex={-1}
          className={styles.optionsItem}
          onClick={() => {
            closeMenu();
            setModal("edit");
          }}
        >
          <Pencil size={16} strokeWidth={1.7} aria-hidden="true" />
          Edit
        </button>
        <button
          type="button"
          role="menuitem"
          tabIndex={-1}
          className={styles.optionsItem}
          onClick={() => {
            closeMenu();
            setModal("note");
          }}
        >
          <StickyNote size={16} strokeWidth={1.7} aria-hidden="true" />
          View note
        </button>
        <div role="separator" className={styles.optionsSeparator} />
        <button
          type="button"
          role="menuitem"
          tabIndex={-1}
          className={`${styles.optionsItem} ${styles.deleteOption}`}
          onClick={handleDelete}
        >
          <Trash2 size={16} strokeWidth={1.7} aria-hidden="true" />
          Delete
        </button>
      </div>
      {modal && (
        <ApplicationDetailsModal
          application={application}
          mode={modal}
          onClose={() => {
            setModal(null);
            triggerRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}
