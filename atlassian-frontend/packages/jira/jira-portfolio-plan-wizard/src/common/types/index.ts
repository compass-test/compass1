export type { OptionType } from '@atlaskit/select';
export interface API {
  fetchPlanConfiguration: () => Promise<PlanConfiguration>;
  fetchIssueTypes: (issueTypeIds: IssueType['id'][]) => Promise<IssueTypeMap>;
  fetchStatusTypes: (
    issueStatusTypeIds: IssueStatusType['id'][],
  ) => Promise<IssueStatusTypeMap>;
  fetchBoards: (query: string) => Promise<Board[]>;
  fetchProjects: (query: string) => Promise<ProjectOption[]>;
  fetchProjectsAndReleasesByIssueSources: (
    issueSources: IssueSource[],
  ) => Promise<{ projects: Project[]; releases: Release[] }>;
  fetchFilters: (query: string) => Promise<Filter[]>;
  fetchCheckFiltersHasNextGen: (
    filterIds: Filter['id'][],
  ) => Promise<{ [filterId: string]: boolean }>;
  fetchIssueCount: (
    plan: Plan,
    fetchOptions: { signal: AbortController['signal'] },
  ) => Promise<IssueCount>;
  fetchRemovedIssues: (
    planId: PlanBasicInfo['id'],
    scenarioId: number,
    issueSources: IssueSource[],
  ) => Promise<Issue[]>;
  fetchHierarchyConfiguration: () => Promise<HierarchyConfiguration>;
  fetchPlanBasicInfo: (planId: PlanBasicInfo['id']) => Promise<PlanBasicInfo>;
  fetchPlanExclusions: (planId: PlanBasicInfo['id']) => Promise<PlanExclusions>;
  // Submit endpoints
  updatePlan: (plan: PlanUpdate) => Promise<Plan>;
  createPlan: (plan: Plan) => Promise<Plan>;
}

export type HierarchyConfiguration = {
  levels: { title: string; issueTypes: IssueType['id'][] }[];
};

export type Issue = {
  id: string;
  issueKey: number;
  issueSources: IssueSource['id'][];
  // Inexact type so that flow generation works properly in JFE, because they dont put ... automatically
  [key: string]: any;
  values: {
    type: number; // Seems like its meant to be IssueType['id'] (string), but its a number for some reason
    project: Project['id'];
    status?: string; // Seems like its meant to be IssueStatusType['id'] (number), but its a string for some reason
    summary: string;
    lexoRank: string;
    excluded?: boolean;
    parent?: Issue['id'];
    // Inexact type so that flow generation works properly in JFE, because they dont put ... automatically
    [key: string]: any;
  };
};

export type IssuesResponse = {
  issues: Issue[];
  dependencyIssues: Issue[];
  more: boolean;
};

export type IssueCount = { issueCount: number };

export type PlanConfiguration = {
  absoluteIssueLimit: number;
  defaultAbsoluteIssueLimit: number;
  defaultHierarchyIssueLimit: number;
  projectLimit: number;
  defaultProjectLimit: number;
};

export type SchedulingMode = 'SCRUM' | 'KANBAN' | 'AGILITY';

export type Board = {
  id: number;
  name: string;
  isUsingStoryPoints: boolean;
  hasNextGenProjects: boolean;
  schedulingMode?: SchedulingMode; // getAddSharedTeamWithIssueSource make this non-optional
};

export type Filter = {
  id: number;
  name: string;
  hasNextGenProjects: boolean;
};

export type IssueType = {
  level: number;
  levelTitle: string;
  id: string;
  name: string;
  iconUrl: string;
  subTask: false;
};

// Api shape we want to work with
export type IssueTypeMap = { [id: string]: IssueType };

export interface IssueStatusCategory {
  id: string;
  key: string;
  name: string;
  color: string;
}

export interface IssueStatusType {
  id: string;
  name: string;
  category: IssueStatusCategory;
}

