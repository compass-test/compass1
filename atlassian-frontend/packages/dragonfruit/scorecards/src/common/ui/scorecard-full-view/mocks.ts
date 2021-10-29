import {
  CompassComponentType,
  CompassLinkType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';

import { ScorecardFragment } from '../types';

export const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const MOCK_COMPONENT_NAME = 'id-gatekeeper';

export const MOCK_SCORECARD_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const onClose = () => {};

export const mockScorecardWithAllCompleteCriterias: ScorecardFragment = {
  id: MOCK_SCORECARD_ID,
  name: 'Scorecard with all Complete criterias',
  description: 'Scorecard with all Complete criterias Description',
  componentType: CompassComponentType.SERVICE,
  importance: CompassScorecardImportance.REQUIRED,
  owner: {
    name: 'John Doe',
    picture: 'https://gravatar.com/avatar/john.doe.png',
  },
  scorecardScore: {
    totalScore: 100,
    maxTotalScore: 100,
  },
  criterias: [
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
        score: 15,
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
        score: 15,
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
        score: 15,
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
  ],
};

export const mockScorecardWithAllInCompleteCriterias: ScorecardFragment = {
  id: MOCK_SCORECARD_ID,
  name: 'Scorecard with all InComplete criterias',
  description: 'Scorecard with all InComplete criterias Description',
  componentType: CompassComponentType.APPLICATION,
  importance: CompassScorecardImportance.RECOMMENDED,
  owner: {
    name: 'John Doe',
    picture: 'https://gravatar.com/avatar/john.doe.png',
  },
  scorecardScore: {
    totalScore: 0,
    maxTotalScore: 100,
  },
  criterias: [
    {
      id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
      weight: 15,
      __typename: 'CompassHasDescriptionScorecardCriteria',
      scorecardCriteriaScore: {
        score: 0,
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
        score: 0,
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
        score: 0,
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
        score: 0,
        maxScore: 10,
      },
    },
  ],
};

export const mockScorecardWithMixedCriterias: ScorecardFragment = {
  id: MOCK_SCORECARD_ID,
  name: 'Scorecard with Mixed criterias (40 char)',
  description:
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live\n' +
    ' the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language \n' +
    ' ocean. A small river named Dudendrip flows by their place and supplies it with the necessary regelialia. (330 characters)',
  componentType: CompassComponentType.LIBRARY,
  importance: CompassScorecardImportance.USER_DEFINED,
  owner: {
    name: 'John Doe',
    picture: 'https://gravatar.com/avatar/john.doe.png',
  },
  scorecardScore: {
    totalScore: 55,
    maxTotalScore: 100,
  },
  criterias: [
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
  ],
};
