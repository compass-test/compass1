import React from 'react';

import { ApolloQueryResult } from '@apollo/client';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  CompassComponentType,
  CompassScorecardImportance,
  GetScorecardsQuery,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import useGetScorecards from '../src/services/get-scorecards';
import ScorecardDashboard from '../src/ui/page-scorecard-list';

const oneScorecardsData = {
  compass: {
    scorecards: {
      nodes: [
        {
          id: 'fake-id-1',
          name: 'Foo',
          description: 'fake description',
          importance: CompassScorecardImportance.USER_DEFINED,
          componentType: CompassComponentType.SERVICE,
          criterias: [
            {
              __typename: 'CompassHasDescriptionScorecardCriteria',
              id: 'criteria-1',
              weight: 100,
            },
          ],
        },
        {
          id: 'fake-id-2',
          name: 'Bar',
          description: 'Bar scorecard',
          importance: CompassScorecardImportance.RECOMMENDED,
          componentType: CompassComponentType.APPLICATION,
          criterias: [
            {
              __typename: 'CompassHasDescriptionScorecardCriteria',
              id: 'criteria-1',
              weight: 100,
            },
          ],
        },
      ],
      __typename: 'CompassScorecardConnection',
    },
  },
} as GetScorecardsQuery;

const useGetScorecardsMock = (cloudId: string) => ({
  data: oneScorecardsData,
  loading: false,
  error: undefined,
  refetch: (variables?: { cloudId: string }) =>
    new Promise<ApolloQueryResult<GetScorecardsQuery>>(() => {}),
});

const useGetScorecardsDI = injectable(useGetScorecards, useGetScorecardsMock);

export default function ScorecardDashboardExample() {
  return (
    <DiProvider use={[useGetScorecardsDI]}>
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <ScorecardDashboard testId={'dragonfruit-scorecard-templates'} />
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
}
