export const MOCK_SCORECARD_APPLIEDTO_COMPONENTS_FIRST_PAGE = {
  CompassScorecardScore: () => ({
    __typename: 'CompassScorecardScore',
    totalScore: 90,
    maxTotalScore: 100,
  }),
  CompassScorecard: () => ({
    appliedToComponents: {
      __typename: 'CompassScorecardAppliedToComponentsConnection',
      nodes: [
        {
          __typename: 'CompassComponent',
          id: 'fake-component-foo',
          name: 'Foo - Scorecard',
          description: 'I am a Foo component',
          ownerId: null,
        },
        {
          __typename: 'CompassComponent',
          id: 'fake-component-bar',
          name: 'Bar - Scorecard',
          description: 'I am a Bar component',
          ownerId: null,
        },
      ],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
        endCursor: 'fake-cursor',
        startCursor: null,
      },
    },
  }),
};

export const MOCK_SCORECARD_APPLIEDTO_COMPONENTS_LAST_PAGE = {
  CompassScorecardScore: () => ({
    __typename: 'CompassScorecardScore',
    totalScore: 90,
    maxTotalScore: 100,
  }),
  CompassScorecard: () => ({
    appliedToComponents: {
      __typename: 'CompassScorecardAppliedToComponentsConnection',
      nodes: [
        {
          __typename: 'CompassComponent',
          id: 'fake-component-foo',
          name: 'Foo - Scorecard',
          description: 'I am a Foo component',
          ownerId: null,
        },
        {
          __typename: 'CompassComponent',
          id: 'fake-component-bar',
          name: 'Bar - Scorecard',
          description: 'I am a Bar component',
          ownerId: null,
        },
      ],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: true,
        endCursor: null,
        startCursor: 'fake-cursor',
      },
    },
  }),
};
