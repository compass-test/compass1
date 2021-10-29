export interface RepoStatsEvent extends BaseRepoStats {
  cloc: string; // json blob
  clocHeader: string; // json blob
  extras?: string; // json blob
}

export interface RepoStats extends BaseRepoStats {
  cloc: Cloc;
  clocHeader: ClocHeader;
  extras?: ExtraStats;
}

export interface ExtraStats {
  [key: string]: any;
}

interface BaseRepoStats {
  name: string;
  timestamp: number;
  commits: number;
  recentCommits: number;
  authors: number;
  recentAuthors: number;
  workspaces?: number;
}

export interface ClocHeader {
  cloc_url: string;
  cloc_version: string;
  elapsed_seconds: number;
  n_files: number;
  n_lines: number;
  files_per_second: number;
  lines_per_second: number;
}

export interface Cloc {
  SUM: ClocResult;
  [key: string]: ClocResult;
}

interface ClocResult {
  nFiles: number;
  blank: number;
  comment: number;
  code: number;
}

export interface Config {
  product: string;
  repository: string;
  prod: boolean;
  recent: number;
  workspaces: boolean;
  extras?: any;
  backfill: {
    enabled: boolean;
    days: number;
    period: number;
  };
  timestamp?: number;
  remote: boolean;
  dryRun: boolean;
}
