import { ReactNode } from 'react';

import type { Priority } from '../../common/ui/priority-icon';
import type { Status } from '../../common/ui/status-lozenge';
import type { Issue, IssueType } from '../../services/team-work/types';

export type WorkListProps = {
  teamId: string;
  actions?: ReactNode;
  testId?: string;
};

export type WorkListItemBeforeProps = {
  issuetype: IssueType;
};

export type WorkListItemAfterProps = {
  priority: Priority;
  status: Status;
};

export type WorkListContentProps = {
  items: Issue[];
  teamId: string;
};
