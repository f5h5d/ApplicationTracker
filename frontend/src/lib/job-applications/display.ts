const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatApplicationDate(value: string, withYear = false) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp)
    ? "—"
    : (withYear ? fullDate : shortDate).format(timestamp);
}

export function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function getPostingUrl(value: string | null | undefined) {
  const url = value?.trim();
  return url && /^https?:\/\//i.test(url) ? url : undefined;
}
