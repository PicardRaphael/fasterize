import type {
  Activity,
  ActivityStatus,
  ActivityUser,
  DateRangeValue,
} from '../types/activity.type';

// Fonction simple: filtre et pagine les activités.
export const getActivitiesPage = (
  activities: Activity[],
  filters: {
    statuses: ActivityStatus[];
    types: string[];
    users: number[];
    dateRange: DateRangeValue;
  },
  pageIndex: number,
  pageSize: number
) => {
  const statusSet = new Set<ActivityStatus>(filters.statuses);
  const typeSet = new Set<string>(filters.types);
  const userSet = new Set<number>(filters.users);

  const start = filters.dateRange.start
    ? new Date(filters.dateRange.start)
    : null;
  if (start) start.setHours(0, 0, 0, 0);
  const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
  if (end) end.setHours(23, 59, 59, 999);

  const firstIndex = pageIndex * pageSize;
  const lastIndexExclusive = firstIndex + pageSize;

  const page: Activity[] = [];
  let total = 0;

  for (let i = 0; i < activities.length; i++) {
    const a = activities[i];
    if (statusSet.size && !statusSet.has(a.status)) continue;
    if (typeSet.size && !typeSet.has(a.type)) continue;
    if (userSet.size && !userSet.has(a.userId)) continue;

    if (start || end) {
      const createdAt = new Date(a.createdAt);
      if (start && createdAt < start) continue;
      if (end && createdAt > end) continue;
    }

    if (total >= firstIndex && total < lastIndexExclusive) page.push(a);
    total++;
  }

  return { items: page, totalCount: total };
};

// Collect options once from a dataset
export const collectOptions = (activities: Activity[]) => {
  const statusSet = new Set<ActivityStatus>();
  const typeSet = new Set<string>();
  const userMap = new Map<number, ActivityUser>();

  for (let i = 0; i < activities.length; i++) {
    const a = activities[i];
    statusSet.add(a.status);
    typeSet.add(a.type);
    if (!userMap.has(a.userId)) userMap.set(a.userId, a.user);
  }

  const statusOptions = Array.from(statusSet);
  const typeOptions = Array.from(typeSet).sort();
  const userOptions = Array.from(userMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return { statusOptions, typeOptions, userOptions };
};

export default {
  getActivitiesPage,
  collectOptions,
};
