import { ValueType } from '@atlaskit/select';

// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ErrorWithStatusCode, TeamSelectOption } from '../types';

/**
 * This file contains the reducer that controls the state of the team select,
 * and the actions that can occur on it.
 */

type State = {
  value?: ValueType<TeamSelectOption>;
  isLoading: boolean;

  errorLoadingDefault?: ErrorWithStatusCode;
  errorLoadingOptions?: ErrorWithStatusCode;
};

type LoadDefaultOptionSuccess = {
  type: 'LOAD_DEFAULT_OPTION_SUCCESS';
  payload: ValueType<TeamSelectOption>;
};

type LoadDefaultOptionFailure = {
  type: 'LOAD_DEFAULT_OPTION_FAILURE';
  payload: ErrorWithStatusCode;
};

type LoadOptionsSuccess = {
  type: 'LOAD_OPTIONS_SUCCESS';
};

type LoadOptionsFailure = {
  type: 'LOAD_OPTIONS_FAILURE';
  payload: ErrorWithStatusCode;
};

type OnValueChange = {
  type: 'ON_VALUE_CHANGE';
  payload: ValueType<TeamSelectOption>;
};

type Actions =
  | LoadDefaultOptionSuccess
  | LoadDefaultOptionFailure
  | LoadOptionsSuccess
  | LoadOptionsFailure
  | OnValueChange;

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'LOAD_DEFAULT_OPTION_SUCCESS':
      return {
        ...state,
        isLoading: false,
        value: action.payload,
        errorLoadingDefault: undefined,
      };
    case 'LOAD_DEFAULT_OPTION_FAILURE':
      return {
        ...state,
        isLoading: false,
        value: undefined,
        errorLoadingDefault: action.payload,
      };
    case 'LOAD_OPTIONS_SUCCESS':
      return {
        ...state,
        // Clear the error, we don't need to handle values/state here
        errorLoadingOptions: undefined,
      };
    case 'LOAD_OPTIONS_FAILURE':
      return {
        ...state,
        errorLoadingOptions: action.payload,
      };
    case 'ON_VALUE_CHANGE':
      return {
        ...state,
        value: action.payload,
        // Clear the error, since the default is no longer selected
        errorLoadingDefault: undefined,
      };
  }

  throw new Error();
}
