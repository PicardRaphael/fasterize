import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { memo, useMemo, useEffect, useRef } from 'react';
import InfoTooltip from '../../../shared/components/InfoTooltip';

import { useUserFilterControl } from '../../hooks/filters/useUserFilterControl';
import { Box } from '@mui/material';
import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

export const UserFilter = () => {
  const { values, setUsers, options } = useUserFilterControl();
  const [usersQs, setUsersQs] = useQueryState(
    'user',
    parseAsArrayOf(parseAsInteger)
  );
  const settingUrl = useRef(false);
  const selectedUsers = useMemo(
    () => options.filter((user) => values.includes(user.id)),
    [options, values]
  );

  useEffect(() => {
    if (settingUrl.current) {
      settingUrl.current = false;
      return;
    }
    const next = usersQs ?? [];
    if (JSON.stringify(values) !== JSON.stringify(next)) setUsers(next as number[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersQs]);

  // Store -> URL (chips delete & reset)
  useEffect(() => {
    const cur = usersQs ?? [];
    const next = values;
    const same = JSON.stringify(cur) === JSON.stringify(next);
    if (!same) {
      settingUrl.current = true;
      setUsersQs(next.length ? next : null);
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
        value={selectedUsers}
        onChange={(_event, newValue) => {
          const ids = newValue.map((u) => u.id);
          if (JSON.stringify(values) !== JSON.stringify(ids)) setUsers(ids);
          setUsersQs(ids.length ? ids : null);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        disableCloseOnSelect
        filterSelectedOptions
        limitTags={0}
        getLimitTagsText={(more) => `+${more}`}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Stack
              key={key}
              direction='row'
              spacing={1.5}
              alignItems='center'
              component='li'
              {...optionProps}
            >
              <Avatar className='h-7 w-7 bg-primary-main text-white'>
                {option.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant='body2' className='text-sm text-slate-700'>
                {option.name}
              </Typography>
            </Stack>
          );
        }}
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
                    title='Filter by user (multi-select)'
                    ariaLabel='User filter help'
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

export default memo(UserFilter);
