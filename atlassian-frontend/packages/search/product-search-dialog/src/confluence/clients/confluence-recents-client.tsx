import {
  KeyValues,
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import { SpaceContainerType } from '../../common/clients/common-types';
import {
  CollaborationGraphClient,
  CollaborationGraphResponse,
  CollaborationGraphContainer,
  timed,
} from '../../common/clients';
import CancellablePromise from '../../utils/cancellable-promise';
import { SimpleCache } from '../../utils/simple-cache';
import {
  ConfItemResult,
  ConfItemResults,
  ConfluenceItemContentType,
  ConfluenceObjectResult,
  ConfluenceSpace,
  ConfSpaceResult,
  ConfSpaceResults,
  ContentType,
  GenericContainerResult,
  RecentConfluence,
} from './response-types';

export const RECENT_PAGES_PATH: string = 'rest/recentlyviewed/1.0/recent';
export const RECENT_SPACE_PATH: string =
  'rest/recentlyviewed/1.0/recent/spaces';

const RECENT_PAGES_LIMIT: number = 200;
const RECENT_SPACE_LIMIT: number = 5;

export interface RecentPageResponse {
  available: boolean;
  contentType: ConfluenceItemContentType;
  id: number;
  lastSeen: number;
  space: string;
  spaceKey: string;
  title?: string; // Due to some Confluence bug there is a chance that recent pages come back with NO title
  type: string;
  url: string;
  iconClass: string;
}

export interface RecentSpaceResponse {
  id: string;
  key: string;
  icon: string;
  name: string;
}

export interface ConfluenceRecentsClientConfig {
  url: string;
  isCollaborationGraphEnabled: boolean;
  recentItemsSupplier?: () => Promise<ConfItemResults>;
}

export class ConfluenceRecentsClient {
  private baseUrl: string;

  private serviceConfig: ServiceConfig;

  private recentItemCache: SimpleCache<Promise<ConfItemResults>>;

  private recentSpaceCache: SimpleCache<Promise<ConfSpaceResults>>;

  private isCollabGraphEnabled: boolean;

  private collaborationGraphClient: CollaborationGraphClient;

  constructor(
    {
      url,
      isCollaborationGraphEnabled,
      recentItemsSupplier,
    }: ConfluenceRecentsClientConfig,
    collabGraphClient: CollaborationGraphClient,
  ) {
    this.serviceConfig = { url: url };
    this.baseUrl = url;
    this.recentItemCache = new SimpleCache(
      recentItemsSupplier || this.recentItemsSupplier,
    );
    this.recentSpaceCache = new SimpleCache(this.recentSpacesSupplier);
    this.collaborationGraphClient = collabGraphClient;
    this.isCollabGraphEnabled = isCollaborationGraphEnabled;
  }

  protected getRecent<T extends ConfItemResults | ConfSpaceResults>(
    cache: SimpleCache<Promise<T>>,
  ) {
    const { fromCache, value } = cache.get();
    return CancellablePromise.from(
      value.then((results) => ({ ...results, isCached: fromCache })),
    );
  }

  public getRecentItems(): CancellablePromise<ConfItemResults> {
    return this.getRecent(this.recentItemCache);
  }

  public getRecentSpaces(): CancellablePromise<ConfSpaceResults> {
    return this.getRecent(this.recentSpaceCache);
  }

  private recentItemsSupplier: () => Promise<ConfItemResults> = async () => {
    const baseUrl = this.serviceConfig.url;

    const recentPagesPromiseWithTimings = this.createRecentRequestPromise<
      RecentPageResponse
    >(RECENT_PAGES_PATH, {
      limit: RECENT_PAGES_LIMIT,
    });

    const { result, durationMs } = await recentPagesPromiseWithTimings;

    const items = result
      .filter((page) => !!page.title)
      .map((recentPage) => recentPageToResult(recentPage, baseUrl));

    return {
      items,
      totalSize: items.length,
      timings: durationMs,
    };
  };

  private recentSpacesSupplier: () => Promise<ConfSpaceResults> = () => {
    if (this.isCollabGraphEnabled) {
      return this.collaborationGraphClient
        .getContainers([SpaceContainerType])
        .then((response) => mapCollabGraphContainer(response));
    } else {
      const recentSpacesPromise = this.createRecentRequestPromise<
        RecentSpaceResponse
      >(RECENT_SPACE_PATH, { limit: RECENT_SPACE_LIMIT });

      return recentSpacesPromise.then(({ result, durationMs }) => ({
        items: result.map((recentSpace) =>
          recentSpaceToResult(
            recentSpace,
            `${this.baseUrl}/spaces/${recentSpace.key}`,
          ),
        ),
        timings: durationMs,
      }));
    }
  };

  private createRecentRequestPromise<T>(
    path: string,
    queryParams: KeyValues,
  ): Promise<{ result: Array<T>; durationMs: number }> {
    const options: RequestServiceOptions = {
      path: path,
      queryParams: queryParams,
    };

    const requestPromise: Promise<Array<T>> = utils.requestService(
      this.serviceConfig,
      options,
    );

    return timed(requestPromise);
  }
}

function recentPageToResult(
  recentPage: RecentPageResponse,
  baseUrl: string,
): ConfItemResult {
  return {
    resultId: String(recentPage.id),
    name: recentPage.title || '', // This is a failsafe, there should be a filter to drop pages with no titles
    href: `${baseUrl}${recentPage.url}`,
    containerName: recentPage.space,
    analyticsType: RecentConfluence,
    resultType: ConfluenceObjectResult,
    contentType: `confluence-${recentPage.contentType}` as ContentType,
    iconClass: recentPage.iconClass,
    containerId: recentPage.spaceKey,
    isRecentResult: true,
    lastModified: undefined, // not available for recent results
  };
}

function recentSpaceToResult(
  recentSpace: RecentSpaceResponse,
  href: string,
): ConfSpaceResult {
  return {
    resultId: recentSpace.id,
    name: recentSpace.name,
    key: recentSpace.key,
    href,
    avatarUrl: recentSpace.icon,
    analyticsType: RecentConfluence,
    resultType: GenericContainerResult,
    contentType: ConfluenceSpace,
    id: recentSpace.id,
  };
}

function mapCollabGraphContainer(
  response: CollaborationGraphResponse<CollaborationGraphContainer>,
): ConfSpaceResults {
  const items = response.collaborationGraphEntities
    .map((item) => ({
      id: item.containerDetails?.id,
      key: item.containerDetails?.key,
      icon: item.containerDetails?.iconUrl,
      name: item.containerDetails?.name,
      url: item.containerDetails?.url,
      siteId: item.siteId,
    }))
    .filter((space) => space.id !== undefined)
    .map((space) => recentSpaceToResult(space, space.url));

  return { items, timings: response.timings };
}
