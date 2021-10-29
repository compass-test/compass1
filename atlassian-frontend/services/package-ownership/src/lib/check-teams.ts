import { BitbucketAPI, UserAPI } from './api';
import { Cache } from './Cache';
import { Logger } from './Logger';
import { ContributorAccountIds, Teams, TeamAction } from '../types';

export const METADATA_NOT_FOUND = 'Required PR metadata is not in cache';
export const TEAMS_NOT_FOUND = (commit: string) =>
  `teams.json not found for commit ${commit}`;

const resolveAccountId = async (cache: Cache, staffId: string) => {
  let accountId = await cache.getAccountId(staffId);
  if (!accountId) {
    accountId = await UserAPI.getAccountId(staffId);
    if (accountId) {
      await cache.putAccountId(staffId, accountId);
    }
  }
  return accountId;
};

/**
 * 1. Fetch changed packages for commit
 * 2. Determine set of teams that own the changed packages
 * 3. Check that at least one team member exists in the list of PR participants
 * 4. For each team that the above check isn't satisfied for,
 *    perform the `action` with team name and list of team contributer account IDs
 * @param commit Commit hash of PR
 * @param participants List of participants on a PR (either reviewers or approvers)
 * @param action Action to perform when a team member isn't in the list of participants
 */
export const checkTeams = async (
  commit: string,
  participants: string[],
  action: TeamAction,
) => {
  const cache = await Cache.getInstance();
  const changedPackages = await cache.getChangedPackages(commit);

  if (!changedPackages) {
    throw new Error(METADATA_NOT_FOUND);
  }

  // All teams that own the changed packages
  const teams = await BitbucketAPI.getTeams(commit);
  if (!teams) {
    throw new Error(TEAMS_NOT_FOUND(commit));
  }
  const owningTeams = changedPackages.reduce((acc: Teams, { name, team }) => {
    if (team && acc[team]) {
      acc[team].packages.push(name);
    } else if (team && teams[team]) {
      acc[team] = {
        ...teams[team],
        packages: [name],
      };
    }
    return acc;
  }, {});

  Logger.info('Owning teams determined', {
    commit,
    owningTeams: Object.keys(owningTeams),
  });

  /*
  the relevant information in teams.json takes the form:
  {
    "team name": {
      contributors: ["memberA", "memberB"],
    },
  }
  */
  for (const [teamName, teamInfo] of Object.entries(owningTeams)) {
    // Map list of team contributer staff IDs to aaids
    const contributorAccountIds: ContributorAccountIds = {};
    for (const contributor of teamInfo.contributors) {
      const accountId = await resolveAccountId(cache, contributor);
      if (accountId) {
        contributorAccountIds[contributor] = accountId;
      }
    }

    // Call action if none of the participants are a team contributor
    const accountIds = Object.values(contributorAccountIds);
    const participantsAreContributors = participants.some(participant =>
      accountIds.includes(participant),
    );
    if (!participantsAreContributors) {
      Logger.info('Calling action for team', { teamName });
      action(teamName, teamInfo, contributorAccountIds);
    }
  }
};
