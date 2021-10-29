import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { MOCK_COMPONENT_ID } from './mocks';

import { useGetComponentApplicableScorecards } from './index';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('useGetComponentApplicableScorecards', () => {
  describe('mock data', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    it('should return mock data', async () => {
      const { result } = renderHook(
        () => useGetComponentApplicableScorecards(MOCK_COMPONENT_ID),
        { wrapper },
      );

      const applicableScorecards = await result.current.search('temp');

      expect(applicableScorecards).toBeDefined();
      expect(applicableScorecards?.length).toBeGreaterThan(0);
    });
  });
});
