import type { ActivityStatus } from '../types/activity.type';

export const statusLabel: Record<ActivityStatus, string> = {
  COMPLETED: 'Success',
  FAILED: 'Failed',
  IN_PROGRESS: 'In progress',
};

export default statusLabel;
