import type {
  Activity,
  ActivityFilters,
  PaginatedResult,
} from '../../types/activity.type';
import { paginateItems } from '../page';
import { matchesAllFilters } from './filters';

export const getActivitiesPage = (
  activities: Activity[],
  filters: ActivityFilters,
  pageIndex: number,
  pageSize: number
): PaginatedResult<Activity> => {
  const filtered = activities.filter((activity) =>
    matchesAllFilters(activity, filters)
  );

  return {
    items: paginateItems(filtered, pageIndex, pageSize),
    totalCount: filtered.length,
  };
};
