import styles from "./request-error.module.css";

export default function RequestError({
  children,
  onRetry,
}: {
  children: string;
  onRetry: () => void;
}) {
  return (
    <div className={styles.notice}>
      <p role="alert">{children}</p>
      <button type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}
