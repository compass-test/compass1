import React from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { MockFeatureFlagClientProvider } from '@atlassian/dragonfruit-feature-flags';
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
      shouldPreFetch: false,
      ...getTestContextProps(jest),
    };

    return render(
      <IntlProvider messages={{}} locale="en">
        <MockFeatureFlagClientProvider>
          <PeopleMenu {...defaultProps} {...overrideProps} />
        </MockFeatureFlagClientProvider>
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
        const peopleButton = getByText('Teams');
        fireEvent.mouseEnter(peopleButton);
      });

      // await delay(5);
      wait(() => {
        expect(mapDataCache.get(USERS_CACHE_KEY)).toBeDefined();
        expect(mapDataCache.get(TEAMS_CACHE_KEY)).toBeDefined();
      });
    });
  });
});
