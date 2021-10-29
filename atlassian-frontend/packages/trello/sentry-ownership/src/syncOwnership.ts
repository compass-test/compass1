import { SentryApiClient } from './SentryApiClient';
import { logger } from './logger';

export interface OwnershipDefinition {
  [teamName: string]: string[];
}

interface SyncTeamsArguments {
  sentryClient: SentryApiClient;
  projectName: string;
  ownershipDefinition: OwnershipDefinition;
  dryRun?: boolean;
}

export const syncOwnership = async ({
  sentryClient,
  projectName,
  ownershipDefinition,
  dryRun = false,
}: SyncTeamsArguments) => {
  let ownershipContent = `# generated by sentry-ownership ${new Date()}\n`;
  const ownershipRules: string[] = [];

  // Create a sentry rule for each ownership pattern that looks like:
  // path:./my-folder/* #my-team
  Object.entries(ownershipDefinition).forEach(([teamName, patterns]) => {
    patterns.forEach((pattern) => {
      ownershipRules.push(`path:${pattern} #${teamName}`);
    });
  });
  ownershipContent += ownershipRules.join('\n');

  logger.info(
    `Syncing ${ownershipRules.length} ownership rules for ${projectName}`,
  );
  if (!dryRun) {
    await sentryClient.setOwnershipRules(projectName, ownershipContent);
  }
};
