import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import InfoTooltip from '../../../shared/components/InfoTooltip';
import { useDateRangeFilter } from '../../hooks/filters/useDateRangeFilter';
import { formatDateRange } from '../../../shared/utils/date';
import { useQueryState, parseAsIsoDateTime } from 'nuqs';

const DateRangePanel = lazy(() => import('./DateRangePanel'));

export const DateRangeField = () => {
  const { value, setDateRange } = useDateRangeFilter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  // Sync `from` / `to` dates in the query with the store (bidirectional).
  const [fromQs, setFromQs] = useQueryState('from', parseAsIsoDateTime);
  const [toQs, setToQs] = useQueryState('to', parseAsIsoDateTime);
  const settingUrl = useRef(false);
  const urlApplied = useRef(false);

  const openPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  // Store -> URL (value change comes from DateRangePanel via setDateRange)
  // Guard against the initial paste case: if URL already has from/to and isn't applied yet, do not override it.
  useEffect(() => {
    // On first load, if URL already has from/to, do not override it with defaults
    if (!urlApplied.current && (fromQs || toQs)) {
      return;
    }
    const curFrom = fromQs?.getTime?.() ?? null;
    const curTo = toQs?.getTime?.() ?? null;
    const nextFrom = value.start?.getTime() ?? null;
    const nextTo = value.end?.getTime() ?? null;

    if (curFrom !== nextFrom) {
      settingUrl.current = true;
      setFromQs(value.start ?? null);
    }
    if (curTo !== nextTo) {
      settingUrl.current = true;
      setToQs(value.end ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.start, value.end]);

  // URL -> Store (initial paste / browser nav) with loop guard
  useEffect(() => {
    if (settingUrl.current) {
      settingUrl.current = false;
      return;
    }
    const nextStart = fromQs ?? null;
    const nextEnd = toQs ?? null;
    const curStart = value.start ?? null;
    const curEnd = value.end ?? null;
    const sameStart = (curStart?.getTime?.() ?? null) === (nextStart?.getTime?.() ?? null);
    const sameEnd = (curEnd?.getTime?.() ?? null) === (nextEnd?.getTime?.() ?? null);
    if (!sameStart || !sameEnd) {
      setDateRange({ start: nextStart, end: nextEnd });
    }
    if (fromQs || toQs) urlApplied.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromQs, toQs]);

  return (
    <>
      <Box
        onClick={openPicker}
        aria-haspopup='dialog'
        aria-controls={open ? 'date-range-popover' : undefined}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openPicker(e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '56px',
          px: 2,
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.23)',
          borderRadius: 1,
          fontWeight: 400,
          color: 'text.secondary',
          backgroundColor: 'background.paper',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <CalendarMonthRoundedIcon fontSize='small' sx={{ mr: 1 }} />
        <Box sx={{ flex: 1, textAlign: 'left' }}>{formatDateRange(value)}</Box>
        <InfoTooltip
          title='Filter by created date range (inclusive)'
          ariaLabel='Date range help'
        />
      </Box>
      <Popover
        id='date-range-popover'
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transitionDuration={160}
        disableRestoreFocus={false}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setAnchorEl(null);
        }}
      >
        <Suspense
          fallback={<div className='p-3 text-slate-400'>Loading...</div>}
        >
          <DateRangePanel onClose={() => setAnchorEl(null)} />
        </Suspense>
      </Popover>
    </>
  );
};

export default DateRangeField;
