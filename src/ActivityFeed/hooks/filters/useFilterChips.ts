import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useFilterChips = () =>
  useActivityFeedStore(
    (state) => ({
      statuses: state.filters.statuses,
      types: state.filters.types,
      users: state.filters.users,
      dateRange: state.filters.dateRange,
      userOptions: state.userOptions,
      setStatuses: state.setStatuses,
      setTypes: state.setTypes,
      setUsers: state.setUsers,
      setDateRange: state.setDateRange,
      activeCount:
        state.filters.statuses.length +
        state.filters.types.length +
        state.filters.users.length +
        Number(
          Boolean(state.filters.dateRange.start || state.filters.dateRange.end)
        ),
    }),
    shallow
  );

export default useFilterChips;
