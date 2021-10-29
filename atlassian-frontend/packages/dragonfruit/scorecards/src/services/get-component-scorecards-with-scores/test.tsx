import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import useGetComponentScorecardsWithScores from './main';
import { MOCK_COMPONENT_ID } from './mocks';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('useGetComponentScorecardsWithScores', () => {
  describe('mock data', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    it('should return mock data', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useGetComponentScorecardsWithScores(MOCK_COMPONENT_ID),
        { wrapper },
      );

      const { loading } = result.current;
      expect(loading).toBe(true);

      await waitForNextUpdate();

      const { data } = result.current;

      const component = data?.compass?.component as CompassComponent;
      const scorecards = component?.scorecards;

      expect(scorecards).toBeDefined();
      expect(scorecards?.length).toBeGreaterThan(0);
    });
  });

  describe('error', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider locale="en">
        <ApolloNetworkErrorProvider>{children}</ApolloNetworkErrorProvider>
      </CompassTestProvider>
    );

    it('should return an error', async () => {
      const { result, waitForNextUpdate } = renderHook(
        () => useGetComponentScorecardsWithScores(MOCK_COMPONENT_ID),
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
