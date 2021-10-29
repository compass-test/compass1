import { Plan } from '../types';

import { issueSources } from './issue-sources';
import { releases } from './releases';

export function buildPlan(payload?: Partial<Plan>): Plan {
  return Object.assign(
    {
      id: 0,
      name: '',
      permission: 'open',
      issueSources: [],
      excludeDays: 30,
      excludedVersions: releases.slice(0, 5).map(({ id }) => id),
    },
    payload,
  );
}

export const unpersistedPlan = buildPlan();

export const existingPlan: Plan = {
  id: 45,
  name: 'Demo plan',
  planningUnit: 'StoryPoints',
  issueSources: issueSources.slice(0, 2),
  permission: 'open',
  excludeDays: 20,
  excludedVersions: [],
  excludedStatuses: ['10002'],
  excludedIssueTypes: ['10004'],
  excludedStatusCategories: ['2'],
};

export const existingPlanBasicInfo = {
  id: 45,
  title: 'Demo plan',
  planningUnit: 'StoryPoints',
  issueSources: issueSources.slice(0, 2),
  excludedVersions: [],
  excludedStatuses: ['10002'],
  excludedIssueTypes: ['10004'],
  excludedStatusCategories: ['2'],
};

export const existingPlanExclusions = {
  excludedVersions: [],
  excludedStatuses: ['10002'],
  excludedIssueTypes: ['10004'],
  excludedStatusCategories: ['2'],
};
