import { createStore, type StoreApi } from 'zustand/vanilla';
import type { DateRangeValue } from '../../shared/types/activity.type';
import type { ActivityFeedState } from '../types/types';
import { normalizeDate, sameDate } from '../../shared/utils/date';
import { areArraysEqual } from '../../shared/utils/areArraysEqual';
import { normalizeActivities } from '../../shared/utils/activities/normalizeActivities';

export const createActivityFeedStore = (): StoreApi<ActivityFeedState> => {
  const { activities, statusOptions, typeOptions, userOptions } =
    normalizeActivities();

  return createStore<ActivityFeedState>((set) => ({
    activities,
    statusOptions,
    typeOptions,
    userOptions,
    filters: {
      statuses: [],
      types: [],
      users: [],
      dateRange: { start: null, end: null },
      search: '',
    },
    pagination: { page: 0, perPage: 15 },
    setStatuses: (values) =>
      set((state) =>
        areArraysEqual(state.filters.statuses, values)
          ? state
          : { filters: { ...state.filters, statuses: values.slice() } }
      ),
    setTypes: (values) =>
      set((state) =>
        areArraysEqual(state.filters.types, values)
          ? state
          : { filters: { ...state.filters, types: values.slice() } }
      ),
    setUsers: (values) =>
      set((state) =>
        areArraysEqual(state.filters.users, values)
          ? state
          : { filters: { ...state.filters, users: values.slice() } }
      ),
    setDateRange: (range) =>
      set((state) => {
        const nextRange: DateRangeValue = {
          start: normalizeDate(range.start),
          end: normalizeDate(range.end),
        };
        if (
          sameDate(state.filters.dateRange.start, nextRange.start) &&
          sameDate(state.filters.dateRange.end, nextRange.end)
        )
          return state;
        return { filters: { ...state.filters, dateRange: nextRange } };
      }),
    setSearch: (q) =>
      set((state) =>
        state.filters.search === q
          ? state
          : { filters: { ...state.filters, search: q } }
      ),
    clearFilters: () =>
      set((state) => ({
        filters: {
          statuses: [],
          types: [],
          users: [],
          dateRange: { start: null, end: null },
          search: '',
        },
        pagination: { ...state.pagination, page: 0 },
      })),
    setPage: (page) =>
      set((state) =>
        state.pagination.page === page
          ? state
          : { pagination: { ...state.pagination, page } }
      ),
    setPerPage: (size) =>
      set((state) =>
        state.pagination.perPage === size
          ? state
          : { pagination: { page: 0, perPage: size } }
      ),
  }));
};
