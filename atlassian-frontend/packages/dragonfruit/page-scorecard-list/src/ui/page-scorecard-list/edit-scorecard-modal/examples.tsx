import React from 'react';

import { DiProvider, injectable } from 'react-magnetic-di';

import {
  CompassComponentType,
  CompassScorecardImportance,
  GetScorecardQuery,
} from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { useGetScorecard } from '@atlassian/dragonfruit-scorecards';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import EditScorecardModal from './main';
const scorecardData = {
  compass: {
    scorecard: {
      __typename: 'CompassScorecard',
      id: 'fake-id-1',
      name: 'Product happiness',
      description: 'A production happiness scorecard',
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
  },
} as GetScorecardQuery;

const useGetScorecardMock = ({ id }: { id: string | null | undefined }) => ({
  data: scorecardData,
  loading: false,
  error: undefined,
});

const useGetScorecardDI = injectable(useGetScorecard, useGetScorecardMock);

export const EditScorecardModalExample = () => (
  <DiProvider use={[useGetScorecardDI]}>
    <CompassTestProvider locale="en">
      <ApolloAutoMockProvider>
        <EditScorecardModal
          scorecardId="fake-scorecard-id"
          onCancel={() => {}}
          onSubmit={() => {}}
          testId="storybook-edit-scorecard-modal"
          isModalOpen={true}
        />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  </DiProvider>
);
