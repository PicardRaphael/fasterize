import type {
  Activity,
  ActivityFilters,
  ActivityStatus,
  ActivityUser,
  DateRangeValue,
} from '../../shared/types/activity.type';

interface PaginationState {
  page: number;
  perPage: number;
}

export interface ActivityFeedState {
  activities: Activity[];
  statusOptions: ActivityStatus[];
  typeOptions: string[];
  userOptions: ActivityUser[];
  filters: ActivityFilters;
  pagination: PaginationState;
  setStatuses: (values: ActivityStatus[]) => void;
  setTypes: (values: string[]) => void;
  setUsers: (values: number[]) => void;
  setDateRange: (range: DateRangeValue) => void;
  setSearch: (q: string) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPerPage: (size: number) => void;
}
