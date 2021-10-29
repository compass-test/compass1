import { ScopedAggregatorResponse } from '../../common/clients/common-types';

/**
 * Instead of enum types for ResultType, AnalyticsType and ContentType we use a list of typed strings.
 * Typescript has issues when using types that require specific enum values (https://github.com/microsoft/TypeScript/issues/28102).
 *
 * There doesn't appear to be a working solution soon and as such we will manually type each value separately using strings.
 */

export enum Scope {
  ConfluencePageBlogAttachment = 'confluence.page,blogpost,attachment',
  ConfluencePageBlog = 'confluence.page,blogpost',
  ConfluenceExperimentsPageBlogAttachment = 'confluence_experiments.page,blogpost,attachment',
  ConfluenceSpace = 'confluence.space',
  People = 'cpus.user',
  UserConfluence = 'urs.user-confluence',
}

export type enumItemScope =
  | Scope.ConfluencePageBlogAttachment
  | Scope.ConfluencePageBlog
  | Scope.ConfluenceExperimentsPageBlogAttachment;
export type enumSpaceScope = Scope.ConfluenceSpace;
export type enumUserScope = Scope.People;

export const ConfluencePageBlogAttachmentScope: 'confluence.page,blogpost,attachment' = 'confluence.page,blogpost,attachment' as const;
export const ConfluencePageBlogScope: 'confluence.page,blogpost' = 'confluence.page,blogpost' as const;
export const ConfluenceExpPageBlogAttachment: 'confluence_experiments.page,blogpost,attachment' = 'confluence_experiments.page,blogpost,attachment' as const;
export const ConfluenceSpaceScope: 'confluence.space' = 'confluence.space' as const;
export const ConfluencePeopleScope: 'cpus.user' = 'cpus.user' as const;
export interface PropScopesType {
  itemScope?:
    | typeof ConfluencePageBlogAttachmentScope
    | typeof ConfluencePageBlogScope
    | typeof ConfluenceExpPageBlogAttachment;
  spaceScope?: typeof ConfluenceSpaceScope;
  userScope?: typeof ConfluencePeopleScope;
}

/*****************/
/** Result Type **/
/*****************/
export const GenericContainerResult: 'generic-container-result' = 'generic-container-result' as const;
export const PersonResult: 'person-result' = 'person-result' as const;
export const ConfluenceObjectResult: 'confluence-object-result' = 'confluence-object-result' as const;

export type ResultType =
  | typeof GenericContainerResult
  | typeof PersonResult
  | typeof ConfluenceObjectResult;

/********************/
/** Analytics Type **/
/********************/
export const RecentConfluence: 'recent-confluence' = 'recent-confluence' as const;
export const ResultConfluence: 'result-confluence' = 'result-confluence' as const;
export const RecentPerson: 'recent-person' = 'recent-person' as const;
export const ResultPerson: 'result-person' = 'result-person' as const;
export const AdvancedSearchConfluence: 'advanced-search-confluence' = 'advanced-search-confluence' as const;
export const AdvancedSearchPeople: 'advanced-search-people' = 'advanced-search-people' as const;

export type AnalyticsType =
  | typeof RecentConfluence
  | typeof ResultConfluence
  | typeof RecentPerson
  | typeof ResultPerson
  | typeof AdvancedSearchConfluence
  | typeof AdvancedSearchPeople;

/******************/
/** Content Type **/
/******************/
export const ConfluencePage: 'confluence-page' = 'confluence-page' as const;
export const ConfluenceBlogpost: 'confluence-blogpost' = 'confluence-blogpost' as const;
export const ConfluenceAttachment: 'confluence-attachment' = 'confluence-attachment' as const;
export const ConfluenceSpace: 'confluence-space' = 'confluence-space' as const;
export const Person: 'person' = 'person' as const;

