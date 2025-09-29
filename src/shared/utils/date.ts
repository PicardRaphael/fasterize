import type { DateRangeValue } from '../types/activity.type';

const fmt = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
});

export const formatDateRange = (range: DateRangeValue) => {
  const { start, end } = range;
  if (!start && !end) return 'Calendar';
  if (start && end) return `${fmt.format(start)} - ${fmt.format(end)}`;
  if (start) return `Since ${fmt.format(start)}`;
  return `Until ${fmt.format(end as Date)}`;
};

export const sameDate = (a: Date | null, b: Date | null) => {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.getTime() === b.getTime();
};
export const normalizeDate = (value: Date | null) =>
  value ? new Date(value) : null;
