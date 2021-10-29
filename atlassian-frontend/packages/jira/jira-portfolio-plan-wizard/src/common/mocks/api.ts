import cloneDeep from 'lodash/fp/cloneDeep';
import isEqual from 'lodash/fp/isEqual';

import { API, Filter, IssueSource, IssueType, Plan } from '../types';

import { boards } from './boards';
import { filters } from './filters';
import {
  hierarchyConfiguration,
  issues,
  issueStatusMap,
  issueTypeMap,
} from './issues';
import { existingPlanBasicInfo, existingPlanExclusions } from './plan';
import { projectOptions, projects } from './projects';
import { releases } from './releases';

export const PROJECT_LIMIT = 3;

export const responseAfter = (delayInMs: number = 0) => <T>(
  result: T,
): Promise<T> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(cloneDeep(result)), delayInMs),
  );
};

const rejectAfter = (delayInMs: number) => <T>(error: T): Promise<T> => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(cloneDeep(error)), delayInMs),
  );
};

export function buildAPI(specs?: Partial<API>, delayInMs: number = 0): API {
  return Object.assign(
    {
      fetchPlanConfiguration: () =>
        responseAfter(delayInMs)({
          absoluteIssueLimit: 3000,
          projectLimit: PROJECT_LIMIT,
          defaultAbsoluteIssueLimit: 5000,
          defaultHierarchyIssueLimit: 2000,
          defaultProjectLimit: 100,
        }),
      fetchIssueTypes: (issueTypeIds: IssueType['id'][]) => {
        // The "*Lazy" boards will only have 1 issue type "Improvement", others will have the others
        const { '10100': improvement, ...rest } = issueTypeMap;
        const result = isEqual(['10001'], issueTypeIds)
          ? { '10100': improvement }
          : rest;
        if (issueTypeIds.includes('10001')) {
          result['10100'] = improvement;
        }
        return responseAfter(delayInMs)(result);
      },
      fetchStatusTypes: () => responseAfter(delayInMs)(issueStatusMap),
      fetchBoards: () => responseAfter(delayInMs)(boards),
      fetchFilters: () => responseAfter(delayInMs)(filters),
      fetchCheckFiltersHasNextGen: (filterIds: Filter['id'][]) =>
        responseAfter(delayInMs)(
          filterIds.reduce((result, id) => {
            return { ...result, [id]: id === 8 };
          }, {}),
        ),
      fetchProjects: () => responseAfter(delayInMs)(projectOptions),
      fetchProjectsAndReleasesByIssueSources: (issueSources: IssueSource[]) => {
        if (issueSources.length > PROJECT_LIMIT) {
          return rejectAfter(delayInMs)(new Error());
        }

        return responseAfter(delayInMs)({
          projects: projects.slice(0, issueSources.length),
          releases,
        });
      },
      fetchIssueCount: (plan: Plan) =>
        responseAfter(delayInMs)({
          issueCount:
            plan.issueSources.length * 2000 - plan.excludedVersions.length * 50,
        }),
      fetchRemovedIssues: () => responseAfter(delayInMs)(issues),
      fetchHierarchyConfiguration: () =>
        responseAfter(delayInMs)(hierarchyConfiguration),
      fetchPlanBasicInfo: () => responseAfter(delayInMs)(existingPlanBasicInfo),
      fetchPlanExclusions: () =>
        responseAfter(delayInMs)(existingPlanExclusions),
      updatePlan: (plan: Plan) => responseAfter(delayInMs)(plan),
      createPlan: (plan: Plan) => responseAfter(delayInMs)({ ...plan, id: 1 }),
    },
    specs,
  );
}

export const api = buildAPI();
