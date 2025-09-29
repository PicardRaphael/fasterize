import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ActivityList from './ActivityList';
import PaginationBar from './PaginationBar';
import { useActivityResults } from '../hooks/useActivityResults';

export default function ActivityListContainer() {
  const { items, totalCount } = useActivityResults();
  return (
    <Stack spacing={2} className='px-1'>
      <Typography
        variant='subtitle2'
        className='text-sm font-medium text-slate-500'
      >
        {totalCount} {totalCount === 1 ? 'activity' : 'activities'} found
      </Typography>
      <ActivityList activities={items} />
      <PaginationBar />
    </Stack>
  );
}
