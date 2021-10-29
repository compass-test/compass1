import React from 'react';

import { render } from '@testing-library/react';

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
import { Product } from '../../../../types';
import { UsersTeamsPreFetchInternal } from '../../PreFetchData';
// TODO: https://softwareteams.atlassian.net/browse/COMPASS-135
describe.skip('PreFetchData', () => {
  const cloudId = 'test-cloud-id';
  const userId = 'test-user-id';
  const product = 'jira' as Product;
  const tenantUrl = '';
  let defaultProps: any;

  const delay = (timeout = 1) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  const renderComponent = (overrideProps = {}) => {
    const mockEvent: any = {
      context: [],
      update: jest.fn(() => mockEvent),
      fire: jest.fn(() => mockEvent),
      clone: jest.fn(() => mockEvent),
    };

    defaultProps = {
      createAnalyticsEvent: jest.fn().mockReturnValue(mockEvent),
      cloudId,
      userId,
      product,
      tenantUrl,
    };

    return render(
      <UsersTeamsPreFetchInternal {...defaultProps} {...overrideProps} />,
    );
  };

  beforeEach(() => {
    mockGetCollaborators(100);
    mockGetTeams(userId, cloudId, product, '', 100);
    jest.resetAllMocks();
    mapDataCache.clear();
  });

  afterEach(() => {
    resetFetchMock();
  });

  it('should trigger correct analytic events when mounting', () => {
    renderComponent();
    expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'triggered',
      actionSubject: 'preFetchData',
      eventType: 'track',
    });
  });

  it('should populate cache after rendering UsersTeamsPreFetch', async () => {
    expect(mapDataCache.get(USERS_CACHE_KEY)).toEqual(undefined);
    expect(mapDataCache.get(TEAMS_CACHE_KEY)).toEqual(undefined);

    renderComponent();
    // make sure all requests are done
    await delay(200);

    expect(mapDataCache.get(USERS_CACHE_KEY)).toBeDefined();
    expect(mapDataCache.get(TEAMS_CACHE_KEY)).toBeDefined();
  });
});
