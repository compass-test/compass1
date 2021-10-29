import React from 'react';

import { render, waitForElement } from '@testing-library/react';
import fetchMock from 'fetch-mock/cjs/client';
import { IntlProvider } from 'react-intl';

import { MockFeatureFlagClientProvider } from '@atlassian/dragonfruit-feature-flags';
import {
  mockGetCollaborators,
  resetFetchMock,
  testMyTeamsData,
} from '@atlassian/ptc-test-utils';

import { PeopleMenuContext } from '../../../../context/PeopleMenuContext';
import { mapDataCache } from '../../../../hooks/useUsersTeamsData';
import { getTestContextProps } from '../../../../utils/test-helper';
import { MenuContentInternal } from '../../MenuContent';

export const STARGATE_ENDPOINT_TEAMS_V3 = '/gateway/api/v3/teams';
export const STARGATE_ENDPOINT_TEAMS_OF_V3 = `${STARGATE_ENDPOINT_TEAMS_V3}/of-user`;
export const STARGATE_ENDPOINT_TEAMS = '/gateway/api/teams';
export const STARGATE_ENDPOINT_TEAMS_OF = `${STARGATE_ENDPOINT_TEAMS}/v2/of-user`;

const LIMIT_RESULTS = 5;

// Recreating this ourselves instead of using "mockGetTeams" to add organizationId query parameter
const buildTeamsOfUrl = (
  userId: string,
  cloudId: string,
  product: string,
  tenantUrl: string = '',
  orgId?: string,
) => {
  const params = [
    `limit=${LIMIT_RESULTS}`,
    'cursor=',
    `origin.cloudId=${cloudId}`,
    `origin.product=${product.toUpperCase()}`,
    `organizationId=${orgId}`,
  ];

  const isUseLegionV3 = !!orgId;

  return `${tenantUrl}${
    isUseLegionV3 ? STARGATE_ENDPOINT_TEAMS_OF_V3 : STARGATE_ENDPOINT_TEAMS_OF
  }/${userId}?&${params.join('&')}`;
};

const mockEvent: any = {
  context: [],
  update: jest.fn(() => mockEvent),
  fire: jest.fn(() => mockEvent),
  clone: jest.fn(() => mockEvent),
};

