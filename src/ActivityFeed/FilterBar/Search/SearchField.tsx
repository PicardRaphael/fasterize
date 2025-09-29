import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryState, parseAsString } from 'nuqs';

import { useActivityFeedStore } from '../../store/context';
import { shallow } from 'zustand/shallow';

export default function SearchField() {
  const { search, setSearch } = useActivityFeedStore(
    (s) => ({ search: s.filters.search, setSearch: s.setSearch }),
    shallow
  );

  const [qParam, setQParam] = useQueryState('search', parseAsString);
  const [local, setLocal] = useState(search);
  const settingUrl = useRef(false);

  // Keep local input in sync when store changes externally (chips/reset/nav)
  useEffect(() => {
    if (local !== search) setLocal(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // URL -> Store (initial paste / navigation)
  useEffect(() => {
    if (settingUrl.current) {
      settingUrl.current = false;
      return;
    }
    const next = qParam ?? '';
    if (next !== search) setSearch(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  // Debounce typing before updating store + URL
  useEffect(() => {
    const id = setTimeout(() => {
      if (local !== search) {
        setSearch(local);
        settingUrl.current = true;
        setQParam(local ? local : null);
      }
    }, 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  const clearable = useMemo(() => (local ?? '').length > 0, [local]);

  return (
    <TextField
      fullWidth
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      label='Search'
      placeholder='Search activities…'
      sx={{
        color: 'text.secondary',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchRoundedIcon fontSize='small' />
          </InputAdornment>
        ),
        endAdornment: clearable ? (
          <InputAdornment position='end'>
            <IconButton
              size='small'
              aria-label='Clear search'
              onClick={() => setLocal('')}
            >
              <ClearRoundedIcon fontSize='small' />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
}
