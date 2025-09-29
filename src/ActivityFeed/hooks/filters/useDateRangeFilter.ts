import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useDateRangeFilter = () =>
  useActivityFeedStore(
    (state) => ({
      value: state.filters.dateRange,
      setDateRange: state.setDateRange,
    }),
    shallow
  );

export default useDateRangeFilter;
