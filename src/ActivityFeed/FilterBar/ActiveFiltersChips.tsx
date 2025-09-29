import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo, useMemo } from 'react';

import { formatDateRange } from '../../shared/utils/date';
import { statusLabel } from '../../shared/utils/status';
import { useFilterChips } from '../hooks/filters/useFilterChips';

const ActiveFiltersChips = () => {
  const {
    statuses,
    types,
    users,
    userOptions,
    dateRange,
    search,
    setStatuses,
    setTypes,
    setUsers,
    setDateRange,
    setSearch,
    activeCount,
  } = useFilterChips();

  const userLookup = useMemo(() => {
    const lookup = new Map<number, string>();
    userOptions.forEach((user) => lookup.set(user.id, user.name));
    return lookup;
  }, [userOptions]);

  const isPending = false;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {search ? (
        <Chip label={`Search: ${search}`} onDelete={() => setSearch('')} />
      ) : null}
      {dateRange.start || dateRange.end ? (
        <Chip
          label={formatDateRange(dateRange)}
          onDelete={() => setDateRange({ start: null, end: null })}
        />
      ) : null}
      {statuses.map((status) => (
        <Chip
          key={status}
          label={statusLabel[status]}
          onDelete={() =>
            setStatuses(statuses.filter((value) => value !== status))
          }
        />
      ))}
      {types.map((type) => (
        <Chip
          key={type}
          label={type}
          onDelete={() => setTypes(types.filter((value) => value !== type))}
        />
      ))}
      {users.map((userId) => {
        const label = userLookup.get(userId) ?? `User ${userId}`;
        return (
          <Chip
            key={userId}
            label={label}
            onDelete={() => setUsers(users.filter((value) => value !== userId))}
          />
        );
      })}
      <div className='flex-1' />
      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        className='text-sm text-slate-500'
      >
        <Typography
          variant='body2'
          className='text-sm font-medium text-slate-500'
        >
          {activeCount} active filter{activeCount > 1 ? 's' : ''}
        </Typography>
        {isPending ? (
          <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500'>
            <CircularProgress size={14} thickness={6} />
          </span>
        ) : null}
      </Stack>
    </div>
  );
};

export default memo(ActiveFiltersChips);
