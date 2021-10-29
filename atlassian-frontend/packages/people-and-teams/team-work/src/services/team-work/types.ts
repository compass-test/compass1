import { Priority } from '../../common/ui/priority-icon';
import { Status } from '../../common/ui/status-lozenge';
import type { ServiceResult } from '../generic-hook/types';

export type IssueType = {
  name: string;
  iconUrl: string;
};

export type Fields = {
  project: {
    name: string;
  };
  issuetype: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
};

export type Issue = {
  id: string;
  key: string;
  fields: Fields;
};

export type TeamWorkData = {
  issues: Issue[];
};

export type TeamWorkServiceFn = (
  teamId: string,
  options?: {
    baseUrl?: string;
    initialState?: Partial<ServiceResult<TeamWorkData>>;
  },
) => ServiceResult<TeamWorkData>;
