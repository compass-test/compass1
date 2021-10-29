import { ReactNode } from 'react';

export type JiraAvailable =
  | { cloudId: string; jiraAvailable?: never }
  | { jiraAvailable: boolean; cloudId?: never };

export type TeamWorkProps = {
  teamId: string;
  infoText?: ReactNode;
  actions?: ReactNode;
  testId?: string;
} & JiraAvailable;
