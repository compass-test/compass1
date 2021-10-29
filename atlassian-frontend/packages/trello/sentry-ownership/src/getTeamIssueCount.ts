import { TeamsDefinition } from './validateTeams';
import { SentryApiClient } from './SentryApiClient';
import { logger } from './logger';

interface TeamIssueCount {
  [teamName: string]: number;
}

interface GetTeamIssueCountArguments {
  sentryUrl: string;
  sentryOrg: string;
  sentryAuthToken: string;
  projectName: string;
  teamsDefinition: TeamsDefinition;
}

export const getTeamIssueCount = async ({
  sentryUrl,
  sentryOrg,
  sentryAuthToken,
  projectName,
  teamsDefinition,
}: GetTeamIssueCountArguments): Promise<TeamIssueCount> => {
  const teams = Object.keys(teamsDefinition);
  const result: TeamIssueCount = {};
  const sentryClient = new SentryApiClient({
    sentryUrl,
    sentryOrg,
    sentryAuthToken,
  });
  logger.info(`Getting issue counts for ${teams.length} teams`);
  for (const team of teams) {
    const count = await sentryClient.getIssueCountForTeam(projectName, team);
    logger.info(`${team}: ${count} issues`);
    result[team] = count;
  }
  return result;
};
