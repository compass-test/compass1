import { plainToClass } from 'class-transformer';
import { getManager, EntityManager, getRepository } from 'typeorm';
import { safeLowerTrim, getEarliest } from '../../utils';
import {
  PullRequest,
  PullRequestEntity,
} from '../../../db/entities/PullRequest';
import { Release } from '../../../db/entities/Release';

export class PullRequestsService {
  /**
   * Creates a release with `releaseName` if it doesn't exist.
   * If a release exists, but its `createdDate` does not match
   * the earliest `mergeDate` of any current or future pull request
   * associated with it, it updates the release's `createdDate`
   * to that earliest `mergeDate`.
   */
  private async prepareRelease(
    releaseName: string,
    pullRequestData: PullRequestEntity,
    entityManager: EntityManager,
  ): Promise<Release> {
    let [release] = await entityManager.findByIds(Release, [releaseName]);
    if (!release) {
      release = plainToClass(Release, {
        name: releaseName,
        createdDate: pullRequestData.mergeDate,
      });
      release = await entityManager.save(release);
    } else {
      const earliestOtherPullRequest = await entityManager
        .createQueryBuilder(PullRequest, 'pullRequests')
        .where('pullRequests.releaseName = :releaseName', { releaseName })
        .andWhere('pullRequests.bitbucketId != :bitbucketId', {
          bitbucketId: pullRequestData.bitbucketId,
        })
        .orderBy('pullRequests.mergeDate', 'ASC')
        .limit(1)
        .getOne();
      const earliestMergeDate = earliestOtherPullRequest
        ? getEarliest(
            earliestOtherPullRequest.mergeDate,
            pullRequestData.mergeDate,
          )
        : pullRequestData.mergeDate;
      if (new Date(release.createdDate) !== new Date(earliestMergeDate)) {
        release = plainToClass(Release, {
          name: release.name,
          createdDate: new Date(earliestMergeDate).toISOString(),
        });
        release = await entityManager.save(release);
      }
    }
    return release;
  }

  async save(pullRequestData: PullRequestEntity, releaseName: string) {
    const saved = await getManager().transaction(
      async (transactionalEntityManager) => {
        const release = await this.prepareRelease(
          safeLowerTrim(releaseName),
          pullRequestData,
          transactionalEntityManager,
        );
        const pullRequest = plainToClass(PullRequest, {
          ...pullRequestData,
          release,
        });
        return transactionalEntityManager.save(pullRequest);
      },
    );
    return saved;
  }

  /**
   * It will create any pull request in the array that does not exist in the
   * database, it will do nothing if the pull request already exists.
   * @param pullRequestData
   * @param release
   */
  async create(pullRequestData: PullRequestEntity[], release: Release) {
    const prRepository = getRepository(PullRequest);

    // Find all the existing Pull Requests
    const bitbucketIds = pullRequestData.map((pr) => pr.bitbucketId);
    const existingPRs = await prRepository
      .createQueryBuilder('pullRequests')
      .whereInIds(bitbucketIds)
      .getMany();
    const existingBitbucketIds = existingPRs.map((pr) => pr.bitbucketId);

    // Removed from the data the existing PRs
    const pullRequestToCreate = pullRequestData.filter(
      (pr) => existingBitbucketIds.indexOf(pr.bitbucketId) === -1,
    );

    await prRepository
      .createQueryBuilder()
      .insert()
      .into(PullRequest)
      .values(pullRequestToCreate.map((pr) => ({ ...pr, release })))
      .execute();

    return;
  }
}

const pullRequestsService = new PullRequestsService();

export default pullRequestsService;
