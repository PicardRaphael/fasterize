// Utilities to normalize the dataset once (sort + distinct options).
import type { Activity } from '../../types/activity.type';
import rawActivities from '../../../data/activities.json';
import { collectOptions } from '../collectOptionsFilters';

const rawActivityList = rawActivities as Activity[];
const sortByCreatedAtDesc = (a: Activity, b: Activity) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

// Sort activities by createdAt (desc) and compute distinct filter options.
export const normalizeActivities = () => {
  const activities = rawActivityList.slice().sort(sortByCreatedAtDesc);

  const { statusOptions, typeOptions, userOptions } =
    collectOptions(activities);

  return {
    activities,
    statusOptions,
    typeOptions,
    userOptions,
  };
};
