import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useFilterSummary = () =>
  useActivityFeedStore(
    (state) => ({
      activeCount:
        state.filters.statuses.length +
        state.filters.types.length +
        state.filters.users.length +
        Number(
          Boolean(state.filters.dateRange.start || state.filters.dateRange.end)
        ),
      clearFilters: state.clearFilters,
    }),
    shallow
  );

export default useFilterSummary;
