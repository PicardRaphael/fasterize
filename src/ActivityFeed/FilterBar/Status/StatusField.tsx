import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useStatusFilterControl } from '../../hooks/filters/useStatusFilterControl';
import { memo, useEffect, useRef } from 'react';
import InfoTooltip from '../../../shared/components/InfoTooltip';
import { Box } from '@mui/material';
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

export const StatusField = () => {
  const { values, setStatuses, options } = useStatusFilterControl();
  const [statusQs, setStatusQs] = useQueryState(
    'status',
    parseAsArrayOf(parseAsString)
  );
  const settingUrl = useRef(false);

  // URL -> Store
  useEffect(() => {
    if (settingUrl.current) {
      settingUrl.current = false;
      return;
    }
    const next = (statusQs ?? []) as string[];
    if (JSON.stringify(values) !== JSON.stringify(next))
      setStatuses(next as never[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusQs]);

  // Store -> URL (covers chips delete & global reset)
  useEffect(() => {
    const cur = (statusQs ?? []) as string[];
    const next = values as string[];
    const same = JSON.stringify(cur) === JSON.stringify(next);
    if (!same) {
      settingUrl.current = true;
      setStatusQs(next.length ? next : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}
    >
      <Autocomplete
        multiple
        options={options}
        value={values}
        onChange={(_event, nextValue) => {
          if (JSON.stringify(values) !== JSON.stringify(nextValue)) {
            setStatuses(nextValue);
          }
          setStatusQs(nextValue.length ? nextValue : null);
        }}
        disableCloseOnSelect
        filterSelectedOptions
        limitTags={0}
        getLimitTagsText={(more) => `+${more}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Status'
            InputProps={{
              ...params.InputProps,
              startAdornment:
                values.length > 0 ? (
                  <Box
                    sx={{
                      ml: 1,
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  >
                    +{values.length}
                  </Box>
                ) : null,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <InfoTooltip
                    title='Filter by status (multi-select)'
                    ariaLabel='Status filter help'
                  />
                </>
              ),
            }}
          />
        )}
        fullWidth
      />
    </Box>
  );
};
export default memo(StatusField);
