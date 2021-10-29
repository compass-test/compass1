import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { CriteriaFragment } from '../types';

export const mockCriterias: CriteriaFragment[] = [
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
