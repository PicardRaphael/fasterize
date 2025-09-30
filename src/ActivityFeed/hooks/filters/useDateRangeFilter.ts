import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';

export const useDateRangeFilter = () => {
  const { value } = useActivityFeedStore(
    (state) => ({
      value: state.filters.dateRange,
    }),
    shallow
  );
  const { setDateRange } = useFilterTransition();

  return { value, setDateRange };
};

export default useDateRangeFilter;
