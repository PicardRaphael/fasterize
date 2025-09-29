import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface InfoTooltipProps {
  title: string;
  ariaLabel?: string;
}

export default function InfoTooltip({ title, ariaLabel = 'Info' }: InfoTooltipProps) {
  return (
    <Tooltip title={title} arrow>
      <IconButton size='small' aria-label={ariaLabel} className='text-slate-400 hover:text-slate-600'>
        <InfoOutlinedIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
}

