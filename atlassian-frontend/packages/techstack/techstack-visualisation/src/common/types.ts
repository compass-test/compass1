import { ReactNode } from 'react';
export enum Product {
  JIRA = 'jira',
  CONFLUENCE = 'confluence',
  BITBUCKET = 'bitbucket',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  STATUSPAGE = 'statuspage',
  ATLASSIAN = 'atlassian',
}

export interface EslintCheck {
  type: 'eslint';
  plugin?: string;
  rule: string;
  configuration?: any;
  filesGlob?: string;
}

export interface StricterCheck {
  type: 'stricter';
  plugin?: string;
  rule: string;
  configuration?: any;
}

export type Check = EslintCheck | StricterCheck;

export type Status =
  | 'recommended'
  | 'discouraged'
  | 'deprecated'
  | 'no-go'
  | 'unavailable';

export interface Solution {
  id: string;
  caption: string;
  href?: string;
  description?: string;
  status?: Status;
  checks?: Check[];
  antiChecks?: Check[];
}

export interface UseCase {
  id: string;
  caption: {
    'as-a': string;
    'i-want-to': string;
  };
  tags?: string[];
  description?: string;
  solutions: Solution[];
}

export type TechStack = UseCase[];

export type UsedStack = {
  [key: string]: string[];
};

export interface Cell {
  isSortable: boolean;
  key: number;
  content: ReactNode;
}