export type IssueStatusTypeMap = { [status: string]: IssueStatusType };

export type IssueSource = {
  id: number;
  title?: string;
  type: 'Board' | 'Project' | 'Filter';
  value: string;
  sprintIds?: number[];
  planningUnitConversionFactor?: number;
  isUsingStoryPoints?: boolean;
  hasNextGenProjects?: boolean;
  team?: Team;
  isScrum?: boolean; // getAddSharedTeamWithIssueSource make this non-optional
};

export type PlanningUnit = 'StoryPoints' | 'Days' | 'Hours';

export type Team = {
  title: string;
  id: number;
  avatarUrl?: string;
  type: 'private' | 'shared' | 'twp';
};
export interface Plan {
  id: number | null;
  name: string;
  permission: 'private' | 'open';
  issueSources: IssueSource[];
  excludeDays: number;
  excludedIssueTypes?: IssueType['id'][];
  excludedStatuses?: IssueStatusType['id'][];
  excludedStatusCategories?: IssueStatusCategory['id'][];
  excludedVersions: Release['id'][];
  planningUnit?: PlanningUnit;
  teams?: Team[]; // getAddSharedTeamWithIssueSource make this non-optional
}

export type Project = {
  id: number;
  avatarUrl: string;
  key: string;
  name: string;
  issueTypeIds: IssueType['id'][];
  issueStatusIds: IssueStatusType['id'][];
};

// Dont use Pick<> because it doesnt auto convert to flow
export interface PlanBasicInfo {
  id: NonNullable<Plan['id']>;
  issueSources: Plan['issueSources'];
  excludedVersions: NonNullable<Plan['excludedVersions']>;
  excludedStatuses: NonNullable<Plan['excludedStatuses']>;
  excludedIssueTypes: NonNullable<Plan['excludedIssueTypes']>;
  excludedStatusCategories: NonNullable<Plan['excludedStatusCategories']>;
}

export interface PlanExclusions {
  excludedVersions: NonNullable<Plan['excludedVersions']>;
  excludedStatuses: NonNullable<Plan['excludedStatuses']>;
  excludedIssueTypes: NonNullable<Plan['excludedIssueTypes']>;
  excludedStatusCategories: NonNullable<Plan['excludedStatusCategories']>;
}

export type PlanUpdate = {
  id: Plan['id'];
  issueSources?: Plan['issueSources'];
  excludeDays?: Plan['excludeDays'];
  excludeIssueTypes?: Plan['excludedIssueTypes'];
  excludeStatusTypes?: Plan['excludedStatuses'];
  excludeStatusCategories?: Plan['excludedStatusCategories'];
  excludedVersions?: Plan['excludedVersions'];
  reincludeIssues?: Issue['id'][];
};

// Light version of project when using the /find endpoint
export type ProjectOption = {
  id: Project['id'];
  avatarUrl: Project['avatarUrl'];
  key: Project['key'];
  name: Project['name'];
  hasNextGenProjects: boolean;
};

export type Version = {
  id: string;
  name: string;
  projectId: number;
  released: boolean;
  archived?: boolean;
  startDate?: string;
  userStartDate?: string;
  userReleaseDate?: string;
};

export type CrossProjectVersion = {
  id: string;
  name: string;
  versions: Release['id'][];
};

// Alias
export type Release = Version;
export type CrossProjectRelease = CrossProjectVersion;

export enum ReleaseSelectionMode {
  EXCLUDE,
  REINCLUDE,
}

// Feature flags
export type GetFF = () => boolean;

export interface FeatureFlags {
  _getVrTest?: GetFF;
  getProjectTypeRebrand: GetFF;
  getPlanIsUsingStoryPoints: GetFF;
  getAddTeamWithIssueSource: GetFF;
  getNewPlanWizardIssueOverLimit: GetFF;
  getIssueSourceSettingsConfirmOnRemove: GetFF;
}
