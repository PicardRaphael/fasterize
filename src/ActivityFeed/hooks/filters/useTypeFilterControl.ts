import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';

export const useTypeFilterControl = () =>
  useActivityFeedStore(
    (state) => ({
      values: state.filters.types,
      setTypes: state.setTypes,
      options: state.typeOptions,
    }),
    shallow
  );

export default useTypeFilterControl;
