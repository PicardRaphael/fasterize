import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import FilterBar from './FilterBar/FilterBar';
import BreadcrumbHeader from './components/BreadcrumbHeader';
import ActivityListContainer from './ActivityList/ActivityListContainer';
import { ActivityFeedProvider } from './store/context';
// URL sync is now handled inside each filter/pagination component via nuqs.

export const ActivityFeed = () => {
  const breadcrumbItems = [
    'Console',
    'Projects',
    'Websites',
    'Configuration',
    'Activity feed',
  ];

  return (
    <ActivityFeedProvider>
      <Box className='min-h-screen bg-[#f5f6f8] px-4 py-6 md:px-8 lg:px-12'>
        <Stack spacing={5} className='mx-auto w-full max-w-6xl'>
          <BreadcrumbHeader title='www.sarenza.com' items={breadcrumbItems} />

          <Paper
            elevation={0}
            className='rounded-3xl bg-white p-4 shadow-[0_16px_36px_rgba(15,23,42,0.06)] md:p-6 lg:p-8'
          >
            <Stack spacing={4}>
              <FilterBar />
              <Stack spacing={2} className='px-1'>
                <ActivityListContainer />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </ActivityFeedProvider>
  );
};

export default ActivityFeed;
