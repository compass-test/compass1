import {
  CompassComponentType,
  CompassLinkType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';

import { CriteriaFragment, ScorecardFragment } from '../../common/ui/types';

export const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
export const MOCK_SCORECARD_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const MOCK_CRITERIAS: CriteriaFragment[] = [
  {
    __typename: 'CompassHasDescriptionScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    scorecardCriteriaScore: {
      score: 1,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasOwnerScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasLinkScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    linkType: CompassLinkType.CHAT_CHANNEL,
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasLinkScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    linkType: CompassLinkType.DASHBOARD,
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasLinkScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    linkType: CompassLinkType.DOCUMENT,
    scorecardCriteriaScore: {
      score: 1,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasLinkScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    linkType: CompassLinkType.PROJECT,
    scorecardCriteriaScore: {
      score: 1,
      maxScore: 1,
    },
  },
  {
    __typename: 'CompassHasLinkScorecardCriteria',
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 10,
    linkType: CompassLinkType.REPOSITORY,
    scorecardCriteriaScore: {
      score: 1,
      maxScore: 1,
    },
  },
];

export const MOCK_SCORECARD: ScorecardFragment = {
  id: MOCK_SCORECARD_ID,
  name: 'Production readiness',
  description: 'Scorecard with all Complete criterias',
  componentType: CompassComponentType.SERVICE,
  importance: CompassScorecardImportance.REQUIRED,
  owner: {
    name: 'John Doe',
    picture: 'https://gravatar.com/avatar/john.doe.png',
  },
  scorecardScore: {
    totalScore: 4,
    maxTotalScore: 7,
  },
  criterias: MOCK_CRITERIAS,
};
