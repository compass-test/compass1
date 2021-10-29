import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import {
  CollaborationGraphResponse,
  CollaborationGraphContainer,
  CollaborationGraphUser,
  ContainerType,
} from '../common-types';
import { SimpleCache } from '../../../utils/simple-cache';
import { timed } from '../timing';

export interface ContainersArg {
  containerTypes: ContainerType[];
}

export abstract class CollaborationGraph<T, U> {
  abstract readonly CONTAINER_URL_PATH: string;

  abstract readonly USER_URL_PATH: string;

  abstract getContainersSupplier(
    arg: U,
  ): Promise<CollaborationGraphResponse<CollaborationGraphContainer>>;

  abstract getUsersSupplier(
    arg: T,
  ): Promise<CollaborationGraphResponse<CollaborationGraphUser>>;

  containersCache: SimpleCache<
    Promise<CollaborationGraphResponse<CollaborationGraphContainer>>,
    [U]
  >;

  usersCache: SimpleCache<
    Promise<CollaborationGraphResponse<CollaborationGraphUser>>,
    [T]
  >;

  serviceConfig: ServiceConfig;

  async makeRequest<T>(
    path: string,
    body: object,
  ): Promise<{ result: T; durationMs: number }> {
    const options: RequestServiceOptions = {
      path,
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    };

    return timed(utils.requestService<T>(this.serviceConfig, options));
  }

  constructor({ url }: ServiceConfig) {
    this.serviceConfig = { url };
    this.getContainersSupplier = this.getContainersSupplier.bind(this);
    this.getUsersSupplier = this.getUsersSupplier.bind(this);
    this.containersCache = new SimpleCache(this.getContainersSupplier);
    this.usersCache = new SimpleCache(this.getUsersSupplier);
  }
}
