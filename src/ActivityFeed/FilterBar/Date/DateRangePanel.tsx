import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useDateRangeFilter from '../../hooks/filters/useDateRangeFilter';

interface DateRangePanelProps {
  onClose: () => void;
}

export default function DateRangePanel({ onClose }: DateRangePanelProps) {
  const { value, setDateRange } = useDateRangeFilter();
  return (
    <div className='w-[520px] max-w-[90vw] p-3'>
      <Stack direction='row' spacing={1.5} alignItems='center'>
        <DatePicker
          label='From'
          value={value.start}
          onChange={(d) =>
            setDateRange({
              start: d,
              end: value.end && d && value.end < d ? d : value.end,
            })
          }
          slotProps={{
            textField: {
              size: 'small',
              placeholder: 'From',
              autoFocus: true,
            },
            actionBar: { actions: ['clear'] },
          }}
        />
        <Typography variant='body2' className='text-slate-400'>
          -
        </Typography>
        <DatePicker
          label='To'
          value={value.end}
          onChange={(d) =>
            setDateRange({
              start: value.start && d && value.start > d ? d : value.start,
              end: d,
            })
          }
          slotProps={{
            textField: { size: 'small', placeholder: 'To' },
            actionBar: { actions: ['clear'] },
          }}
        />
        <div className='flex-1' />
        <Button variant='contained' onClick={onClose}>
          Apply
        </Button>
      </Stack>
    </div>
  );
}
