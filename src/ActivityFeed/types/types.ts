import type {
  Activity,
  ActivityStatus,
  ActivityUser,
  DateRangeValue,
} from '../../shared/types/activity.type';

export interface ActivityFilterState {
  statuses: ActivityStatus[];
  types: string[];
  users: number[];
  dateRange: DateRangeValue;
  search: string;
}

export interface PaginationState {
  page: number;
  perPage: number;
}

export interface ActivityFeedState {
  activities: Activity[];
  statusOptions: ActivityStatus[];
  typeOptions: string[];
  userOptions: ActivityUser[];
  filters: ActivityFilterState;
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

export type { Activity, ActivityStatus, ActivityUser, DateRangeValue };
