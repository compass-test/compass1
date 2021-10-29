import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom';

import { MutationError } from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { useErrors } from './index';

// ReactDom and react testing library don't always play nicely.
// https://stackoverflow.com/questions/61349196/errors-when-using-react-testing-library-and-renderhook-to-test-hooks-with-multip
// @ts-ignore: Type 'ReactNode' is not assignable to type 'ReactPortal'.
ReactDOM.createPortal = (node) => node;

describe('useErrors', () => {
  let wrapper: React.FC;

  beforeEach(() => {
    wrapper = ({ children }) => (
      <CompassTestProvider locale="en">{children}</CompassTestProvider>
    );
  });

  describe('handleIsInvalid', () => {
    it('returns true if an error message is present', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleIsInvalid } = result.current;

      expect(handleIsInvalid('Error message')).toEqual(true);
    });

    it('returns false if an error message is absent', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleIsInvalid } = result.current;

      expect(handleIsInvalid(undefined)).toEqual(false);
    });
  });

  describe('handleValidationState', () => {
    it('returns "error" if an error message is present', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleValidationState } = result.current;

      expect(handleValidationState('Error message')).toEqual('error');
    });

    it('returns "default" if an error message is absent', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleValidationState } = result.current;

      expect(handleValidationState(undefined)).toEqual('default');
    });
  });

  describe('handleFormErrors', () => {
    it('returns undefined when the argument is undefined', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleFormErrors } = result.current;

      const mutationErrors = undefined;
      expect(handleFormErrors(mutationErrors)).toEqual(undefined);
    });

    it('returns undefined when no mutation errors are present in the argument', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleFormErrors } = result.current;

      const mutationErrors = [] as MutationError[];
      expect(handleFormErrors(mutationErrors)).toEqual(undefined);
    });

    it('returns FormErrors populated with the correct error for each MutationError', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleFormErrors } = result.current;

      const mutationErrors = [
        { extensions: { errorType: 'SCORECARD_NAME_BLANK' } },
        { extensions: { errorType: 'SCORECARD_DESCRIPTION_BLANK' } },
        {
          extensions: {
            errorType: 'SCORECARD_REQUIRED_IMPORTANCE_MUST_HAVE_ADMIN_PERM',
          },
        },
      ];

      const formErrors = {
        name: 'SCORECARD_NAME_BLANK',
        description: 'SCORECARD_DESCRIPTION_BLANK',
        owner: 'SCORECARD_REQUIRED_IMPORTANCE_MUST_HAVE_ADMIN_PERM',
      };

      expect(handleFormErrors(mutationErrors)).toEqual(formErrors);
    });
  });

  describe('handleBaseError', () => {
    it('returns the base error value from the provided getState function', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleBaseError } = result.current;

      const getState = () => {
        return {
          submitErrors: {
            base: 'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID',
          },
        };
      };

      expect(handleBaseError(getState)).toEqual(
        'SCORECARD_CRITERIA_WEIGHT_TOTAL_INVALID',
      );
    });

    it('returns undefined when provided getState function returns undefined', () => {
      const { result } = renderHook(() => useErrors(), { wrapper });
      const { handleBaseError } = result.current;

      const getState = () => undefined;

      expect(handleBaseError(getState)).toEqual(undefined);
    });
  });
});
