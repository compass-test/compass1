import { CompassLinkType } from '@atlassian/dragonfruit-graphql';

import { CriteriaFragment } from '../types';

export const mockCriterias: CriteriaFragment[] = [
  {
    id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
    weight: 15,
    __typename: 'CompassHasDescriptionScorecardCriteria',
    scorecardCriteriaScore: {
      score: 15,
      maxScore: 15,
    },
  },
  {
    id: '3c285ada-6ad0-407b-ac23-dcdf7bad4d93',
    weight: 15,
    __typename: 'CompassHasOwnerScorecardCriteria',
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 15,
    },
  },
  {
    id: 'bf739c19-20a5-4051-abd6-efafd6a07cc0',
    weight: 15,
    __typename: 'CompassHasLinkScorecardCriteria',
    linkType: CompassLinkType.CHAT_CHANNEL,
    scorecardCriteriaScore: {
      score: 15,
      maxScore: 15,
    },
  },
  {
    id: '69c1641d-5b9b-4307-97be-0332c7a7e9ab',
    weight: 15,
    __typename: 'CompassHasLinkScorecardCriteria',
    linkType: CompassLinkType.DASHBOARD,
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 15,
    },
  },
  {
    id: 'c0872b4f-b429-4106-a976-e27c5057ed84',
    weight: 15,
    __typename: 'CompassHasLinkScorecardCriteria',
    linkType: CompassLinkType.DOCUMENT,
    scorecardCriteriaScore: {
      score: 15,
      maxScore: 15,
    },
  },
  {
    id: 'ea66b4a2-921f-4b96-85ff-e3a5b8e905bf',
    weight: 15,
    __typename: 'CompassHasLinkScorecardCriteria',
    linkType: CompassLinkType.PROJECT,
    scorecardCriteriaScore: {
      score: 0,
      maxScore: 15,
    },
  },
  {
    id: '4774df45-21e2-456c-901d-30219ba095de',
    weight: 10,
    __typename: 'CompassHasLinkScorecardCriteria',
    linkType: CompassLinkType.REPOSITORY,
    scorecardCriteriaScore: {
      score: 10,
      maxScore: 10,
    },
  },
];
