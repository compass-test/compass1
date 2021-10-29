import { Issue } from '../../../../common/types';

export type SearchMatch = {
  internalIndex: number;
  id: string;
  issueId: Issue['id'];
  linkMatch: boolean;
};

export type ActiveSearchResult = {
  index: number;
  hash: string | null;
};

export type HighlightSummaryProps = {
  numberOfIssueLinkChunks: number;
  summary: string;
  searchQuery: string;
  id: string;
  activeSearchResult: ActiveSearchResult;
  searchMatches: SearchMatch[];
};

export type HighlightIssueLinkProps = {
  issueKey?: number;
  projectKey?: string;
  activeSearchResult: ActiveSearchResult;
  searchQuery: string;
  issueLinkChunks: string[];
  issueId: string;
};
