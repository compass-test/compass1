import { PullRequest } from '@atlaskit/build-utils/bitbucket/types';
import { ParsedWebhookRequest } from '../../types';
import { Response, response, ResponseCode } from '../../lib/utils/response';
import { Logger } from '../../lib/Logger';
import { DB } from '../../lib/db';
import { addPrStatusComment, isEnabledBranch } from '../../lib/status';

type SuccessPayload = {
  addedComment: boolean;
  reason?: string;
};

type FailPayload = string;

function isPullRequest(pr: any): pr is PullRequest {
  if (!pr) {
    Logger.error('Missing pullrequest field');
    return false;
  }

  if (!pr.source || !pr.source.commit || !pr.source.commit.hash) {
    Logger.error('Missing source commit hash field');
    return false;
  }

  if (!pr.source || !pr.source.branch || !pr.source.branch.name) {
    Logger.error('Missing source branch name field');
    return false;
  }

  return true;
}

export async function prCreated(
  request: ParsedWebhookRequest,
): Promise<Response<SuccessPayload | FailPayload>> {
  Logger.info('Received webhook request', { request });

  const pullRequest = request.body['pullrequest'];

  if (!isPullRequest(pullRequest)) {
    return response(ResponseCode.BAD_REQUEST, 'Invalid pullrequest field');
  }
  const commit = pullRequest.source.commit.hash;
  const branchName = pullRequest.source.branch.name;

  if (!isEnabledBranch(branchName)) {
    const reason = `Branch ${branchName} is not enabled for integrator status reporting`;
    Logger.info(reason);
    return response(ResponseCode.OK, { addedComment: false, reason });
  }

  const db = await DB.getInstance();
  const statuses = await db.getStatuses(commit, branchName);

  const responsePayload: SuccessPayload = { addedComment: false };
  if (statuses && statuses.length > 0) {
    Logger.info('Found statuses', { prId: pullRequest.id, commit, branchName });
    await addPrStatusComment(pullRequest.id, commit, branchName, statuses);
    responsePayload.addedComment = true;
  } else {
    Logger.info('No statuses found', {
      prId: pullRequest.id,
      commit,
      branchName,
    });
  }

  return response(ResponseCode.OK, responsePayload);
}
