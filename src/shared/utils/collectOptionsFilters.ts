import type {
  Activity,
  ActivityStatus,
  ActivityUser,
} from '../types/activity.type';

// Collect distinct options (status/type/user) from a dataset once.
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
