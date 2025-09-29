import { statusOrder } from '../../ActivityFeed/constants';
import type { Activity } from '../types/activity.type';
import { collectOptions } from './activityFilters';
import rawActivities from '../../data/activities.json';

const rawActivityList = rawActivities as Activity[];
const sortByCreatedAtDesc = (a: Activity, b: Activity) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

export const normalizeActivities = () => {
  const activities = rawActivityList.slice().sort(sortByCreatedAtDesc);
  const { statusOptions, typeOptions, userOptions } =
    collectOptions(activities);
  const orderedStatuses = statusOrder.filter((status) =>
    statusOptions.includes(status)
  );
  return {
    activities,
    statusOptions: orderedStatuses.length ? orderedStatuses : statusOrder,
    typeOptions,
    userOptions,
  };
};
