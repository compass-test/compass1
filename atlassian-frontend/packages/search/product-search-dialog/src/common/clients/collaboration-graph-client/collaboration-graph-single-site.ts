import {
  ContainerType,
  CollaborationGraphResponse,
  CollaborationGraphContainer,
  CollaborationGraphUser,
  Site,
} from '../common-types';
import { CollaborationGraphConfig } from './collaboration-graph-types';
import { CollaborationGraph, ContainersArg } from './collaboration-graph';
import {
  CONTEXT_USER_ID,
  MAX_CG_RESULTS,
  QUICK_SEARCH_COLLABORATION_GRAPH_CONTEXT,
} from './collaboration-graph-client';

interface CollaborationGraphRequest {
  containerTypes?: ContainerType[];
  context: {
    contextType: string;
    principalId: string;
    siteId: string;
    sessionId?: string;
  };
  maxNumberOfResults: number;
  userId: string;
  expanded: true;
}

type CloudId = Pick<Site, 'cloudId'>;
type SessionId = Pick<Site, 'collabGraphSessionId'>;

export class CollaborationGraphSingleSite extends CollaborationGraph<
  CloudId,
  ContainersArg & CloudId
> {
  CONTAINER_URL_PATH: string = 'v1/collaborationgraph/user/container';
  USER_URL_PATH: string = 'v1/collaborationgraph/user/user';

  constructor({ collaborationGraphUrl: url }: CollaborationGraphConfig) {
    super({ url });
  }

  getUsers(
    arg: CloudId,
  ): Promise<CollaborationGraphResponse<CollaborationGraphUser>> {
    return this.usersCache.get(arg).value;
  }

  getContainers({
    containerTypes,
    cloudId,
  }: ContainersArg & CloudId): Promise<
    CollaborationGraphResponse<CollaborationGraphContainer>
  > {
    return this.containersCache.get({ containerTypes, cloudId }).value;
  }

  async getContainersSupplier({
    containerTypes,
    cloudId,
  }: ContainersArg & CloudId & SessionId): Promise<
    CollaborationGraphResponse<CollaborationGraphContainer>
  > {
    const body: CollaborationGraphRequest = {
      containerTypes,
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
      CollaborationGraphResponse<CollaborationGraphContainer>
    >(this.CONTAINER_URL_PATH, body);

    result.collaborationGraphEntities = result.collaborationGraphEntities.map(
      (cgEntity) => {
        return { ...cgEntity, siteId: cloudId };
      },
    );

    return { ...result, timings: durationMs };
  }
  async getUsersSupplier({
    cloudId = '',
    collabGraphSessionId = '',
  }: CloudId & SessionId): Promise<
    CollaborationGraphResponse<CollaborationGraphUser>
  > {
    const body: CollaborationGraphRequest = {
      context: {
        principalId: CONTEXT_USER_ID,
        siteId: cloudId,
        sessionId: collabGraphSessionId,
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
      (cgEntity) => {
        return { ...cgEntity, siteId: cloudId };
      },
    );

    return { ...result, timings: durationMs };
  }
}
