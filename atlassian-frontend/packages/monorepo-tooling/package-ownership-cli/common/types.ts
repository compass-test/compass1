import {
  AFPackage as PackageInfo,
  TeamsJson,
} from '@atlaskit/build-utils/types';

export type { PackageInfo, TeamsJson };

type TeamInfo = Partial<TeamsJson['teamName']> & {
  packages: string[];
};

/** Extends teams.json with list of packages */
export type TeamMap = {
  [teamName: string]: TeamInfo;
};
