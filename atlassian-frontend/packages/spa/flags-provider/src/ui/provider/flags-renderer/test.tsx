import React from 'react';

import { act, render } from '@testing-library/react';
import noop from 'lodash/noop';

import { FlagsContextType } from '../../../controllers/flags';

import { FlagsRenderer } from './index';

jest.mock('react-transition-group/TransitionGroup', () =>
  jest.fn(({ children }) => children),
);

const defaultFlagApi = { showFlag: () => noop };

describe('flags-renderer', () => {
  let flagApi: FlagsContextType = defaultFlagApi;
  const subscribeFn = (fn: () => FlagsContextType): void => {
    flagApi = fn();
  };

  beforeEach(() => {
    flagApi = defaultFlagApi;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two flags', () => {
    const { queryAllByText } = render(
      <FlagsRenderer subscribe={subscribeFn} />,
    );
    act(() => {
      flagApi.showFlag({
        title: 'title1',
      });
      flagApi.showFlag({
        title: 'title2',
      });
    });
    expect(queryAllByText(/title/)).toHaveLength(2);
  });

  it('should dismiss the first flag', () => {
    const { getByText, queryAllByText } = render(
      <FlagsRenderer subscribe={subscribeFn} />,
    );
    act(() => {
      const dismissFlag = flagApi.showFlag({
        id: 'id1',
        title: 'title1',
      });
      flagApi.showFlag({
        id: 'id2',
        title: 'title2',
      });
      dismissFlag();
    });
    expect(queryAllByText(/title/)).toHaveLength(1);
    expect(getByText('title2')).toBeDefined();
  });

  it('should dismiss the second flag', () => {
    const { getByText, queryAllByText } = render(
      <FlagsRenderer subscribe={subscribeFn} />,
    );
    act(() => {
      flagApi.showFlag({
        title: 'title1',
      });
      const dismissFlag = flagApi.showFlag({
        title: 'title2',
      });
      dismissFlag();
    });
    expect(queryAllByText(/title/)).toHaveLength(1);
    expect(getByText('title1')).toBeDefined();
  });

  it('should not submit multiple flags if the id is a duplicate', () => {
    const { queryAllByText } = render(
      <FlagsRenderer subscribe={subscribeFn} />,
    );
    act(() => {
      flagApi.showFlag({
        id: 'duplicate-id',
        title: 'title1',
      });
      flagApi.showFlag({
        id: 'duplicate-id',
        title: 'title2',
      });
    });
    expect(queryAllByText(/title/)).toHaveLength(1);
  });
});
