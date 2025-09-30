// Compute filtered + paginated results from the store in a memoized way.
// - Memoized predicate (implicit via filters) and O(n) single-pass page selection.
// - Returns a stable shape to help consuming components avoid extra re-renders.
import { useEffect, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useActivityFeedStore } from '../store/context';
import { getActivitiesPage } from '../../shared/utils/activities/getActivitiesPage';

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

  // Clamp page to the last available page when filters/perPage change.
  useEffect(() => {
    const totalPages = Math.ceil(totalCount / Math.max(1, pagination.perPage));
    const maxPage = Math.max(0, totalPages - 1);
    if (pagination.page > maxPage) setPage(maxPage);
  }, [totalCount, pagination.perPage, pagination.page, setPage]);

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
