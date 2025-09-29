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

      {/* Filters row: keep desktop layout; allow wrap only on small screens */}
      <Stack
        direction='row'
        spacing={2}
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          rowGap: 2,
        }}
        useFlexGap
      >
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: '48%', md: 0 } }}>
          <DateRangeField />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: '48%', md: 0 } }}>
          <StatusField />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: '48%', md: 0 } }}>
          <TypeFilter />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: '48%', md: 0 } }}>
          <UserFilter />
        </Box>
        {showClear && (
          <Box sx={{ ml: { md: 1 } }}>
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
