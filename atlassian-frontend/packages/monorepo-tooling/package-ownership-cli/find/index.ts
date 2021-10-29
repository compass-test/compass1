import fs from 'fs';
import path from 'path';
import * as bolt from 'bolt';

import { Options, TeamMap, NO_TEAM } from './types';
import { Logger } from './lib/Logger';
import { Packages } from './lib/Packages';
import {
  createPackagesToTeamsTransformer,
  createNoTeamInfo,
} from './lib/teams';
import { AFPackageJson } from '@atlaskit/build-utils/types';

/** Finds owning teams based on filtering options (see types.ts) */
export default async function (options: Options): Promise<TeamMap> {
  Logger.log('Finding packages', { options });

  const { packages: packagesStr, team, include, exclude } = options;

  const cwd = (await bolt.getProject()).dir;

  const workspaces = await bolt.getWorkspaces<AFPackageJson>();
  const packages = new Packages(workspaces);

  if (packagesStr) {
    packages.filterByNames(packagesStr.split(','));
  } else if (team) {
    packages.filterByTeam(team);
  }

  if (include || exclude) {
    packages.filterByMatch(include, exclude);
  }

  if (team === NO_TEAM) {
    return createNoTeamInfo(packages.get());
  }

  const teamsJsonPath = path.join(cwd, 'teams.json');
  const teamsJson = JSON.parse(fs.readFileSync(teamsJsonPath, 'utf8'));
  const packagesToTeamsTransformer = createPackagesToTeamsTransformer(
    teamsJson,
  );

  return packagesToTeamsTransformer(packages.get(), !!packagesStr);
}
