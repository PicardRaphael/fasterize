import Button from '@mui/material/Button';

import DateRangeField from './Date/DateRangeField';
import StatusField from './Status/StatusField';
import TypeFilter from './Type/TypeFilter';
import UserFilter from './User/UserFilter';
import ActiveFiltersChips from './ActiveFiltersChips';
import { Box, Stack } from '@mui/material';
import useFilterSummary from '../hooks/filters/useFilterSummary';

export const FilterBar = () => {
  const { clearFilters, activeCount } = useFilterSummary();
  const showClear = activeCount > 0;

  return (
    <Box component='section' sx={{ width: '100%' }}>
      {/* Search removed */}

      {/* List of filters */}
      <Stack
        direction='row'
        spacing={2}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <DateRangeField />
        </Box>
        <Box sx={{ width: '100%' }}>
          <StatusField />
        </Box>
        <Box sx={{ width: '100%' }}>
          <TypeFilter />
        </Box>
        <Box sx={{ width: '100%' }}>
          <UserFilter />
        </Box>
        {showClear && (
          <Box>
            <Button
              variant='text'
              color='inherit'
              onClick={clearFilters}
              className='whitespace-nowrap px-3 text-sm font-medium text-slate-500 hover:text-slate-700'
            >
              Reset all filters
            </Button>
          </Box>
        )}
      </Stack>
      <Box component='div' mt={1}>
        {/* Summary of active filters */}
        <ActiveFiltersChips />
      </Box>
    </Box>
  );
};
export default FilterBar;
