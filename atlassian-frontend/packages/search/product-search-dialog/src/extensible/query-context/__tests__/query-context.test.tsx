import React from 'react';
import { shallow } from 'enzyme';
import { QueryContextProvider } from '../query-context';
import { InputSkeletonState } from '@atlassian/search-dialog';

let mockSetAdditionalAnalyticsContext = jest.fn();
let mockAddAnalyticContext = jest.fn();
let mockNonPrivacySafeContext = jest.fn();
let mockSetQuery = jest.fn();

declare global {
  interface Window {
    inputSkeletonState?: InputSkeletonState;
  }
}

jest.mock('react', () =>
  Object.assign({}, jest.requireActual('react'), {
    useEffect: jest.fn().mockImplementation((fn) => fn()),

    useState: jest.fn().mockImplementation((val) => {
      return [val, mockSetQuery];
    }),
  }),
);

jest.mock('../../../common/analytics', () =>
  Object.assign(
    {},

    {
      AnalyticsContextAction: {},
      SearchDialogAnalyticsContext: () => <div> </div>,
      useAnalyticsContext: () => ({
        isLoading: false,
        setAdditionalAnalyticsContext: mockSetAdditionalAnalyticsContext,
        addAnalyticContext: mockAddAnalyticContext,
        nonPrivacySafeContext: mockNonPrivacySafeContext,
        queryVersion: 0,
      }),
    },
  ),
);

jest.mock('../../dialog-expansion-context', () =>
  Object.assign(
    {},
    {
      useDialogExpansionContext: () => ({
        isExpanded: false,
      }),
    },
  ),
);

jest.mock('../../user-input-provider', () =>
  Object.assign(
    {},
    {
      useSessionUserInput: () => ({
        withStickySearchSession: false,
        query: '',
        storeQuery: () => {},
      }),
    },
  ),
);

describe('QueryContextProvider', () => {
  beforeEach(() => {
    mockSetAdditionalAnalyticsContext.mockReset();
    mockAddAnalyticContext.mockReset();
    mockNonPrivacySafeContext.mockReset();
  });

  it('should reset query and analytics when dialog is closed.', () => {
    const wrapper = shallow(
      <QueryContextProvider>
        <div></div>
      </QueryContextProvider>,
    );

    wrapper.render();

    expect(mockSetAdditionalAnalyticsContext).toBeCalledWith({ type: 'reset' });
    expect(mockSetQuery).toBeCalledWith('');
  });

  it('should not reset analytics if getInputSkeletonFocus is truthy', () => {
    window.inputSkeletonState = {
      query: '',
      placeholder: '',
      isFocused: true,
      selectionStart: 0,
      selectionEnd: 0,
      selectionDirection: 'none',
      listeners: [],
    };
    const wrapper = shallow(
      <QueryContextProvider>
        <div></div>
      </QueryContextProvider>,
    );

    wrapper.render();

    expect(mockSetAdditionalAnalyticsContext).not.toBeCalled();
  });
});
