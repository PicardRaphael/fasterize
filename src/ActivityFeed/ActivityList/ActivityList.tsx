import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Activity } from '../../shared/types/activity.type';
import ActivityItem from './ActivityItem';

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  if (!activities.length) {
    return (
      <Paper
        elevation={0}
        className='rounded-2xl border border-slate-100 bg-slate-50 py-10 text-center'
      >
        <Stack spacing={1.5} alignItems='center'>
          <Typography
            variant='h6'
            className='text-base font-semibold text-slate-600'
          >
            No activities match the applied filters.
          </Typography>
          <Typography variant='body2' className='text-sm text-slate-400'>
            Adjust the filters or reset them to show all activities.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      className='overflow-hidden rounded-2xl border border-slate-100'
    >
      <Stack>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </Stack>
    </Paper>
  );
};

export default ActivityList;


