import React from 'react';

import { render, RenderResult } from '@testing-library/react';
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

describe('EditScorecardModal', () => {
  let result: RenderResult;

  const nameFieldTestId = 'form-test-edit-scorecard-name-field';
  const descriptionFieldTestId = 'form-test-edit-scorecard-description-field';

  const scorecardData = {
    compass: {
      scorecard: {
        __typename: 'CompassScorecard',
        id: 'fake-id-1',
        name: 'Product happiness',
        description: 'A production happiness scorecard',
        importance: CompassScorecardImportance.USER_DEFINED,
        componentType: CompassComponentType.SERVICE,
        criterias: [],
      },
    },
  } as GetScorecardQuery;

  const useGetScorecardMock = ({ id }: { id: string | null | undefined }) => ({
    data: scorecardData,
    loading: false,
    error: undefined,
  });

  const useGetScorecardDI = injectable(useGetScorecard, useGetScorecardMock);

  beforeEach(() => {
    result = render(
      <DiProvider use={[useGetScorecardDI]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <EditScorecardModal
              scorecardId="abc"
              onCancel={() => {}}
              onSubmit={() => {}}
              testId="form-test"
              isModalOpen={true}
            />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
      </DiProvider>,
    );
  });

  it('should render the name editor with the scorecard name', async () => {
    const nameField = await result.findByTestId(nameFieldTestId);

    expect(nameField).toBeInTheDocument();
    expect(nameField?.getAttribute('value')).toEqual('Product happiness');
  });

  it('should render the description editor with the scorecard description', async () => {
    const descriptionField = await result.findByTestId(descriptionFieldTestId);

    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField!.innerText).toEqual(
      'A production happiness scorecard',
    );
  });
});
