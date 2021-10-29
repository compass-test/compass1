import {
  CompassComponentType,
  CompassScorecardImportance,
} from '@atlassian/dragonfruit-graphql';

export const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const MOCKED_APPLICABLE_SCORECARDS_WITH_DATA = {
  CompassComponent: () => ({
    __typename: 'CompassComponent',
    id: MOCK_COMPONENT_ID,
    applicableScorecards: [
      {
        name: `Scorecard 1`,
        id: `id1`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.APPLICATION,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 2`,
        id: `id2`,
        description: `I am a description`,
        componentType: CompassComponentType.SERVICE,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 3`,
        id: `id3`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.LIBRARY,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 4`,
        id: `id4`,
        description: `I am a description`,
        componentType: CompassComponentType.OTHER,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 5`,
        id: `id5`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.APPLICATION,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 6`,
        id: `id6`,
        description: `I am a description`,
        componentType: CompassComponentType.LIBRARY,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 7`,
        id: `id7`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.SERVICE,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 8`,
        id: `id8`,
        description: `I am a description`,
        componentType: CompassComponentType.APPLICATION,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 9`,
        id: `id9`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.OTHER,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 10`,
        id: `id10`,
        description: `I am a description`,
        componentType: CompassComponentType.APPLICATION,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 11`,
        id: `id11`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.LIBRARY,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
      {
        name: `Scorecard 12`,
        id: `id12`,
        description: `I am a description`,
        componentType: CompassComponentType.APPLICATION,
        importance: CompassScorecardImportance.USER_DEFINED,
      },
      {
        name: `Scorecard 13`,
        id: `id13`,
        description: `This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description. This has a pretty long description.`,
        componentType: CompassComponentType.SERVICE,
        importance: CompassScorecardImportance.RECOMMENDED,
      },
    ],
  }),
};

export const MOCKED_APPLICABLE_SCORECARDS_EMPTY = {
  CompassComponent: () => ({
    __typename: 'CompassComponent',
    id: MOCK_COMPONENT_ID,
    applicableScorecards: [],
  }),
};
