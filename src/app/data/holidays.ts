export interface Holiday {
  name: string;
  /** ISO date of the next occurrence */
  date: string;
}

const HOLIDAY_SELECTION_KEY = 'makerpilotHolidaySelection';

/**
 * Master list of holidays offered in Account → Holiday Countdown.
 * Dates are the next occurrence relative to mid-2026 (already-passed 2026 dates roll to 2027).
 */
export const ALL_HOLIDAYS: Holiday[] = [
  { name: "Valentine's Day", date: '2027-02-14' },
  { name: "St. Patrick's Day", date: '2027-03-17' },
  { name: 'Easter', date: '2027-03-28' },
  { name: "Mother's Day", date: '2027-05-09' },
  { name: "Father's Day", date: '2027-06-20' },
  { name: 'Independence Day', date: '2027-07-04' },
  { name: 'Halloween', date: '2026-10-31' },
  { name: 'Black Friday', date: '2026-11-27' },
  { name: 'Hanukkah', date: '2026-12-04' },
  { name: 'Christmas', date: '2026-12-25' },
  { name: "New Year's Eve", date: '2026-12-31' },
];

/** Holiday(s) enabled by default until the user changes their selection. */
const DEFAULT_ENABLED = ['Black Friday'];

/** Names of the holidays the user has enabled (defaults to Black Friday). */
export function getEnabledHolidayNames(): string[] {
  try {
    const raw = localStorage.getItem(HOLIDAY_SELECTION_KEY);
    if (!raw) return [...DEFAULT_ENABLED];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [...DEFAULT_ENABLED];
  } catch {
    return [...DEFAULT_ENABLED];
  }
}

export function isHolidayEnabled(name: string): boolean {
  return getEnabledHolidayNames().includes(name);
}

/**
 * Enable/disable a holiday; returns the updated list (ordered like ALL_HOLIDAYS).
 * At least one holiday must always stay selected — turning off the last one is ignored.
 */
export function setHolidayEnabled(name: string, enabled: boolean): string[] {
  const current = new Set(getEnabledHolidayNames());
  if (enabled) {
    current.add(name);
  } else {
    // Keep the last remaining holiday on (default starts as Black Friday).
    if (current.size <= 1 && current.has(name)) {
      return ALL_HOLIDAYS.map((h) => h.name).filter((n) => current.has(n));
    }
    current.delete(name);
  }
  const next = ALL_HOLIDAYS.map((h) => h.name).filter((n) => current.has(n));
  try {
    localStorage.setItem(HOLIDAY_SELECTION_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

/** All enabled holidays that are still upcoming, sorted soonest-first. */
export function upcomingHolidays(now: number = Date.now()): { name: string; days: number }[] {
  const enabled = new Set(getEnabledHolidayNames());
  return ALL_HOLIDAYS
    .filter((h) => enabled.has(h.name))
    .map((h) => ({
      name: h.name,
      days: Math.ceil((new Date(h.date).getTime() - now) / (24 * 60 * 60 * 1000)),
    }))
    .filter((h) => h.days >= 0)
    .sort((a, b) => a.days - b.days);
}

/** The nearest upcoming enabled holiday, or null. */
export function nextHoliday(now: number = Date.now()): { name: string; days: number } | null {
  return upcomingHolidays(now)[0] ?? null;
}
