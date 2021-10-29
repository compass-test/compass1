import { BitbucketAPI } from '../lib/api';
import {
  extractQueryParams,
  extractMetadataBody,
  ReviewerMethod,
} from '../lib/utils/request';
import { response, ResponseCode } from '../lib/utils/response';
import { ignorePr, formatComment } from '../lib/utils';
import { Cache } from '../lib/Cache';
import { checkTeams } from '../lib/check-teams';
import { Logger } from '../lib/Logger';
import { config } from '../config';
import {
  ALBEvent,
  ReviewerInfo,
  TeamAction,
  PullRequest,
  TeamInfo,
  ContributorAccountIds,
  Reviewer,
} from '../types';

const addReviewersToPr = async (
  { prId, commit, title, author, reviewers }: PullRequest,
  addComment: boolean,
  reviewerMethod: ReviewerMethod,
) => {
  const commentsAlreadyAdded = await BitbucketAPI.getNumberOfComments(prId);
  if (commentsAlreadyAdded > 0) {
    return response(ResponseCode.CREATED, {
      message: 'PR metadata cached, reviewers and comment already added.',
    });
  }
  const newReviewerInfo: ReviewerInfo = {};

  const getReviewerFromContributors = (
    contributorAccountIds: ContributorAccountIds,
    teamName: string,
    teamInfo: TeamInfo,
    getRandomContributor = true,
  ) => {
    const contributors: [string, string][] = Object.entries(
      contributorAccountIds,
    ).filter(([_, aaid]) => aaid !== author);

    if (contributors.length === 0) {
      return;
    }

    const reviewers: Array<Reviewer> = [];

    if (getRandomContributor) {
      const [name, aaid] = contributors[
        Math.floor(Math.random() * contributors.length)
      ];
      reviewers.push({ name, aaid });
    } else {
      contributors.forEach(contributor => {
        const [name, aaid] = contributor;
        reviewers.push({ name, aaid });
      });
    }
    newReviewerInfo[teamName] = {
      packages: teamInfo.packages,
      reviewers: reviewers,
    };
  };

  const selectReviewer: TeamAction = (
    teamName,
    teamInfo,
    contributorAccountIds,
  ) => {
    switch (reviewerMethod) {
      case ReviewerMethod.RANDOM:
        getReviewerFromContributors(contributorAccountIds, teamName, teamInfo);
        break;
      case ReviewerMethod.ENTIRE_TEAM:
        getReviewerFromContributors(
          contributorAccountIds,
          teamName,
          teamInfo,
          false,
        );
        break;
    }
  };

  // Execute callback for each team that doesn't have a reviewer on the PR
  await checkTeams(
    commit,
    config.includeAuthor ? [...reviewers, author] : reviewers,
    selectReviewer,
  );
  const reviewerTeams = Object.keys(newReviewerInfo);
  const newReviewerAaids = Object.values(newReviewerInfo)
    .flatMap(({ reviewers }) => reviewers)
    .map(({ aaid }) => aaid);

  const addNewReviewers = newReviewerAaids.length > 0;

  // If reviewers are required, add them
  // If a comment is specified to be added, add it
  if (addNewReviewers) {
    Logger.info('Attempting to add new reviewers to PR', {
      prId,
      commit,
      reviewerTeams,
    });
    await BitbucketAPI.addReviewersToPr(
      prId,
      title,
      reviewers.concat(newReviewerAaids),
    );
    if (config.allowAddComment && addComment) {
      Logger.info('Attempting to add comment to PR', {
        prId,
        commit,
      });
      await BitbucketAPI.addCommentToPr(prId, formatComment(newReviewerInfo));
    }
  } else {
    Logger.info('No new reviewers to add', { prId, commit });
  }

  return response(ResponseCode.CREATED, {
    message: 'PR metadata cached',
    teamsAdded: reviewerTeams,
    commentAdded: addComment && addNewReviewers,
  });
};

/**
 * Stores PR metadata in the Dynamo cache (this information is used by the `ownership-check` step).
 * If the required options are set, also adds reviewers to the PR and/or a comment explaining this.
 * @param request Must contain JSON body with prId, changedPackages list.
 */
export const uploadMetadata = async (request: ALBEvent) => {
  const params = extractQueryParams(request.queryStringParameters);
  const body = extractMetadataBody(request.body);
  if (!params || !body) {
    return response(
      ResponseCode.BAD_REQUEST,
      'This endpoint requires a prId, commit hash, and a list of changed packages and their owning teams.',
    );
  }

  const { prId, commit } = params;
  const { changedPackages, addReviewers, addComment, reviewerMethod } = body;

  Logger.info('Attempting to upload metadata', {
    ...params,
    changedPackages,
  });

  const prInfo = await BitbucketAPI.getPr(prId);
  if (!prInfo) {
    return response(ResponseCode.NOT_FOUND, `PR ${prId} not found.`);
  }

  const pr: PullRequest = {
    ...prInfo,
    prId,
    commit,
  };

  const ignoreMessage = ignorePr(pr);
  if (ignoreMessage) {
    return response(ResponseCode.OK, {
      message: ignoreMessage,
    });
  }

  // Store information for ownership-check step
  const cache = await Cache.getInstance();
  await cache.putChangedPackages(commit, changedPackages);

  if (!config.allowAddReviewers || !addReviewers) {
    return response(ResponseCode.CREATED, { message: 'PR metadata cached' });
  }

  return addReviewersToPr(pr, addComment, reviewerMethod);
};
