import { ApolloError } from '@apollo/client';

import {
  CompassLinkType,
  GetComponentScorecardsWithScoresQuery,
} from '@atlassian/dragonfruit-graphql';

export const ComponentWithOneScorecardWithScoreMockData = (
  componentId: string,
) => {
  return {
    data: {
      compass: {
        component: {
          scorecards: [
            {
              name: `${componentId} Scorecard one`,
              scorecardScore: { maxTotalScore: 3, totalScore: 2 },
              criterias: [
                {
                  __typename: 'CompassHasDescriptionScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.CHAT_CHANNEL,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.REPOSITORY,
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
              ],
            },
          ],
        },
      },
    } as GetComponentScorecardsWithScoresQuery,
    error: undefined,
    loading: false,
  };
};

export const ComponentWithMultipleScorecardWithScoreMockData = (
  componentId: string,
) => {
  return {
    data: {
      compass: {
        component: {
          scorecards: [
            {
              name: `${componentId} Scorecard one`,
              scorecardScore: { maxTotalScore: 2, totalScore: 1 },
              criterias: [
                {
                  __typename: 'CompassHasOwnerScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.PROJECT,
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
              ],
            },
            {
              name: `${componentId} Scorecard two`,
              scorecardScore: { maxTotalScore: 4, totalScore: 4 },
              criterias: [
                {
                  __typename: 'CompassHasDescriptionScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasOwnerScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.PROJECT,
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.REPOSITORY,
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
              ],
            },
            {
              name: `${componentId} Scorecard three`,
              scorecardScore: { maxTotalScore: 7, totalScore: 2 },
              criterias: [
                {
                  __typename: 'CompassHasDescriptionScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasOwnerScorecardCriteria',
                  scorecardCriteriaScore: {
                    score: 1,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.CHAT_CHANNEL,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.DASHBOARD,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.DOCUMENT,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.PROJECT,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
                {
                  __typename: 'CompassHasLinkScorecardCriteria',
                  linkType: CompassLinkType.REPOSITORY,
                  scorecardCriteriaScore: {
                    score: 0,
                    maxScore: 1,
                  },
                },
              ],
            },
          ],
        },
      },
    } as GetComponentScorecardsWithScoresQuery,
    error: undefined,
    loading: false,
  };
};

export const ComponentWithErrorForScorecardWithScoreMockData = (
  componentId: string,
) => {
  return {
    data: undefined,
    error: new ApolloError({
      graphQLErrors: [],
    }),
    loading: false,
  };
};

export const ComponentWithNoScorecardsWithScoreMockData = (
  componentId: string,
) => {
  return {
    data: undefined,
    error: undefined,
    loading: false,
  };
};
