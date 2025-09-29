import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useUserFilterControl = () =>
  useActivityFeedStore(
    (state) => ({
      values: state.filters.users,
      setUsers: state.setUsers,
      options: state.userOptions,
    }),
    shallow
  );

export default useUserFilterControl;
