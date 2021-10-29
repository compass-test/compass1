import { SentryApiClient } from './SentryApiClient';
import { logger } from './logger';

interface AssignIssuesArguments {
  sentryClient: SentryApiClient;
  projectName: string;
  filterByTimesSeen: number;
  filterByUnassigned: boolean;
}

interface AssignedCounts {
  [teamName: string]: number;
}

// Exported for testing purposes
export const assignIssues = async ({
  sentryClient,
  projectName,
  filterByTimesSeen,
  filterByUnassigned,
}: AssignIssuesArguments): Promise<AssignedCounts> => {
  let hasMore = true;
  let cursor = '';
  const assignedCounts: AssignedCounts = { 'N/A': 0 };

  logger.info(`Attempting to assign issue ownership`, {
    projectName,
    filterByTimesSeen,
    filterByUnassigned,
  });

  while (hasMore) {
    const result = await sentryClient.getIssues(
      projectName,
      filterByUnassigned,
      filterByTimesSeen,
      cursor,
    );
    hasMore = result.hasMore;
    cursor = result.nextCursor;

    logger.info(
      `Fetched ${result.issues.length} more unassigned issues. Progress so far:`,
      assignedCounts,
    );

    for (const issue of result.issues) {
      const teamName = await sentryClient.assignSuggestedOwnerToIssue(
        projectName,
        issue.id,
      );
      if (teamName) {
        logger.info(`Assigned ${issue.id} to ${teamName}`);

        assignedCounts[teamName] = assignedCounts[teamName]
          ? assignedCounts[teamName] + 1
          : 1;
      } else {
        logger.info(`Could not find owner for ${issue.id}`);
        assignedCounts['N/A']++;
      }
    }
  }

  logger.info(`Done.`, assignedCounts);
  return assignedCounts;
};

interface AssignIssuesToSuggestedOwnersArguments {
  sentryUrl: string;
  sentryOrg: string;
  sentryAuthToken: string;
  projectName: string;
  filterByUnassigned?: boolean;
  filterByTimesSeen?: number;
}

export const assignIssuesToSuggestedOwners = async ({
  sentryUrl,
  sentryOrg,
  sentryAuthToken,
  projectName,
  filterByUnassigned = true,
  filterByTimesSeen = 5,
}: AssignIssuesToSuggestedOwnersArguments): Promise<AssignedCounts> => {
  const sentryClient = new SentryApiClient({
    sentryUrl,
    sentryOrg,
    sentryAuthToken,
    rateLimitingDelay: 0,
  });

  const assignedCounts = await assignIssues({
    sentryClient,
    projectName,
    filterByTimesSeen,
    filterByUnassigned,
  });
  return assignedCounts;
};
