import type { Activity, ActivityStatus } from '../types/activity.type';

/**
 * getActivitiesPage
 *
 * Purpose
 * - Apply filters (status, type, user, date) and then extract the requested page.
 * - Optimize for readability and predictable UX.
 *
 * Principles
 * - “Filter then slice”: filter the full array first, then take the sub‑array for the page.
 *   For our local demo dataset (~25+ items), this is clearer than a one‑pass implementation
 *   and perfectly fine performance‑wise.
 * - Inclusive calendar range: from start‑of‑day (00:00:00) to end‑of‑day (23:59:59.999)
 *   in local time. This matches the common expectation that “12 to 14” includes the whole 14th.
 * - Use Sets for multi‑select filters: O(1) membership checks and simple code.
 *
 * Notes
 * - `createdAt` timestamps are ISO (UTC). Converting to local Date and clamping to local
 *   day boundaries yields a result aligned with the date pickers’ presentation.
 * - If the dataset grows significantly, we can switch back to a one‑pass approach without
 *   changing the external behavior.
 */
export const getActivitiesPage = (
  activities: Activity[],
  filters: {
    statuses: ActivityStatus[];
    types: string[];
    users: number[];
    dateRange: { start: Date | null; end: Date | null };
    search: string;
  },
  pageIndex: number,
  pageSize: number
) => {
  // 1) Prepare sets for fast and readable membership checks.
  const statusSet = new Set<ActivityStatus>(filters.statuses);
  const typeSet = new Set<string>(filters.types);
  const userSet = new Set<number>(filters.users);

  // 2) Compute local start/end of day for an inclusive range.
  const startOfDayTimestamp = filters.dateRange.start
    ? new Date(filters.dateRange.start).setHours(0, 0, 0, 0)
    : null;
  const endOfDayTimestamp = filters.dateRange.end
    ? new Date(filters.dateRange.end).setHours(23, 59, 59, 999)
    : null;

  // 3) Apply active filters.
  const searchQuery = (filters.search ?? '').trim().toLowerCase();
  const hasSearchTerm = searchQuery.length > 0;

  const filtered = activities.filter((a) => {
    if (statusSet.size && !statusSet.has(a.status)) return false;
    if (typeSet.size && !typeSet.has(a.type)) return false;
    if (userSet.size && !userSet.has(a.userId)) return false;
    if (startOfDayTimestamp !== null || endOfDayTimestamp !== null) {
      const createdAtTimestamp = new Date(a.createdAt).getTime();
      if (
        startOfDayTimestamp !== null &&
        createdAtTimestamp < startOfDayTimestamp
      )
        return false;
      if (endOfDayTimestamp !== null && createdAtTimestamp > endOfDayTimestamp)
        return false;
    }
    if (hasSearchTerm) {
      const searchFields: Array<unknown> = [
        a.subject,
        a.description,
        a.supportTicket,
        a.requestId,
        a.applicationId,
        a.type,
        a.user?.name,
      ];
      let matched = false;
      for (let i = 0; i < searchFields.length; i++) {
        const v = searchFields[i];
        if (typeof v === 'string' && v.toLowerCase().includes(searchQuery)) {
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return true;
  });

  // 4) Count filtered total for the UI/pagination.
  const totalCount = filtered.length;

  // 5) Slice the requested page.
  const start = Math.max(0, pageIndex) * Math.max(1, pageSize);
  const items = filtered.slice(start, start + pageSize);

  return { items, totalCount };
};
