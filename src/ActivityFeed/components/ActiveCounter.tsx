import Typography from '@mui/material/Typography';
import useActivityResults from '../hooks/useActivityResults';

export default function ActiveCounter() {
  const { totalCount } = useActivityResults();

  return (
    <Typography
      variant='subtitle2'
      className='text-sm font-medium text-slate-500'
    >
      {totalCount} {totalCount === 1 ? 'activity' : 'activities'} found
    </Typography>
  );
}
