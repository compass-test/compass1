/*
  Package info from bolt is different in structure to info from
  the node registry.

  Maybe we can normalise this in future.
*/

import type * as bolt from 'bolt';

export type Documentation = 'constellation' | 'atlaskit';
export type Theming = 'tokens' | 'new-theming-api';
export type { Styling } from '../utils/package';

type TechStackRules = {
  [rule: string]: string | string[] | undefined;
};

type TechStackShape = {
  [scope: string]: TechStackRules;
};

type TechStackInstances = {
  ['@repo/internal']?: TechStackRules & {
    theming?: Theming | Theming[];
  };
};

export type TechStack = TechStackShape & TechStackInstances;

export type ReleaseModel = 'continuous' | 'scheduled';

export type PackageJSON = bolt.PackageJSON & {
  atlassian?: {
    team: string;
    inPublicMirror?: boolean;
    releaseModel: ReleaseModel;
    website?: {
      deprecated?: unknown;
      name?: string;
    };
  };
  techstack: TechStack;
  website?: string; // Some old versions of packages use this instead of homepage
};

export type PackageRegistryData = {
  'dist-tags': {
    latest: string;
  };
  versions: { [version: string]: PackageJSON };
  time: {
    modified: string;
    created: string;
    [version: string]: string;
  };
};
