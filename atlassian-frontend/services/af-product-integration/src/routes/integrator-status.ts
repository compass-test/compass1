import { getPrFromCommit } from '@atlaskit/build-utils/bitbucket/getPrFromCommit';

import { response, ResponseCode, Response } from '../lib/utils/response';

import { Logger } from '../lib/Logger';
import { ALBEvent } from '../types';
import { DB } from '../lib/db';
import { config } from '../config';
import { addPrStatusComment, isEnabledBranch } from '../lib/status';
import { Secrets } from '@atlassian/micros-serverless-platform';

interface RequestBody {
  resultUrl: string;
  product: string;
  isSuccessful: boolean;
  commit: string;
  buildNumber: number;
  branchName: string;
  numPackagesInstalled?: number;
}

type ParsedBody = {
  resultUrl: string;
  product: string;
  isSuccessful: boolean;
  commit: string;
  branchName: string;
  buildNumber: number;
  numPackagesInstalled?: number;
};

type SuccessPayload = {
  addedComment: boolean;
  pullRequestId?: number;
  reason?: string;
};

type FailPayload = string;

const requiredBodyFields: Readonly<Array<keyof RequestBody>> = [
  'resultUrl',
  'product',
  'isSuccessful',
  'commit',
  'branchName',
] as const;

const COMMIT_LENGTH = 12;

function validateRequestBody(requestBody: any): requestBody is RequestBody {
  if (!requestBody || typeof requestBody !== 'object') {
    return false;
  }
  const missingFields = requiredBodyFields.some(
    field => requestBody[field] == null,
  );
  if (missingFields) {
    Logger.error('Missing fields from body', missingFields);
    return false;
  }

  if (requestBody.commit.length < COMMIT_LENGTH) {
    Logger.error('Commit must be a minimum of 12 characters');
    return false;
  }

  return true;
}

function extractRequestBody(body: ALBEvent['body']): ParsedBody | undefined {
  const requestBody: unknown = JSON.parse(body || '');
  if (!validateRequestBody(requestBody)) {
    return undefined;
  }

  return {
    ...requestBody,
    commit: requestBody.commit.substring(0, 12),
  };
}

/**
 * Takes a product CI integrator build status object and finds the associated PR for it and posts a comment
 * @param request the lambda event object with appropriate fields in body
 */
export const integratorStatus = async (
  request: ALBEvent,
): Promise<Response<SuccessPayload | FailPayload>> => {
  const params = extractRequestBody(request.body);
  if (!params) {
    return response(
      ResponseCode.BAD_REQUEST,
      `This endpoint requires the following fields: ${requiredBodyFields}.`,
    );
  }

  if (!isEnabledBranch(params.branchName)) {
    const reason = `Branch ${params.branchName} is not enabled for integrator status reporting`;
    Logger.info(reason);
    return response(ResponseCode.OK, { addedComment: false, reason });
  }

  // Store in DB
  const db = await DB.getInstance();
  await db.putStatus(params.commit, params.product, params.branchName, {
    successful: params.isSuccessful,
    buildNumber: params.buildNumber,
    resultUrl: params.resultUrl,
    numPackagesInstalled: params.numPackagesInstalled,
  });

  if (params.numPackagesInstalled === 0) {
    Logger.info('No packages installed, skipping comment');
    return response(ResponseCode.OK, {
      addedComment: false,
      reason: 'No packages installed',
    });
  }

  Logger.info('Attempting to add PR comment', params);
  const bbUsername = await Secrets.get('BITBUCKET_USER');
  const bbPassword = await Secrets.get('BITBUCKET_PASSWORD');
  const pullRequest = await getPrFromCommit(
    params.commit,
    config.repository,
    `source.branch.name = "${params.branchName}"`,
    { username: bbUsername, password: bbPassword },
  );
  const responsePayload: SuccessPayload = { addedComment: false };
  if (pullRequest) {
    Logger.info('Found pull request for commit', {
      commit: params.commit,
      pullRequestId: pullRequest.id,
    });
    responsePayload.pullRequestId = pullRequest.id;
    const statuses = await db.getStatuses(params.commit, params.branchName);
    if (!statuses || statuses.length === 0) {
      Logger.error('Cannot find any statuses in DB', {
        pullRequestId: pullRequest.id,
        commit: params.commit,
        branchName: params.branchName,
      });
      return response(ResponseCode.ERROR);
    }
    await addPrStatusComment(
      pullRequest.id,
      params.commit,
      params.branchName,
      statuses,
    );
    responsePayload.addedComment = true;
  } else {
    Logger.info('No PR found for commit', {
      commit: params.commit,
      repo: config.repository,
      branchName: params.branchName,
    });
    responsePayload.reason = 'No PR found';
  }

  Logger.info('Integrator status complete', {
    pullRequestId: pullRequest && pullRequest.id,
    commit: params.commit,
    responsePayload,
  });

  return response(ResponseCode.OK, responsePayload);
};
