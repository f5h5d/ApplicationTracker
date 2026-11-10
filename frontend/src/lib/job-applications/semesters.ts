const semesterStarts = [
  { name: "Winter", month: 0 },
  { name: "Summer", month: 4 },
  { name: "Fall", month: 8 },
];

export function getUpcomingSemesters(today = new Date()): string[] {
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const semesters: string[] = [];

  for (let year = today.getFullYear(); semesters.length < 8; year++) {
    for (const { name, month } of semesterStarts) {
      if (new Date(year, month, 1) >= startOfToday) {
        semesters.push(`${name} ${String(year).slice(-2)}`);
      }
    }
  }

  return semesters.slice(0, 8);
}