export type ContentType =
  | typeof ConfluencePage
  | typeof ConfluenceBlogpost
  | typeof ConfluenceAttachment
  | typeof ConfluenceSpace
  | typeof Person;

export interface Result {
  resultId: string;
  // main text to show
  name: string;
  // url to link the result to
  href: string;
  // the analytics type to send in the analytics attributes
  analyticsType: AnalyticsType;
  // field to disambiguate between result types
  resultType: ResultType;
  contentType: ContentType;
}

export interface Results<T extends Result> {
  items: T[];
  timings: number;
}

/*****************************************/
/** Scope.UserConfluence & Scope.People **/
/*****************************************/

interface UrsPersonResponseItem {
  absoluteUrl?: string; // For any TCS errors this field will not be present in the response.
  avatarUrl: string;
  entityType: string;
  id: string;
  name: string;
  nickname?: string;
}

export interface ConfUrsPeopleResponse
  extends ScopedAggregatorResponse<Scope.UserConfluence> {
  results: UrsPersonResponseItem[];
}

interface PersonResponseItem {
  absoluteUrl?: string; // For any TCS errors this field will not be present in the response.
  account_id: string;
  name: string;
  nickname?: string;
  job_title?: string;
  picture: string;
}

export interface ConfPeopleResponse
  extends ScopedAggregatorResponse<Scope.People> {
  results: PersonResponseItem[];
}

export interface ConfPeopleResult extends Result {
  mentionName: string;
  // the message to display underneath the name, unfortuntately named this way ATM.
  presenceMessage: string;
  resultType: typeof PersonResult;
  avatarUrl: string;
  contentType: typeof Person;
  userId: string;
}

export interface ConfPeopleResults extends Results<ConfPeopleResult> {}

/****************************************************************/
/** Scope.ConfluencePageBlogAttachment & Scope.ConfluenceSpace **/
/****************************************************************/

export type ConfluenceItemContentType = 'page' | 'blogpost' | 'space';

interface Container {
  title: string;
  id?: string; // This has to be optional because Confluence doesn't return it
  displayUrl?: string;
}

interface ConfItemResponseItem {
  title: string; // this is highlighted
  baseUrl: string;
  url: string;
  content?: {
    id: string;
    type: ConfluenceItemContentType;
    space?: {
      id: string;
    };
  };
  container: Container;
  space?: {
    key: string; // currently used as instance-unique ID
    icon: {
      path: string;
    };
  };
  iconCssClass: string; // icon-file-* for attachments, otherwise not needed
  lastModified: string; // e.g. "2019-07-08T02:54:38.822Z"
}

export interface ConfItemResponse
  extends ScopedAggregatorResponse<
    | Scope.ConfluencePageBlogAttachment
    | Scope.ConfluencePageBlog
    | Scope.ConfluenceExperimentsPageBlogAttachment
  > {
  results: ConfItemResponseItem[];
  size?: number;
}

export interface ConfItemResult extends Result {
  containerName: string;
  containerId: string;
  spaceId?: string;
  resultType: typeof ConfluenceObjectResult;
  iconClass?: string;
  lastModified: string | undefined;
  // used to indicate the result came from the recently viewed FE cache
  isRecentResult: boolean;
}

export interface ConfItemResults extends Results<ConfItemResult> {
  totalSize: number;
}

export interface ConfSpaceResponse
  extends ScopedAggregatorResponse<Scope.ConfluenceSpace> {
  results: (ConfItemResponseItem & {
    id: string; // the id is present at the root for spaces responses
  })[];
}

export interface ConfSpaceResult extends Result {
  resultType: typeof GenericContainerResult;
  contentType: typeof ConfluenceSpace;
  avatarUrl: string;
  key: string;
  id: string;
}

export interface ConfSpaceResults extends Results<ConfSpaceResult> {}

export type SupportedScopedResponses =
  | ConfUrsPeopleResponse
  | ConfItemResponse
  | ConfSpaceResponse
  | ConfPeopleResponse;
