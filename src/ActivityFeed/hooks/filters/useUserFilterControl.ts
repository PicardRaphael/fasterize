import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';

export const useUserFilterControl = () => {
  const { values, options } = useActivityFeedStore(
    (state) => ({
      values: state.filters.users,
      options: state.userOptions,
    }),
    shallow
  );
  const { setUsers } = useFilterTransition();

  return { values, setUsers, options };
};

export default useUserFilterControl;