describe('MenuContent', () => {
  const defaultContextProps = getTestContextProps(jest);
  const delay = (timeout = 1) =>
    new Promise((resolve) => setTimeout(resolve, timeout));
  let defaultProps: any;

  const renderComponent = (overrideProps = {}, overrideDefaultProps = {}) => {
    defaultProps = {
      createAnalyticsEvent: jest.fn(() => mockEvent),
      // turn off request cache timeout in testing
      requestCacheTimeout: 0,
      hasPermission: true,
      isLoadingPermission: false,
    };

    const contextValues = {
      ...defaultContextProps,
      ...overrideProps,
    };
    return render(
      <PeopleMenuContext.Provider value={contextValues}>
        <IntlProvider messages={{}} locale="en">
          <MockFeatureFlagClientProvider>
            <MenuContentInternal {...defaultProps} {...overrideDefaultProps} />
          </MockFeatureFlagClientProvider>
        </IntlProvider>
      </PeopleMenuContext.Provider>,
    );
  };

  const waitForFinishLoadingData = async (getByTestId: any) => {
    await waitForElement(() => getByTestId('test-id-group-loaded'));
  };

  afterEach(async () => {
    jest.resetAllMocks();
    resetFetchMock();
    mapDataCache.clear();
    // make sure no ongoing requests
    await delay(100);
  });

  describe('loading people and teams succeeds', () => {
    beforeEach(() => {
      mockGetCollaborators();
      const url = buildTeamsOfUrl(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
        undefined,
        defaultContextProps.orgId,
      );

      fetchMock.get(url, testMyTeamsData, {
        delay: 500,
      });
    });

    it('should render spinner when loading data', async () => {
      const { queryAllByTestId } = renderComponent();
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
    });

    it('should not render spinner when loading data and cached data exists', async () => {
      const {
        getByTestId,
        queryAllByTestId,
        getByText,
        unmount,
      } = renderComponent();

      // has spinner when loading and cached data does not exist
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
      await waitForFinishLoadingData(getByTestId);
      expect(getByText('Your Teams')).toBeInTheDocument();

      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(getByText('Your Collaborators')).toBeInTheDocument();

      unmount();

      // re-rendering
      // does not spinner when loading and cached data exists
      const {
        queryAllByTestId: queryAllByTestId2,
        getByText: getByText2,
      } = renderComponent();
      expect(queryAllByTestId2('people-menu-skeleton-item')).toHaveLength(0);
      expect(getByText2('Your Teams')).toBeInTheDocument();

      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(getByText2('Your Collaborators')).toBeInTheDocument();
    });

    it('should render people and teams groups', async () => {
      // setup and act
      const { getByTestId, getAllByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);

      //assert
      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(getByTestId('test-id-people-section')).toBeInTheDocument();
      // expect(getAllByTestId('test-id-people-item')).toBeTruthy();

      expect(getByTestId('test-id-teams-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-team-item')).toBeTruthy();
    });

    it('should trigger analytics events for success cases', async () => {
      // setup and act
      const { getByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'peopleMenuLink',
        action: 'succeeded',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'teamMenuLink',
        action: 'succeeded',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'screen',
        name: 'peopleMenu',
        attributes: {
          isCacheEmpty: true,
        },
      });
    });
  });

  describe.skip('loading people succeeds but loading teams fails', () => {
    beforeEach(() => {
      mockGetCollaborators();
    });

    it('should render spinner when loading data', async () => {
      const { queryAllByTestId } = renderComponent();
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
    });

    it('should render people group and teams group', async () => {
      // setup and act
      const { getByTestId, queryByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(getByTestId('test-id-people-section')).toBeInTheDocument();
      // render team group with create team menu item only
      expect(getByTestId('test-id-teams-section')).toBeInTheDocument();
      expect(queryByTestId('test-id-team-item')).toBeNull();
    });

    it('should trigger analytics events for succeeded and failed cases', async () => {
      // setup and act
      const { getByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'peopleMenuLink',
        action: 'succeeded',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'teamMenuLink',
        action: 'failed',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'screen',
        name: 'peopleMenu',
        attributes: {
          isCacheEmpty: true,
        },
      });
    });
  });

  describe('loading teams succeeds but loading people fails', () => {
    beforeEach(() => {
      const url = buildTeamsOfUrl(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
        undefined,
        defaultContextProps.orgId,
      );

      fetchMock.get(url, testMyTeamsData, {
        delay: 500,
      });
    });

    it('should render spinner when loading data', async () => {
      const { queryAllByTestId } = renderComponent();
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
    });

    it('should render teams group and not render people group', async () => {
      // setup and act
      const { getByTestId, getAllByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(queryByTestId('test-id-people-section')).toBeNull();
      expect(getByTestId('test-id-teams-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-team-item')).toBeTruthy();
    });

    it('should trigger analytics events for succeeded and failed cases', async () => {
      // setup and act
      const { getByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'peopleMenuLink',
        action: 'failed',
        attributes: {
          status: undefined,
        },
      });

      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'teamMenuLink',
        action: 'succeeded',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'screen',
        name: 'peopleMenu',
        attributes: {
          isCacheEmpty: true,
        },
      });
    });
  });

  describe('loading teams and teams fails', () => {
    it('should render spinner when loading data', async () => {
      const { queryAllByTestId } = renderComponent();
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
    });

    it('should trigger analytics events for failed cases', async () => {
      // setup and act
      resetFetchMock();
      mapDataCache.clear();
      const { getByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'peopleMenuLink',
        action: 'failed',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'teamMenuLink',
        action: 'failed',
        attributes: {
          status: undefined,
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'peopleMenu',
        action: 'failed',
      });
    });
  });

  describe('no browse user permissions', () => {
    beforeEach(() => {
      mockGetCollaborators();
      const url = buildTeamsOfUrl(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
        undefined,
        defaultContextProps.orgId,
      );

      fetchMock.get(url, testMyTeamsData, {
        delay: 500,
      });
    });

    it('should render "View your profile" link with no people permission', async () => {
      const { getByTestId } = renderComponent(undefined, {
        hasPermission: false,
        isLoadingPermission: false,
      });

      await waitForElement(() => getByTestId('test-id-view-your-profile'));
      expect(getByTestId('test-id-view-your-profile')).toBeInTheDocument();
    });

    it('should render regular content with people permission enabled', async () => {
      const { queryAllByTestId, getAllByTestId, getByTestId } = renderComponent(
        undefined,
        {
          hasPermission: true,
          isLoadingPermission: false,
        },
      );

      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);

      await waitForFinishLoadingData(getByTestId);

      // Test disabled as part of SH-595 - enable when we have collaborators again
      // expect(getByTestId('test-id-people-section')).toBeInTheDocument();
      // expect(getAllByTestId('test-id-people-item')).toBeTruthy();

      expect(getByTestId('test-id-teams-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-team-item')).toBeTruthy();
    });
  });

  describe('add people feature', () => {
    it('should NOT render "Add people" link if enableInvite prop is not sent', async () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId('test-id-invite-people')).not.toBeInTheDocument();
    });
    it('should render "Add people" link if enableInvite prop is true', async () => {
      const { getByTestId } = renderComponent({
        enableInvite: true,
      });

      expect(getByTestId('test-id-invite-people')).toBeInTheDocument();
    });

    it('should fire exposure event with the appropriate attributes if feature is disabled', async () => {
      renderComponent();

      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'track',
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          subProduct: undefined,
          flagKey:
            'confluence.frontend.enable.invite.teammate.people.menu.dropdown',
          reason: 'FALLTHROUGH',
          ruleId: 'afcf95e4-e5b5-4da3-92d7-0bb9e24fb61f',
          value: false,
        },
      });
    });

    it('should fire exposure event with the appropriate attributes if feature is enabled', async () => {
      renderComponent({
        enableInvite: true,
      });

      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'track',
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          subProduct: undefined,
          flagKey:
            'confluence.frontend.enable.invite.teammate.people.menu.dropdown',
          reason: 'RULE_MATCH',
          ruleId: 'bfcf95e4-e5b5-4da3-92d7-0bb9e24fb61f',
          value: true,
        },
      });
    });
    it('should fire exposure event with the appropriate flagkey based on the product', async () => {
      renderComponent({
        enableInvite: true,
        product: 'jira',
      });

      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'track',
        actionSubject: 'feature',
        action: 'exposed',
        attributes: {
          subProduct: undefined,
          flagKey:
            'confluence.frontend.enable.product.select.invite.people.nav.3',
          reason: 'RULE_MATCH',
          ruleId: 'bfcf95e4-e5b5-4da3-92d7-0bb9e24fb61f',
          value: true,
        },
      });
    });
  });
});
