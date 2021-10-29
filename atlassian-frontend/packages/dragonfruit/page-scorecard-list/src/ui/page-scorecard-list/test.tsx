import React from 'react';

import { ApolloError } from '@apollo/client';
import { render, RenderResult } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

import {
  CompassComponentType,
  CompassScorecardImportance,
  GetScorecardsQuery,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloLoadingProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import useGetScorecards from '../../services/get-scorecards';

import messages from './messages';

import ScorecardDashboard from './index';

describe('ScorecardDashboard', () => {
  let result: RenderResult;
  const testId = 'fake-test-id';

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
            criterias: [],
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
    refetch: jest.fn(),
  });

  const useGetScorecardsDI = injectable(useGetScorecards, useGetScorecardsMock);

  beforeEach(() => {
    result = render(
      <DiProvider use={[useGetScorecardsDI]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardDashboard testId={testId} />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );
  });

  it('should render the page content', () => {
    expect(result.getByTestId(testId)).toBeTruthy();
  });

  it('should render the create scorecard button', () => {
    expect(result.getByTestId(messages.createScorecard.id)).toBeInTheDocument();
  });
});

describe('ScorecardDashboard Error', () => {
  it('should render the error state when there is an error', () => {
    const useGetScorecardsMock = injectable(useGetScorecards, () => {
      throw new Error('Trigger Error Boundary');
    });

    const { queryByText } = render(
      <DiProvider use={[useGetScorecardsMock]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardDashboard />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    expect(
      queryByText("We couldn't load your scorecards."),
    ).toBeInTheDocument();
  });
});

describe('ScorecardDashboard empty state', () => {
  it('should trigger the empty state when there are no scorecards', () => {
    const noScorecardsData = {
      compass: {
        scorecards: {
          nodes: [],
          __typename: 'CompassScorecardConnection',
        },
      },
    } as GetScorecardsQuery;

    const useGetScorecardsMock = (cloudId: string) => ({
      data: noScorecardsData,
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    const useGetScorecardsDI = injectable(
      useGetScorecards,
      useGetScorecardsMock,
    );

    const result = render(
      <DiProvider use={[useGetScorecardsDI]}>
        <CompassTestProvider>
          <ApolloAutoMockProvider>
            <ScorecardDashboard />
          </ApolloAutoMockProvider>
        </CompassTestProvider>
        ,
      </DiProvider>,
    );

    expect(result.getByText('Get started with scorecards')).toBeInTheDocument();
  });
});

describe('ScorecardDashboardLoadingState', () => {
  it('should show a spinner', async () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <ApolloLoadingProvider>
          <ScorecardDashboard />
        </ApolloLoadingProvider>
      </CompassTestProvider>,
    );

    // Assert the spinner is displayed
    expect(
      getByTestId('dragonfruit-scorecard-templates.loading-spinner'),
    ).toBeInTheDocument();
  });
});

describe('ScorecardDashboard error state', () => {
  it('should display the retry button', async () => {
    const useGetScorecardsMock = (cloudId: string) => ({
      data: undefined,
      loading: false,
      error: new ApolloError({
        graphQLErrors: [],
      }),
      refetch: jest.fn(),
    });

    const useGetScorecardsDI = injectable(
      useGetScorecards,
      useGetScorecardsMock,
    );

    const result = render(
      <DiProvider use={[useGetScorecardsDI]}>
        <CompassTestProvider>
          <ApolloNetworkErrorProvider>
            <ScorecardDashboard />
          </ApolloNetworkErrorProvider>
        </CompassTestProvider>
      </DiProvider>,
    );

    const errorState = result.getByTestId(
      'dragonfruit-scorecard-templates.ui.content',
    );
    expect(errorState).toBeInTheDocument();

    expect(errorState.innerText).toContain("We couldn't load your scorecards");
    expect(errorState.innerText).toContain('Retry');
  });
});
