import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { memo, useEffect, useRef } from 'react';

import InfoTooltip from '../../../shared/components/InfoTooltip';
import { useTypeFilterControl } from '../../hooks/filters/useTypeFilterControl';
import { Box } from '@mui/material';
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

export const TypeFilter = () => {
  const { values, setTypes, options } = useTypeFilterControl();
  // Sync query param `type` <-> store with nuqs.
  const [typesQs, setTypesQs] = useQueryState(
    'type',
    parseAsArrayOf(parseAsString)
  );
  const settingUrl = useRef(false);

  // URL -> Store with loop guard
  useEffect(() => {
    if (settingUrl.current) {
      settingUrl.current = false;
      return;
    }
    const next = typesQs ?? [];
    if (JSON.stringify(values) !== JSON.stringify(next)) setTypes(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typesQs]);

  // Store -> URL (chips delete & reset) with loop guard
  useEffect(() => {
    const cur = typesQs ?? [];
    const next = values;
    const same = JSON.stringify(cur) === JSON.stringify(next);
    if (!same) {
      settingUrl.current = true;
      setTypesQs(next.length ? next : null);
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
        onChange={(_event, newValue) => {
          // Only update state if the selection actually changed.
          if (JSON.stringify(values) !== JSON.stringify(newValue)) setTypes(newValue);
          // Keep URL in sync for shareability.
          setTypesQs(newValue.length ? newValue : null);
        }}
        disableCloseOnSelect
        filterSelectedOptions
        limitTags={0}
        getLimitTagsText={(more) => `+${more}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Types'
            InputProps={{
              ...params.InputProps,
              startAdornment:
                values.length > 0 ? (
                  <Box
                    sx={{
                      ml: { xs: 0, sm: 1 },
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
                    title='Filter by type (multi-select)'
                    ariaLabel='Type filter help'
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

export default memo(TypeFilter);
