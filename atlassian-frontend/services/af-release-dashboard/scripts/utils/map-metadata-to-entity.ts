import { Release } from '../../types/releases';
import { PullRequestEntity } from '../../src/db/entities/PullRequest';
import { PrMetadata } from '@atlaskit/scheduled-releases/scripts/getPrsInRelease';
import { getEarliestMergeDate } from './send-releases-server';
import { ReleaseRequestPayload } from '../../src/ui/interfaces/release-request-payload';

export function mapPRMetadataToEntity(
  pullRequest: PrMetadata,
): PullRequestEntity {
  return {
    branch: pullRequest.branch,
    author: pullRequest.author,
    bitbucketId: pullRequest.pullRequestId,
    bitbucketUrl: `https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/${pullRequest.pullRequestId}`,
    commitHash: pullRequest.mergeCommit,
    mergeDate: pullRequest.mergeDate.substring(
      0,
      pullRequest.mergeDate.length - 6,
    ),
    title: pullRequest.title,
  };
}

export function mapReleaseMetadataToPayload(
  releases: Release[],
): ReleaseRequestPayload[] {
  return releases.map<ReleaseRequestPayload>((release) => {
    const pullRequests = release.pullRequests.map<PullRequestEntity>(
      mapPRMetadataToEntity,
    );
    return {
      name: release.name,
      createdDate: getEarliestMergeDate(pullRequests),
      pullRequests,
    };
  });
}
