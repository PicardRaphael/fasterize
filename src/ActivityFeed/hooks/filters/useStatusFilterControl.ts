import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useStatusFilterControl = () =>
  useActivityFeedStore(
    (state) => ({
      values: state.filters.statuses,
      setStatuses: state.setStatuses,
      options: state.statusOptions,
    }),
    shallow
  );

export default useStatusFilterControl;
