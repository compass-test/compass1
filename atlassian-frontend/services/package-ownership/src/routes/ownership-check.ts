import { BitbucketAPI } from '../lib/api';
import { extractQueryParams } from '../lib/utils/request';
import { response, ResponseCode } from '../lib/utils/response';
import { ignorePr, TAG_IGNORED } from '../lib/utils';
import { checkTeams, METADATA_NOT_FOUND } from '../lib/check-teams';
import { Logger } from '../lib/Logger';
import { ALBEvent, TeamInfo } from '../types';
import { config } from '../config';

/**
 * Handles the ownership-check route
 * If all teams that own the changed packages have a member that has approved the PR:
 *  return status 200
 * Otherwise:
 *  return status 201 and the list of teams that the PR still requires approval from
 * @param request the lambda event object
 */
export const ownershipCheck = async (request: ALBEvent) => {
  const params = extractQueryParams(request.queryStringParameters);
  if (!params) {
    return response(
      ResponseCode.BAD_REQUEST,
      'This endpoint requires a pull request ID and commit hash.',
    );
  }

  const { prId, commit } = params;

  Logger.info('Attempting to conduct ownership check', {
    prId,
    commit,
  });

  const pr = await BitbucketAPI.getPr(prId);
  if (!pr) {
    return response(ResponseCode.NOT_FOUND, `PR ${prId} not found.`);
  }
  const { approvals, author } = pr;

  // Doesn't make sense for WIP PRs to be excluded from the ownership check
  const ignoreMessage = ignorePr({ prId, commit, ...pr });
  if (ignoreMessage && ignoreMessage !== TAG_IGNORED) {
    return response(ResponseCode.OK, {
      checkPassed: true,
      message: ignoreMessage,
    });
  }

  // Determine the list of teams that the PR still needs approval from
  const teamsRequiringApproval: Array<
    Omit<TeamInfo, 'contributors' | 'directly-responsible-individual'> & {
      name: string;
    }
  > = [];
  try {
    await checkTeams(
      commit,
      config.includeAuthor ? [...approvals, author] : approvals,
      (teamName, teamInfo) =>
        teamsRequiringApproval.push({
          name: teamName,
          packages: teamInfo.packages,
          slack: teamInfo.slack,
          project: teamInfo.project,
        }),
    );
  } catch (err) {
    if (err.message && err.message === METADATA_NOT_FOUND) {
      return response(ResponseCode.NOT_FOUND, {
        message: METADATA_NOT_FOUND,
      });
    }
    throw err;
  }

  const checkPassed = teamsRequiringApproval.length === 0;

  Logger.info('Ownership check complete', {
    prId,
    commit,
    checkPassed,
    teamsRequiringApproval,
  });

  return response(ResponseCode.OK, {
    checkPassed,
    teamsRequiringApproval,
  });
};
