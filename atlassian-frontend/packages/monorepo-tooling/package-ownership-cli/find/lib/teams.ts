import fs from 'fs';
import path from 'path';
import * as bolt from 'bolt';

import { adf, table } from '../../common/transformers';
import { PackageInfo, TeamMap, CliFlags, TeamsJson, NO_TEAM } from '../types';
import { Logger } from './Logger';

const ALLOWED = ['json', 'text', 'adf'];
export const FORMATS = {
  ALLOWED: (format: string) => ALLOWED.includes(format),
  ERROR: `--format must be one of: ${ALLOWED.join(', ')}`,
};

/**
 * Inject a teams.json to create a function that transforms a list of packages to map of owning teams
 * Includes each team's packages
 */
export const createPackagesToTeamsTransformer = (teamsJson: TeamsJson) => {
  return (packages: PackageInfo[], packagesFlag: boolean) => {
    const owningTeams: TeamMap = {};
    packages.forEach(pkg => {
      const teamName = pkg.config.atlassian && pkg.config.atlassian.team;
      if (teamName && owningTeams[teamName]) {
        // Team definition has been created, add to list of owned packages
        owningTeams[teamName].packages.push(pkg.name);
      } else if (teamName) {
        // Create team definition
        owningTeams[teamName] = {
          ...teamsJson[teamName],
          packages: [pkg.name],
        };
      } else if (packagesFlag) {
        Logger.addError(`${pkg.name} does not have a team`);
      }
    });
    return owningTeams;
  };
};

export const createNoTeamInfo = (packages: PackageInfo[]): TeamMap => {
  return {
    [NO_TEAM]: {
      packages: packages.map(pkg => pkg.name),
    },
  };
};

const toJSON = (json: any) => JSON.stringify(json, null, 2) + '\n';

/** Output teams for the CLI */
export const printTeams = async (
  teams: TeamMap,
  { format, output, packages }: CliFlags,
) => {
  Logger.log(`Outputting teams: format '${format}' and output '${output}'`);

  let stream: NodeJS.WriteStream | fs.WriteStream = process.stdout;
  let streamType = 'stdout';
  const outputPath = output && path.join((await bolt.getProject()).dir, output);
  if (outputPath && fs.existsSync(outputPath)) {
    stream = fs.createWriteStream(outputPath);
    streamType = 'file';
  } else if (outputPath) {
    Logger.exit(
      `${outputPath} does not exist\nthe file path needs to be relative to the root of the repo`,
    );
  }

  switch (format) {
    case 'json':
      return stream.write(toJSON(teams));
    case 'text':
      return stream.write(
        table(teams, {
          outputType: streamType === 'file' ? 'markdown' : 'cli',
          highlightPackages: !!packages,
        }),
      );
    case 'adf':
      return stream.write(toJSON(adf(teams)));
    default:
      Logger.exit(FORMATS.ERROR);
  }
};
