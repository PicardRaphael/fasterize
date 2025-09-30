import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import type {
  Activity,
  ActivityStatus,
} from '../../shared/types/activity.type';
import { statusLabel } from '../../shared/utils/status';
import useActivityIcon from '../hooks/useActivityIcon';
import { Box } from '@mui/material';

const statusColor: Record<ActivityStatus, 'success' | 'error' | 'warning'> = {
  COMPLETED: 'success',
  FAILED: 'error',
  IN_PROGRESS: 'warning',
};

interface ActivityItemProps {
  activity: Activity;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  // hour12: true,
});

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const getIcon = useActivityIcon();
  const label = statusLabel[activity.status];
  const color = statusColor[activity.status];
  const formattedDate = dateFormatter.format(new Date(activity.createdAt));

  return (
    <Box className='grid gap-4 border-b border-slate-100 px-3 py-4 text-slate-700 last:border-b-0 lg:grid-cols-[160px_120px_1fr_200px] lg:items-center lg:gap-6'>
      <Typography variant='body2' className='text-sm text-slate-500'>
        {formattedDate}
      </Typography>

      <Chip
        label={label}
        color={color}
        size='small'
        className='w-fit text-xs font-semibold uppercase tracking-wide'
      />

      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        className='min-w-0'
      >
        <Avatar className='h-10 w-10 bg-slate-100 text-[#0b2840]'>
          {getIcon(activity.type)}
        </Avatar>
        <Stack spacing={0.5} className='min-w-0'>
          {activity.subject ? (
            <Typography
              variant='subtitle1'
              className='truncate text-base font-semibold text-slate-900 capitalize'
            >
              {activity.subject}
            </Typography>
          ) : null}
          {activity.description ? (
            <Typography
              variant='body2'
              className='truncate text-sm text-slate-500'
            >
              {activity.description}
            </Typography>
          ) : null}
        </Stack>
      </Stack>

      {/* User block (4th column): on mobile, keep chevron with user; on desktop, user only */}
      <Box className='flex items-center justify-start gap-3 lg:justify-end'>
        <Avatar className='h-9 w-9 bg-[#0b2840] text-white'>
          {activity.user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant='body2'
          className='text-sm font-medium text-slate-700'
        >
          {activity.user.name}
        </Typography>
        {/* Mobile/tablet chevron: visible below lg to stay on the same line as user */}
        <IconButton
          size='small'
          aria-label='Show details'
          className=' text-slate-300 transition hover:text-slate-500'
        >
          <KeyboardArrowDownRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(ActivityItem);
