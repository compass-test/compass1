import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  MOCK_CLOUD_ID,
} from '@atlassian/dragonfruit-testing';

import { mockCreateFormData } from './mocks';

import { useCreateScorecardController } from './index';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;
describe('useCreateUpdateScorecardController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mutations', () => {
    const wrapper: React.FC = ({ children }) => (
      <CompassTestProvider>
        <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
      </CompassTestProvider>
    );

    describe('createScorecard', () => {
      it('should add a new scorecard', () => {
        let createMutationCalled = false;
        const mutationResult = () => (createMutationCalled = true);
        const { result } = renderHook(() => useCreateScorecardController(), {
          wrapper,
        });
        const spy = jest
          .spyOn(result.current[0], 'createScorecard')
          .mockImplementation(mutationResult);
        const [{ createScorecard }] = result.current;
        act(() => {
          createScorecard(mockCreateFormData, MOCK_CLOUD_ID);
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(createMutationCalled).toBe(true);
      });
    });
  });
});
