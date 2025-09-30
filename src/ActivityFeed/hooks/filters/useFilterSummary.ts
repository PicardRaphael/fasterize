import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';

export const useFilterSummary = () => {
  const { activeCount } = useActivityFeedStore(
    (state) => ({
      activeCount:
        state.filters.statuses.length +
        state.filters.types.length +
        state.filters.users.length +
        Number(
          Boolean(state.filters.dateRange.start || state.filters.dateRange.end)
        ) +
        Number(Boolean(state.filters.search)),
    }),
    shallow
  );
  const { clearFilters } = useFilterTransition();

  return { activeCount, clearFilters };
};

export default useFilterSummary;
