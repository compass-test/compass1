import { ContainerType, Site } from '../../clients/common-types';
import { CollaborationGraphSingleSite } from './collaboration-graph-single-site';
import { CollaborationGraphMultiSite } from './collaboration-graph-multi-site';
import { CollaborationGraphClientConfig } from './collaboration-graph-types';

export const MAX_CG_RESULTS = 10;

export const CONTEXT_USER_ID = 'context';
export const QUICK_SEARCH_COLLABORATION_GRAPH_CONTEXT = 'quickSearch';

export class CollaborationGraphClient {
  private isMultiSite: boolean;
  private cloudId: string;
  private sites: Site[];

  private collabGraphSingleSite: CollaborationGraphSingleSite;
  private collabGraphMultiSite: CollaborationGraphMultiSite;

  constructor(config: CollaborationGraphClientConfig) {
    this.collabGraphSingleSite = new CollaborationGraphSingleSite(config);
    this.collabGraphMultiSite = new CollaborationGraphMultiSite(config);
    this.isMultiSite = config.isMultiSite;
    this.cloudId = config.cloudId;
    this.sites = config.sites;
  }

  public getContainers = (
    containerTypes: ContainerType[],
    sites: Site[] = [],
  ) => {
    if (this.isMultiSite) {
      return this.collabGraphMultiSite.getContainers({
        selectedSites: sites,
        containerTypes,
        allSites:
          this.sites.length > 0
            ? this.sites
            : ([
                {
                  cloudId: this.cloudId,
                },
              ] as Site[]),
      });
    } else {
      return this.collabGraphSingleSite.getContainers({
        containerTypes,
        cloudId: this.cloudId,
      });
    }
  };

  public getUsers = (sites: Site[] = []) => {
    if (this.isMultiSite) {
      return this.collabGraphMultiSite.getUsers({
        allSites:
          this.sites.length > 0
            ? this.sites
            : ([
                {
                  cloudId: this.cloudId,
                },
              ] as Site[]),
        selectedSites: sites,
      });
    } else {
      return this.collabGraphSingleSite.getUsers({ cloudId: this.cloudId });
    }
  };
}
