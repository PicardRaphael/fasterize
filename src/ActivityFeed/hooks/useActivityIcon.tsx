import { useMemo, type JSX } from 'react';
import AutoAwesomeMosaicRoundedIcon from '@mui/icons-material/AutoAwesomeMosaicRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SetMealRoundedIcon from '@mui/icons-material/SetMealRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import type { SvgIconComponent } from '@mui/icons-material';

const iconMap: Record<string, SvgIconComponent> = {
  FLUSH_CACHE: CachedRoundedIcon,
  DELETE: DeleteOutlineRoundedIcon,
  UPLOAD: CloudUploadRoundedIcon,
  INSTALL: DownloadDoneRoundedIcon,
  UPDATE: SettingsSuggestRoundedIcon,
  TRIGGER: BoltRoundedIcon,
  OPTIMIZE: SpeedRoundedIcon,
  CONFIG: RuleRoundedIcon,
  PUBLISH: RocketLaunchRoundedIcon,
  SEO: InsightsRoundedIcon,
  FISH: SetMealRoundedIcon,
};

const fallbackIcon = AutoAwesomeMosaicRoundedIcon;

export type ActivityIconGetter = (type: string) => JSX.Element;

export const useActivityIcon = (): ActivityIconGetter => {
  return useMemo(() => {
    return (type: string) => {
      const upperType = type.toUpperCase();
      const IconComponent = iconMap[upperType] ?? fallbackIcon;
      return <IconComponent fontSize='small' />;
    };
  }, []);
};

export default useActivityIcon;
