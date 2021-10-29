import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH_QUERY_KEY, SEARCH_FILTERS_KEY } from '@atlassian/search-dialog';
import {
  UserInputContextProvider,
  UserInputContext,
} from '../user-input-context';

let mockSetQuery = jest.fn();
let query = 'test query';
let filters = {};
let mockSessionStorage = {
  getItem: jest.fn((key) => {
    if (key === SEARCH_QUERY_KEY) {
      return query;
    }
    if (key === SEARCH_FILTERS_KEY) {
      return JSON.stringify(filters);
    }
    return null;
  }),
  setItem: jest.fn((key, value) => {
    if (key === SEARCH_QUERY_KEY) {
      query = value;
    }
    if (key === SEARCH_FILTERS_KEY) {
      filters = value;
    }
  }),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

jest.mock('react', () =>
  Object.assign({}, jest.requireActual('react'), {
    useCallback: jest.fn().mockImplementation((fn) => fn),
    useState: jest.fn().mockImplementation((val) => {
      return [val, mockSetQuery];
    }),
    useRef: jest.fn().mockImplementation((val) => ({
      current: val,
    })),
    useEffect: jest.fn().mockImplementation((fn) => {
      fn();
    }),
  }),
);

describe('UserInputContextProvider', () => {
  it('should initialize with query stored in sessionStorage and update query sessionStorage', () => {
    const context = jest.fn();
    const wrapper = shallow(
      <UserInputContextProvider stickySearchEnabled={true}>
        <UserInputContext.Consumer>{context}</UserInputContext.Consumer>
      </UserInputContextProvider>,
    );
    wrapper.render();

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith(SEARCH_QUERY_KEY);
    expect(context.mock.calls[0][0].stickySearchEnabled).toBe(true);
    expect(context.mock.calls[0][0].query).toBe('test query');
    context.mock.calls[0][0].storeQuery('new query');
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      SEARCH_QUERY_KEY,
      'new query',
    );
  });

  it('should be able to get and set filters into sessionStorage', () => {
    const context = jest.fn();
    const wrapper = shallow(
      <UserInputContextProvider stickySearchEnabled={true}>
        <UserInputContext.Consumer>{context}</UserInputContext.Consumer>
      </UserInputContextProvider>,
    );
    wrapper.render();

    context.mock.calls[0][0].storeFilters('productId', { filters: 'testing' });
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      SEARCH_FILTERS_KEY,
      JSON.stringify({
        productId: {
          filters: 'testing',
        },
      }),
    );
    filters = { productId: { filters: 'tested' } };
    expect(context.mock.calls[0][0].readFilters('productId')).toMatchObject({
      filters: 'tested',
    });
  });

  it('should be able to reset the stored session data', () => {
    const context = jest.fn();
    const wrapper = shallow(
      <UserInputContextProvider stickySearchEnabled={true}>
        <UserInputContext.Consumer>{context}</UserInputContext.Consumer>
      </UserInputContextProvider>,
    );
    wrapper.render();

    context.mock.calls[0][0].resetSearchSession();
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
      SEARCH_QUERY_KEY,
    );
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
      SEARCH_FILTERS_KEY,
    );
  });
});
