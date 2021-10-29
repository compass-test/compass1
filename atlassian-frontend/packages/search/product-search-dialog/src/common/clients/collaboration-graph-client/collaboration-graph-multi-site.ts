import uniqBy from 'lodash/uniqBy';
import { CollaborationGraphConfig } from './collaboration-graph-types';
import {
  CollaborationGraphResponse,
  CollaborationGraphContainer,
  CollaborationGraphUser,
  Site,
} from '../common-types';
import { CollaborationGraph, ContainersArg } from './collaboration-graph';
import {
  CONTEXT_USER_ID,
  MAX_CG_RESULTS,
  QUICK_SEARCH_COLLABORATION_GRAPH_CONTEXT,
} from './collaboration-graph-client';
import {
  extractSiteIdBySiteUrl,
  limitToMaxSiteUsage,
} from '../multi-site-utils';

interface CloudIds {
  cloudIds: Array<string>;
}

interface MultiSiteArgs extends AllSitesArg {
  selectedSites: Array<Site>;
}

interface AllSitesArg {
  allSites: Array<Site>;
}

const mergeUsers = (
  prevResult: CollaborationGraphResponse<CollaborationGraphUser>,
  nextResult: CollaborationGraphResponse<CollaborationGraphUser>,
): CollaborationGraphResponse<CollaborationGraphUser> => ({
  timings: Math.max(prevResult.timings, nextResult.timings),
  collaborationGraphEntities: uniqBy(
    prevResult.collaborationGraphEntities.concat(
      nextResult.collaborationGraphEntities,
    ),
    (user) => user.id,
  ),
});

const emptyUserResponse: CollaborationGraphResponse<CollaborationGraphUser> = {
  timings: 0,
  collaborationGraphEntities: [],
};

export class CollaborationGraphMultiSite extends CollaborationGraph<
  CloudIds,
  CloudIds & ContainersArg
> {
  CONTAINER_URL_PATH: string =
    'v1/collaborationgraph/multitenant/user/container';
  USER_URL_PATH: string = 'v1/collaborationgraph/user/user';

  async getContainersSupplier(
    arg: CloudIds & ContainersArg & AllSitesArg,
  ): Promise<CollaborationGraphResponse<CollaborationGraphContainer>> {
    const body = {
      containerTypes: arg.containerTypes,
      context: {
        principalId: CONTEXT_USER_ID,
        siteIds: arg.cloudIds,
        contextType: QUICK_SEARCH_COLLABORATION_GRAPH_CONTEXT,
      },
      maxNumberOfResults: MAX_CG_RESULTS,
      userId: CONTEXT_USER_ID,
      expanded: true,
    };

    const { result, durationMs } = await this.makeRequest<
      CollaborationGraphResponse<CollaborationGraphContainer>
    >(this.CONTAINER_URL_PATH, body);

    result.collaborationGraphEntities = result.collaborationGraphEntities.map(
      (cgEntity) => {
        return {
          ...cgEntity,
          siteId: extractSiteIdBySiteUrl(
            cgEntity.containerDetails.url,
            arg.allSites,
          ),
        };
      },
    );
    return { ...result, timings: durationMs };
  }

  async getUsersSupplier(
    arg: CloudIds,
  ): Promise<CollaborationGraphResponse<CollaborationGraphUser>> {
    const results = arg.cloudIds.map(async (cloudId) => {
      const body = {
        context: {
          principalId: CONTEXT_USER_ID,
          siteId: cloudId,
          contextType: QUICK_SEARCH_COLLABORATION_GRAPH_CONTEXT,
        },
        maxNumberOfResults: MAX_CG_RESULTS,
        userId: CONTEXT_USER_ID,
        expanded: true,
      };

      const { result, durationMs } = await this.makeRequest<
        CollaborationGraphResponse<CollaborationGraphUser>
      >(this.USER_URL_PATH, body);

      result.collaborationGraphEntities = result.collaborationGraphEntities.map(
        (cgEntity) => ({ ...cgEntity, siteId: cloudId }),
      );
      return { ...result, timings: durationMs };
    });

    return Promise.all(results).then((values) =>
      values.reduce(mergeUsers, emptyUserResponse),
    );
  }

  getUsers({
    allSites,
    selectedSites,
  }: MultiSiteArgs): Promise<
    CollaborationGraphResponse<CollaborationGraphUser>
  > {
    if (selectedSites.length === 0) {
      return this.usersCache.get({
        cloudIds: limitToMaxSiteUsage(allSites).map((site) => site.cloudId),
      }).value;
    } else {
      return this.getUsersSupplier({
        cloudIds: selectedSites.map((site) => site.cloudId),
      });
    }
  }

  getContainers({
    allSites,
    selectedSites,
    containerTypes,
  }: MultiSiteArgs & ContainersArg): Promise<
    CollaborationGraphResponse<CollaborationGraphContainer>
  > {
    if (selectedSites.length === 0) {
      return this.containersCache.get({
        cloudIds: limitToMaxSiteUsage(allSites).map((site) => site.cloudId),
        containerTypes,
      }).value;
    } else {
      return this.getContainersSupplier({
        cloudIds: selectedSites.map((site) => site.cloudId),
        containerTypes,
        allSites,
      });
    }
  }

  constructor(config: CollaborationGraphConfig) {
    super({ url: config.collaborationGraphUrl });
  }
}
