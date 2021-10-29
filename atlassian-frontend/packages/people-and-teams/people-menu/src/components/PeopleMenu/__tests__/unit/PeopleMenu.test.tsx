import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import {
  mockGetCollaborators,
  mockGetTeams,
  resetFetchMock,
} from '@atlassian/ptc-test-utils';

import {
  mapDataCache,
  TEAMS_CACHE_KEY,
  USERS_CACHE_KEY,
} from '../../../../hooks/useUsersTeamsData';
import { getTestContextProps } from '../../../../utils/test-helper';
import PeopleMenu from '../../PeopleMenu';

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

describe('PeopleMenu', () => {
  const defaultContextProps = getTestContextProps(jest);

  let defaultProps: any;

  const renderComponent = (overrideProps = {}) => {
    defaultProps = {
      // turn off request cache timeout in testing
      requestCacheTimeout: 0,
      ...getTestContextProps(jest),
    };

    return render(
      <IntlProvider messages={{}} locale="en">
        <PeopleMenu {...defaultProps} {...overrideProps} />
      </IntlProvider>,
    );
  };

  afterEach(() => {
    jest.resetAllMocks();
    resetFetchMock();
    mapDataCache.clear();
  });

  describe('Pre-fetching data', () => {
    beforeEach(() => {
      mockGetCollaborators(1);
      mockGetTeams(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
        '',
        1,
      );
    });

    it('should prefetch data when hovering', async () => {
      const { getByText } = renderComponent();

      expect(mapDataCache.get(USERS_CACHE_KEY)).toEqual(undefined);
      expect(mapDataCache.get(TEAMS_CACHE_KEY)).toEqual(undefined);

      // trigger by hovering
      act(() => {
        const peopleButton = getByText('People');
        fireEvent.mouseEnter(peopleButton);
      });

      wait(() => {
        expect(mapDataCache.get(USERS_CACHE_KEY)).toBeDefined();
        expect(mapDataCache.get(TEAMS_CACHE_KEY)).toBeDefined();
      });
    });
  });

  describe('Server side rendering', () => {
    it('should render a placeholder menu item when isSSR', () => {
      const { getByTestId, queryByTestId } = renderComponent({ isSSR: true });
      expect(
        getByTestId('test-id-people-primary-button-ssr'),
      ).toBeInTheDocument();
      expect(
        queryByTestId('test-id-people-primary-button'),
      ).not.toBeInTheDocument();
    });

    it('should render normally by default (isSSR is false)', () => {
      const { getByTestId, queryByTestId } = renderComponent();
      expect(
        queryByTestId('test-id-people-primary-button-ssr'),
      ).not.toBeInTheDocument();
      expect(getByTestId('test-id-people-primary-button')).toBeInTheDocument();
    });
  });
});
