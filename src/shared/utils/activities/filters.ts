import type {
  Activity,
  ActivityFilters,
  ActivityStatus,
} from '../../types/activity.type';
import { toEndOfDay, toStartOfDay } from '../date';

/**
 * Vérifie si une activité correspond à tous les filtres
 */
export const matchesAllFilters = (
  activity: Activity,
  filters: ActivityFilters
): boolean => {
  return (
    matchesStatusFilter(activity, filters.statuses) &&
    matchesTypeFilter(activity, filters.types) &&
    matchesUserFilter(activity, filters.users) &&
    matchesDateRangeFilter(activity, filters.dateRange) &&
    matchesSearchFilter(activity, filters.search)
  );
};

export const matchesStatusFilter = (
  activity: Activity,
  statuses: ActivityStatus[]
): boolean => {
  return statuses.length === 0 || statuses.includes(activity.status);
};

export const matchesTypeFilter = (
  activity: Activity,
  types: string[]
): boolean => {
  return types.length === 0 || types.includes(activity.type);
};

export const matchesUserFilter = (
  activity: Activity,
  users: number[]
): boolean => {
  return users.length === 0 || users.includes(activity.userId);
};

export const matchesDateRangeFilter = (
  activity: Activity,
  dateRange: { start: Date | null; end: Date | null }
): boolean => {
  const { start, end } = dateRange;

  if (!start && !end) return true;

  const activityTimestamp = new Date(activity.createdAt).getTime();
  const startTimestamp = start ? toStartOfDay(start) : -Infinity;
  const endTimestamp = end ? toEndOfDay(end) : Infinity;

  return (
    activityTimestamp >= startTimestamp && activityTimestamp <= endTimestamp
  );
};

export const matchesSearchFilter = (
  activity: Activity,
  search: string
): boolean => {
  const query = search.trim().toLowerCase();

  if (!query) return true;

  const searchableFields = [
    activity.subject,
    activity.description,
    activity.supportTicket,
    activity.requestId,
    activity.applicationId,
    activity.type,
    activity.user?.name,
  ];

  return searchableFields.some(
    (field) => typeof field === 'string' && field.toLowerCase().includes(query)
  );
};
