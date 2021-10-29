import { getConnection, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { safeLowerTrim } from '../../utils';
import { Release, ReleaseStatus } from '../../../db/entities/Release';
import { PullRequest } from '../../../db/entities/PullRequest';
import { FindAllParams, FindAllResults } from './types';
import { NotFoundException } from '../../middleware/errors/exceptions';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { ReleaseRequestPayload } from '../../../ui/interfaces/release-request-payload';

function mapReleaseToClass(data: ReleaseRequestPayload) {
  const pullRequests = plainToClass(PullRequest, data.pullRequests);
  return plainToClass(Release, {
    ...data, // All extra info
    // Special fields
    name: safeLowerTrim(data.name),
    createdDate: data.createdDate || new Date().toISOString(),
    pullRequests,
  });
}

function getCreateDate(data: ReleaseRequestPayload) {
  if (data.createdDate) {
    return data.createdDate;
  }

  if (data.pullRequests.length > 0) {
    const recentDate = data.pullRequests
      .map((pr) => new Date(pr.mergeDate))
      .sort((a, b) => a.getTime() - b.getTime())
      .shift();

    if (recentDate) {
      return recentDate.toISOString();
    }
  }

  return new Date().toISOString();
}

function getInitialStatus(data: ReleaseRequestPayload) {
  return data.status || ReleaseStatus.planned;
}

export class ReleaseService {
  async find(
    name: string,
    options?: { withPullRequests: boolean },
  ): Promise<Release | undefined> {
    let queryBuilder = getRepository(Release)
      .createQueryBuilder('release')
      .orderBy('release.createdDate', 'DESC')
      .where({ name });

    if (options?.withPullRequests) {
      queryBuilder = queryBuilder
        .leftJoinAndSelect('release.pullRequests', 'pullRequests')
        .addOrderBy('pullRequests.mergeDate', 'DESC');
    }
    return queryBuilder.getOne();
  }

  calculateAverageDevelopmentDays(
    releases: Array<Release>,
    startDate: keyof Release,
    endDate: keyof Release,
  ): [number | undefined, Array<string>] {
    const validReleases = releases.filter(
      (release) => release[startDate] && release[endDate],
    );
    if (validReleases.length === 0) {
      return [undefined, []];
    }
    const averageDevelopmentDaysArray = validReleases.map((release) => {
      return differenceInCalendarDays(
        release[endDate] as Date,
        release[startDate] as Date,
      );
    });
    return [
      averageDevelopmentDaysArray.reduce((a, b) => a + b, 0) /
        validReleases.length,
      validReleases.map((release) => release.name),
    ];
  }

  async findAllWithAverages(numberOfReleases = 10) {
    let releases = await getRepository(Release)
      .createQueryBuilder('release')
      .where('release.status != :status', { status: ReleaseStatus.planned })
      .orderBy('release.createdDate', 'DESC')
      .limit(numberOfReleases)
      .getMany();
    const [
      averageDevelopmentDays,
      averageDevelopmentReleases,
    ] = this.calculateAverageDevelopmentDays(
      releases,
      'developmentDate',
      'stabilizingDate',
    );
    const [
      averageStabilisationDays,
      averageStabilisationReleases,
    ] = this.calculateAverageDevelopmentDays(
      releases,
      'stabilizingDate',
      'releaseToNPMDate',
    );
    const [
      averageAdoptionDays,
      averageAdoptionDaysReleases,
    ] = this.calculateAverageDevelopmentDays(
      releases,
      'releaseToNPMDate',
      'adoptedByOneProductDate',
    );
    return {
      averageDevelopmentDurationInDays: averageDevelopmentDays,
      averageDevelopmentDurationInDaysReleases: averageDevelopmentReleases,
      averageStabilisationDurationInDays: averageStabilisationDays,
      averageStabilisationDurationInDaysReleases: averageStabilisationReleases,
      averageAdoptionByOneProductDurationInDays: averageAdoptionDays,
      averageAdoptionByOneProductDurationInDaysReleases: averageAdoptionDaysReleases,
    };
  }

  async findAll({
    size,
    page,
    withPullRequests,
  }: FindAllParams): Promise<FindAllResults> {
    let queryBuilder = getRepository(Release)
      .createQueryBuilder('release')
      .where('release.status != :status', { status: ReleaseStatus.planned })
      .orderBy('release.createdDate', 'DESC');

    if (size) {
      queryBuilder.take(size).skip((page - 1) * size);
    }

    const [releases, found] = await queryBuilder.getManyAndCount();

    // We only expand pull request when is requested and there is a size
    // to prevent expand all the pull requests in all the releases
    if (!withPullRequests || !size) {
      return { releases, found };
    }

    // Expanded with pull requests
    const releasesWithPullRequests = await getRepository(Release)
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.pullRequests', 'pullRequests')
      .whereInIds(releases.map(({ name }) => name))
      .orderBy('release.createdDate', 'DESC')
      .addOrderBy('pullRequests.mergeDate', 'DESC')
      .getMany();

    return { releases: releasesWithPullRequests, found };
  }

  async save(releasesData: ReleaseRequestPayload[] | ReleaseRequestPayload) {
    let releases: Release[];
    if (Array.isArray(releasesData)) {
      releases = releasesData.map(mapReleaseToClass);
    } else {
      releases = [mapReleaseToClass(releasesData)];
    }

    const releaseRepository = getRepository(Release);
    const saveds = await releaseRepository.save(releases);
    return saveds;
  }

  /**
   * Create a release if does not exist, it will not create the passed pull requests.
   * @param releasesData
   * @return Release created
   */
  async createEmpty(releasesData: ReleaseRequestPayload) {
    let releaseDB = await this.find(releasesData.name);
    if (releaseDB) {
      return releaseDB;
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Release)
      .values([
        {
          name: safeLowerTrim(releasesData.name),
          createdDate: getCreateDate(releasesData),
          status: getInitialStatus(releasesData),
        },
      ])
      .execute();
    releaseDB = await this.find(releasesData.name);
    return releaseDB!;
  }

  async update(name: string, releaseData: Partial<ReleaseRequestPayload>) {
    let releaseDB = await this.find(name);
    if (!releaseDB) {
      throw new NotFoundException(`Release ${name} was not found.`);
    }

    await getRepository(Release)
      .createQueryBuilder()
      .update(Release)
      .set({
        ...releaseData,
      })
      .where('name = :name', { name: name })
      .execute();

    return this.find(name);
  }
}

const releaseService = new ReleaseService();

export default releaseService;
