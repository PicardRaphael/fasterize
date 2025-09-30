import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';

export const useStatusFilterControl = () => {
  const { values, options } = useActivityFeedStore(
    (state) => ({
      values: state.filters.statuses,
      options: state.statusOptions,
    }),
    shallow
  );
  const { setStatuses } = useFilterTransition();

  return { values, setStatuses, options };
};

export default useStatusFilterControl;
