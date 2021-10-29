import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import {
  CompassScorecard,
  CompassScorecardCriteria,
  User,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import useGetComponentScorecardWithScoresById from './main';
import { MOCK_COMPONENT_ID, MOCK_SCORECARD_ID } from './mocks';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('useGetComponentScorecardWithScoresById', () => {
  describe('on success', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider>
        <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    it('should return mock data', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () =>
          useGetComponentScorecardWithScoresById(
            MOCK_COMPONENT_ID,
            MOCK_SCORECARD_ID,
          ),
        { wrapper },
      );

      const { loading } = result.current;
      expect(loading).toBe(true);

      await waitForNextUpdate();

      const { data } = result.current;

      const scorecard = data?.compass?.scorecard as CompassScorecard;
      const owner = scorecard?.owner as User;
      const criterias = scorecard?.criterias as Array<CompassScorecardCriteria>;

      expect(scorecard).toBeDefined();
      expect(owner).toBeDefined();
      expect(criterias?.length).toBeGreaterThan(0);
    });
  });

  describe('on error', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider>
        <ApolloNetworkErrorProvider>{children}</ApolloNetworkErrorProvider>
      </CompassTestProvider>
    );

    it('should return an error', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () =>
          useGetComponentScorecardWithScoresById(
            MOCK_COMPONENT_ID,
            MOCK_SCORECARD_ID,
          ),
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
