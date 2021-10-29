export type { PackageInfo, TeamMap, TeamsJson } from '../common/types';

export const NO_TEAM = 'no team';

export type Options = {
  /** String of comma separated package names */
  packages?: string;

  /** Name of a team, as can be found in teams.json */
  team?: string;

  /** Include packages that include this substring, or whose paths match this glob */
  include?: string;

  /** Exclude packages that include this substring, or whose paths match this glob */
  exclude?: string;
};

export type CliFlags = Options & {
  /** Log what is happening to stdout and stderr */
  verbose: boolean;

  /** Format for CLI output, 'json' | 'text' | 'adf' */
  format: string;

  /** Path to file */
  output?: string;
};
