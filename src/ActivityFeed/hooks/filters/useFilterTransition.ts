import { useMemo, useTransition } from 'react';
import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import type {
  ActivityStatus,
  DateRangeValue,
} from '../../../shared/types/activity.type';

export const useFilterTransition = () => {
  const [isPending, startTransition] = useTransition();

  const store = useActivityFeedStore(
    (state) => ({
      setStatuses: state.setStatuses,
      setTypes: state.setTypes,
      setUsers: state.setUsers,
      setDateRange: state.setDateRange,
      setSearch: state.setSearch,
      clearFilters: state.clearFilters,
    }),
    shallow
  );

  return useMemo(
    () => ({
      isPending,
      setStatuses: (values: ActivityStatus[]) => {
        startTransition(() => store.setStatuses(values));
      },
      setTypes: (values: string[]) => {
        startTransition(() => store.setTypes(values));
      },
      setUsers: (values: number[]) => {
        startTransition(() => store.setUsers(values));
      },
      setDateRange: (range: DateRangeValue) => {
        startTransition(() => store.setDateRange(range));
      },
      setSearch: (query: string) => {
        startTransition(() => store.setSearch(query));
      },
      clearFilters: () => {
        startTransition(() => store.clearFilters());
      },
    }),
    [isPending, startTransition, store]
  );
};
