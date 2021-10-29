export type { PageTreeItemProperties } from './ui/page-tree-for-embedded-pages/types';

interface PublishUser {
  accountId: string;
  displayName: string;
  profilePicture: {
    path: string;
  };
}

interface Metadata {
  frontend: {
    collabService: 'synchrony' | 'ncs';
  };
}

interface Version extends LastUpdated {
  collaborators: { users: PublishUser[] };
}

export interface LastUpdated {
  friendlyWhen: string;
  number: number;
}

interface MetadataWithCurrentUser extends Metadata {
  currentuser: {
    lastmodified: {
      friendlyLastModified: string;
      version: {
        number: number;
        by: PublishUser;
      };
    };
  };
}

export interface PageDataRaw extends WithExtensions, WithLinks<Links> {
  id: string;
  title: string;
  status: string;
  hasDraftChildren?: boolean;
  childTypes: {
    page: {
      value: boolean;
    };
  };
  history?: {
    lastUpdated?: LastUpdated;
    contributors?: {
      publishers?: {
        users: PublishUser[];
      };
    };
  };
  metadata: Metadata;
}

export interface SearchResult
  extends PageDataRaw,
    WithChildren<SearchResult>,
    WithExtensions {
  ancestors: Ancestor[];
  metadata: MetadataWithCurrentUser;
  version: Version;
}

export interface Ancestor {
  id: string;
}

export interface WithLinks<T extends Links> {
  _links: T;
}

export interface LinksWithBase extends Links, WithBase {}

export interface Links {
  self: string;
  tinyui: string;
  editui: string;
  webui: string;
}

interface WithBase {
  base: string;
}

export type WithLinksBase<T> = Omit<T, '_links'> & WithLinks<LinksWithBase>;

export type PageData = WithLinksBase<PageDataRaw>;
export type PageDataWithAncestors = WithLinksBase<SearchResult>;

interface WithChildren<T> {
  children?: T[];
}

interface WithExtensions {
  extensions: {
    position: number | string;
  };
}

export interface PageTreeItem extends PageData, WithChildren<PageTreeItem> {
  error?: boolean; // technically if error=true, none of the other props are defined
  parent?: PageTreeItem;
  isExpanded: boolean;
}

export interface RecursiveFetchArgs<
  ResponseType extends {},
  ResultType extends {}
> {
  currentFetch: Promise<ResponseType>;
  terminatingFn: (response: ResponseType) => boolean;
  getNextFetch: (args: ResponseType) => Promise<ResponseType>;
  getResults: (response: ResponseType) => ResultType[];
  accumulator?: ResultType[];
}

export enum Errors {
  Error = 'error',
  Empty = 'empty',
}

export enum TreeStates {
  Loading = 'loading',
  RenderedChildren = 'rendered-children',
  Empty = 'empty',
  Error = 'error',
}

export type AnalyticsWebClient = {
  sendUIEvent: () => void;
  sendOperationalEvent: () => void;
  sendTrackEvent: () => void;
  sendScreenEvent: () => void;
};

export interface PaginatedResults {
  start: number;
  size: number;
  limit: number;
}

export interface PaginatedPageResults<T> extends PaginatedResults {
  results: T[];
}

export interface ResponseWithLinks {
  _links: {
    base: string;
    context: string;
  };
}

export interface ChildPagesResponse
  extends PaginatedPageResults<PageDataRaw>,
    ResponseWithLinks {}

export interface SearchResponse
  extends PaginatedPageResults<SearchResult>,
    ResponseWithLinks {}

export interface SpaceContentResponse extends ResponseWithLinks {
  page: PaginatedPageResults<PageDataRaw>;
  blogpost: PaginatedPageResults<PageDataRaw>;
}
