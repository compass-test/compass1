export type OptionType<T> = { label: T; value: T };
export type ContainerUnit = 'project' | 'space' | 'plan';

export type PlansResult = {
  plans: AdvancedRoadmapsPlan[];
  totalNumberOfPlans: number;
};

export type AdvancedRoadmapsPlan = {
  id: number;
  name: string;
  link: string;
};

export type PlansQuery = {
  offset?: number;
  limit?: number;
  sortKey?: PlanQuerySortKey;
  sortOrder?: PlanQuerySortOrder;
};

export type PlanQuerySortKey = 'NAME';
export type PlanQuerySortOrder = 'ASC' | 'DESC';
