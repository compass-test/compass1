import { OwnershipDefinition, validateOwnership } from './validateOwnership';
import { TeamsDefinition, validateTeams } from './validateTeams';
import { validateMissingTeams } from './validateMissingTeams';
import { SentryApiClient } from './SentryApiClient';
import { syncTeams } from './syncTeams';
import { syncOwnership } from './syncOwnership';

interface SyncToSentryArguments {
  ownershipDefinition: OwnershipDefinition;
  teamsDefinition: TeamsDefinition;
  sentryUrl: string;
  sentryOrg: string;
  sentryAuthToken: string;
  projectName: string;
  ignoredTeamNames?: string[];
  dryRun?: boolean;
}

export const syncToSentry = async ({
  teamsDefinition,
  ownershipDefinition,
  sentryUrl,
  sentryOrg,
  sentryAuthToken,
  projectName,
  ignoredTeamNames = [],
  dryRun = false,
}: SyncToSentryArguments) => {
  // Validate the input
  validateTeams(teamsDefinition);
  validateOwnership(ownershipDefinition);
  validateMissingTeams({ teamsDefinition, ownershipDefinition });

  // Construct the sentry client
  const sentryClient = new SentryApiClient({
    sentryUrl,
    sentryOrg,
    sentryAuthToken,
  });

  // Sync the teams and ownership
  await syncTeams({
    sentryClient,
    projectName,
    teamsDefinition,
    ignoredTeamNames,
    dryRun,
  });
  await syncOwnership({
    sentryClient,
    projectName,
    ownershipDefinition,
    dryRun,
  });
};
