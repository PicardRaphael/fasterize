export type ActivityStatus = 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';

export interface ActivityUser {
  id: number;
  name: string;
}

export interface ActivityInformationPayload {
  [key: string]: unknown;
}

export interface ActivityInformation {
  type: string;
  detailsType?: string;
  payload?: ActivityInformationPayload;
  diff?: Record<string, unknown>;
}

export interface Activity {
  id: number;
  userId: number;
  user: ActivityUser;
  projectId: number;
  websiteId: number;
  type: string;
  status: ActivityStatus;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  applicationId?: string;
  supportTicket?: string;
  requestId?: string;
  information?: ActivityInformation;
}

export interface DateRangeValue {
  start: Date | null;
  end: Date | null;
}

export interface ActivityFilters {
  statuses: ActivityStatus[];
  types: string[];
  users: number[];
  dateRange: DateRangeValue;
}
