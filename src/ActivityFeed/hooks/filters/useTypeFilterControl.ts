import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../../store/context';
import { useFilterTransition } from './useFilterTransition';

export const useTypeFilterControl = () => {
  const { values, options } = useActivityFeedStore(
    (state) => ({
      values: state.filters.types,
      options: state.typeOptions,
    }),
    shallow
  );
  const { setTypes } = useFilterTransition();

  return { values, setTypes, options };
};

export default useTypeFilterControl;
