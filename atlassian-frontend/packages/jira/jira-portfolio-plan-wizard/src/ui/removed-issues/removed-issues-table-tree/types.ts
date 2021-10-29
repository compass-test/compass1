import {
  Issue,
  IssueStatusTypeMap,
  IssueTypeMap,
  Project,
} from '../../../common/types';
import { useIntl as useIntlDI } from '../../../common/utils/intl';

import { SearchMatch } from './highlight';
import { ActiveSearchResult } from './highlight/types';

export type { SearchMatch } from './highlight';

export type TableItem = {
  level: number;
  issue: Issue;
  children: TableItem[] | null;
  depth?: number;
};

export interface Props {
  useIntl?: typeof useIntlDI;
  issues?: Issue[];
  loading: boolean;
  isDisabled?: boolean;
  selectedIssues: Issue[];
  setSelectedIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  hierarchyLevelByType: { [type: string]: number };
  issueTypeMap?: IssueTypeMap;
  issueStatusTypeMap?: IssueStatusTypeMap;
  projects?: Project[];
  searchQuery: string;
  searchMatches: SearchMatch[];
  activeSearchResult: ActiveSearchResult;
  forwardRef?: React.RefObject<HTMLDivElement>;
}

export interface EmptyTableProps {
  useIntl?: typeof useIntlDI;
}
