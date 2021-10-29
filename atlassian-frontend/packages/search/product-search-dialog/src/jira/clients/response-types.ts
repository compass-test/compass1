import { ScopedAggregatorResponse } from '../../common/clients';

/**
 * Instead of enum types for ResultType and ContentType we use a list of typed strings.
 * Typescript has issues when using types that require specific enum values (https://github.com/microsoft/TypeScript/issues/28102).
 *
 * There doesn't appear to be a working solution soon and as such we will manually type each value separately using strings.
 */

export enum Scope {
  JiraIssue = 'jira.issue',
  JiraPlan = 'jira.plan',
  JiraBoardProjectFilter = 'jira.board,project,filter',
  JiraBoardProjectFilterPlan = 'jira.board,project,filter,plan',
  JiraProject = 'jira.project',
  People = 'urs.user-jira',
}

/**
 * Identifier type used in `Result.contentType`.
 */
export enum ContentType {
  JiraIssue = 'jira-issue',
  JiraBoard = 'jira-board',
  JiraProject = 'jira-project',
  JiraFilter = 'jira-filter',
  JiraPlan = 'jira-plan',
  JiraPeople = 'jira-people',
}

type ContentTypeFromAttribute<T extends Attribute> = T extends AttributeIssue
  ? ContentType.JiraIssue
  : T extends AttributeProject
  ? ContentType.JiraProject
  : T extends AttributeBoard
  ? ContentType.JiraBoard
  : T extends AttributeFilter
  ? ContentType.JiraFilter
  : T extends AttributePlan
  ? ContentType.JiraPlan
  : T extends AttributePeople
  ? ContentType.JiraPeople
  : never;

// RESPONSES FOR ALL SCOPES
type Container = {
  title: string;
  id: string;
};

export type AvatarSingle = {
  url: string;
};
export type AvatarMultiple = {
  urls: {
    '16x16': string;
    '24x24': string;
    '32x32': string;
    '48x48': string;
  };
};
export type Avatar = AvatarSingle | AvatarMultiple;
export function isSingleAvatar(avatar: Avatar): avatar is AvatarSingle {
  return Object.prototype.hasOwnProperty.call(avatar, 'url');
}
export function isMultipleAvatar(avatar: Avatar): avatar is AvatarMultiple {
  return Object.prototype.hasOwnProperty.call(avatar, 'urls');
}

export enum AttributeType {
  issue = 'issue',
  board = 'board',
  project = 'project',
  filter = 'filter',
  plan = 'plan',
  people = 'people',
}

export interface AttributeIssue {
  '@type': AttributeType.issue;
  key: string;
  issueTypeId: string;
  issueTypeName: string;
  containerId: string;
  container?: Container;
  avatar: Avatar;
  updated: string | undefined;
  // used to indicate the result came from the recently viewed FE cache
  isRecentResult: boolean;
}

export interface AttributeBoard {
  '@type': AttributeType.board;
  containerId: string;
  container?: Container;
  containerName: string;
  avatar?: Avatar;
}

export interface AttributeProject {
  '@type': AttributeType.project;
  projectType: string;
  avatar: Avatar;
}

export interface AttributeFilter {
  '@type': AttributeType.filter;
  ownerId?: string;
  ownerName?: string;
}

export interface AttributePlan {
  '@type': AttributeType.plan;
}

export interface AttributePeople {
  '@type': AttributeType.people;
  avatarUrl: string;
  userId: string;
}

export type AttributeBoardProjectFilter =
  | AttributeBoard
  | AttributeProject
  | AttributeFilter;

export type AttributeBoardProjectFilterPlan =
  | AttributeBoard
  | AttributeProject
  | AttributeFilter
  | AttributePlan;

export type Attribute =
  | AttributeIssue
  | AttributeBoardProjectFilter
  | AttributeBoardProjectFilterPlan
  | AttributePeople;

export type AttributeFromScope<S extends Scope> = S extends Scope.JiraIssue
  ? AttributeIssue
  : S extends Scope.JiraPlan
  ? AttributePlan
  : S extends Scope.JiraProject
  ? AttributeProject
  : S extends Scope.JiraBoardProjectFilter
  ? AttributeBoardProjectFilter
  : S extends Scope.JiraBoardProjectFilterPlan
  ? AttributeBoardProjectFilterPlan
  : S extends Scope.People
  ? AttributePeople
  : never;

/**
 * The shape of the response from the XP search endpoint.
 */
export type ServerResponse<S extends Scope> = S extends
  | Scope.JiraIssue
  | Scope.JiraPlan
  | Scope.JiraBoardProjectFilter
  | Scope.JiraBoardProjectFilterPlan
  | Scope.JiraProject
  ? JiraScopeServerResponse<S>
  : S extends Scope.People
  ? UrsServerResponse
  : never;

interface JiraScopeServerResponse<
  S extends
    | Scope.JiraIssue
    | Scope.JiraPlan
    | Scope.JiraBoardProjectFilter
    | Scope.JiraBoardProjectFilterPlan
    | Scope.JiraProject
> extends ScopedAggregatorResponse<S> {
  results: {
    id: string;
    name: string;
    url: string;
    attributes: AttributeFromScope<S>;
  }[];
  size?: number;
}

export interface UrsServerResponse
  extends ScopedAggregatorResponse<Scope.People> {
  results: {
    avatarUrl: string;
    entityType: string;
    id: string;
    name: string;
    nickname?: string;
    absoluteUrl?: string;
  }[];
}

/**
 * A single transformed result from the XP search endpoint.
 */
export interface Result<T extends Attribute> {
  resultId: string;
  /**
   * Main text to show.
   */
  name: string;
  /**
   * Url to link the result to.
   */
  href: string;
  contentType: ContentTypeFromAttribute<T>;
  attributes: T;
  isCached: boolean;
}

/**
 * The shape of the transformed results from the XP search endpoint.
 * Each result is collated under the `items` property.
 */
export interface Results<T extends Scope> {
  items: Result<AttributeFromScope<T>>[];
  timings: number;
  totalSize: number;
}

export type SupportedResponseTypes = ServerResponse<Scope>;
