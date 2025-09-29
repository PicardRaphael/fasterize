import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../store/context';
import { getActivitiesPage } from '../../shared/utils/activityFilters';

export const useActivityResults = () => {
  const { activities, filters, pagination, setPage, setPerPage } =
    useActivityFeedStore(
      (state) => ({
        activities: state.activities,
        filters: state.filters,
        pagination: state.pagination,
        setPage: state.setPage,
        setPerPage: state.setPerPage,
      }),
      shallow
    );

  const { items, totalCount } = useMemo(
    () =>
      getActivitiesPage(
        activities,
        filters,
        pagination.page,
        pagination.perPage
      ),
    [activities, filters, pagination.page, pagination.perPage]
  );

  return {
    items,
    totalCount,
    page: pagination.page,
    perPage: pagination.perPage,
    setPage,
    setPerPage,
  };
};

export default useActivityResults;
