import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import {
  CompassScorecard,
  CompassScorecardAppliedToComponentsConnection,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import useGetScorecardAppliedToComponentsWithScores from './main';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

const MOCK_SCORECARD_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

describe('useGetScorecardAppliedToComponentsWithScores', () => {
  describe('mock data', () => {
    const mocks = {
      CompassScorecard: () => ({
        appliedToComponents: {
          __typename: 'CompassScorecardAppliedToComponentsConnection',
          nodes: [
            {
              __typename: 'CompassComponent',
              name: 'Scorecard score for testing appliedToComponents',
            },
          ],
        },
      }),
    };

    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider mocks={mocks}>
          {children}
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    it('should return appliedToComponents', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useGetScorecardAppliedToComponentsWithScores(MOCK_SCORECARD_ID),
        { wrapper },
      );

      const { loading } = result.current;
      expect(loading).toBe(true);

      await waitForNextUpdate();

      const { data } = result.current;

      const scorecard = data?.compass?.scorecard as CompassScorecard;
      expect(scorecard).toBeDefined();

      console.log(scorecard.appliedToComponents);

      const appliedToComponents = scorecard?.appliedToComponents as CompassScorecardAppliedToComponentsConnection;
      expect(appliedToComponents?.nodes?.length).toEqual(1);

      const component = appliedToComponents?.nodes?.[0];
      expect(component?.name).toEqual(
        'Scorecard score for testing appliedToComponents',
      );
    });
  });

  describe('should return an error', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider locale="en">
        <ApolloNetworkErrorProvider>{children}</ApolloNetworkErrorProvider>
      </CompassTestProvider>
    );

    it('should return an error', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useGetScorecardAppliedToComponentsWithScores(MOCK_SCORECARD_ID),
        { wrapper },
      );

      const { loading } = result.current;
      expect(loading).toBe(true);

      await waitForNextUpdate();

      const { error } = result.current;
      expect(error?.graphQLErrors?.length).toBeGreaterThan(0);
    });
  });
});
