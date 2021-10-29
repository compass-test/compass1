import { SentryApiClient } from './SentryApiClient';
import { logger } from './logger';

interface TeamDefinition {
  contributors: string[];
}

interface TeamsDefinition {
  [teamName: string]: TeamDefinition;
}

interface SyncTeamMembersArguments {
  sentryClient: SentryApiClient;
  teamName: string;
  teamMembers: string[];
  dryRun?: boolean;
}
const syncTeamMembers = async ({
  sentryClient,
  teamName,
  teamMembers,
  dryRun = false,
}: SyncTeamMembersArguments) => {
  const existingMembers = await sentryClient.getTeamMembers(teamName);
  if (!existingMembers) {
    logger.error(
      `${teamName} could not be found in Sentry when attempting to sync membership`,
    );
    return;
  }
  const existingMemberEmails = existingMembers.map((member) => member.email);
  const contributorEmails = teamMembers.map((name) => `${name}@atlassian.com`);
  const memberEmailsToRetain = contributorEmails.filter((contributorEmail) =>
    existingMemberEmails.includes(contributorEmail),
  );
  const memberEmailsToAdd = contributorEmails.filter(
    (contributorEmail) => !existingMemberEmails.includes(contributorEmail),
  );
  const membersToRemove = existingMembers.filter(
    (existingMember) => !contributorEmails.includes(existingMember.email),
  );
  const memberEmailsToRemove = membersToRemove.map((member) => member.email);

  logger.info(
    `syncing team membership for ${teamName}: retaining: [${memberEmailsToRetain}], removing: [${memberEmailsToRemove}], adding: [${memberEmailsToAdd}]`,
  );

  // Remove existing members that are no longer listed as contributors
  for (const { id, email } of membersToRemove) {
    try {
      logger.info(`Removing ${email} from ${teamName}`);
      if (!dryRun) {
        await sentryClient.removeTeamMember(teamName, id);
      }
    } catch (err) {
      logger.error(
        `Failed to remove ${email} to ${teamName} due to error: ${err.message} ${err.stack}`,
      );
    }
  }

  // Add new members to the team
  for (const email of memberEmailsToAdd) {
    try {
      const memberId = await sentryClient.getMemberId(email);
      if (memberId) {
        logger.info(`Adding ${email} to ${teamName}`);
        if (!dryRun) {
          await sentryClient.addTeamMember(teamName, memberId);
        }
      } else {
        logger.info(
          `${email} does not have a Sentry account, so was not added to ${teamName}`,
        );
      }
    } catch (err) {
      logger.error(
        `Failed to add ${email} to ${teamName} due to error: ${err.message} ${err.stack}`,
      );
    }
  }
};

interface SyncTeamsArguments {
  sentryClient: SentryApiClient;
  projectName: string;
  teamsDefinition: TeamsDefinition;
  ignoredTeamNames?: string[];
  dryRun?: boolean;
}

export const syncTeams = async ({
  sentryClient,
  projectName,
  teamsDefinition,
  ignoredTeamNames = [],
  dryRun = false,
}: SyncTeamsArguments) => {
  logger.info(`syncing teams to sentry for project: ${projectName}`);
  const sentryTeams = await sentryClient.getProjectTeams(projectName);
  const sentryTeamNames = sentryTeams.map((team) => team.name);
  const teamNamesToRemove = sentryTeamNames.filter(
    (teamName) =>
      !Object.keys(teamsDefinition).includes(teamName) &&
      !ignoredTeamNames.includes(teamName),
  );
  const teamNamesToCreate = Object.keys(teamsDefinition).filter(
    (teamName) => !sentryTeamNames.includes(teamName),
  );

  // Remove teams that have been deleted from our teams.js
  for (const teamName of teamNamesToRemove) {
    logger.info(`${teamName} no longer exists in teams definition, deleting`);
    if (!dryRun) {
      await sentryClient.deleteTeam(teamName);
    }
  }

  // Create teams that don't yet exist in sentry
  for (const teamName of teamNamesToCreate) {
    logger.info(`${teamName} not found in Sentry, creating`);
    if (!dryRun) {
      await sentryClient.createTeam(teamName);
    }

    logger.info(`Adding ${teamName} to the ${projectName} project`);
    if (!dryRun) {
      await sentryClient.addTeamToProject(projectName, teamName);
    }
  }

  // Sync the team memberships
  for (const [teamName, teamDefinition] of Object.entries(teamsDefinition)) {
    await syncTeamMembers({
      sentryClient,
      teamName,
      teamMembers: teamDefinition.contributors,
      dryRun,
    });
  }
};
