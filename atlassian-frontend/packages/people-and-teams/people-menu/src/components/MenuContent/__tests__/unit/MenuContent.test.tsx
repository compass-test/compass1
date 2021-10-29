import React from 'react';

import { render, waitForElement } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import {
  mockGetCollaborators,
  mockGetTeams,
  resetFetchMock,
} from '@atlassian/ptc-test-utils';

import { PeopleMenuContext } from '../../../../context/PeopleMenuContext';
import { mapDataCache } from '../../../../hooks/useUsersTeamsData';
import { getTestContextProps } from '../../../../utils/test-helper';
import { MenuContentInternal } from '../../MenuContent';

jest.mock('../../../../utils/helper', () => {
  return {
    runItLater: (fn: () => void) => fn(),
  };
});

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
          <MenuContentInternal {...defaultProps} {...overrideDefaultProps} />
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
      mockGetTeams(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
      );
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

      expect(getByText('Your Collaborators')).toBeInTheDocument();
      expect(getByText('Your Teams')).toBeInTheDocument();

      unmount();

      // re-rendering
      // does not spinner when loading and cached data exists
      const {
        queryAllByTestId: queryAllByTestId2,
        getByText: getByText2,
      } = renderComponent();
      expect(queryAllByTestId2('people-menu-skeleton-item')).toHaveLength(0);
      expect(getByText2('Your Collaborators')).toBeInTheDocument();
      expect(getByText2('Your Teams')).toBeInTheDocument();
    });

    it('should render people and teams groups', async () => {
      // setup and act
      const { getByTestId, getAllByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);

      //assert
      expect(getByTestId('test-id-people-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-people-item')).toBeTruthy();

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

  describe('loading people succeeds but loading teams fails', () => {
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
      expect(getByTestId('test-id-people-section')).toBeInTheDocument();
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
          error:
            'fetch-mock: No fallback response defined for GET to /gateway/api/teams/v2/of-user/test-user-id?&limit=5&cursor=&origin.cloudId=test-cloud-id&origin.product=CONFLUENCE',
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
      mockGetTeams(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
      );
    });

    it('should render spinner when loading data', async () => {
      const { queryAllByTestId } = renderComponent();
      expect(queryAllByTestId('people-menu-skeleton-item')).not.toHaveLength(0);
    });

    it('should render teams group and not render people group', async () => {
      // setup and act
      const { getByTestId, getAllByTestId, queryByTestId } = renderComponent();
      await waitForFinishLoadingData(getByTestId);
      //assert
      expect(queryByTestId('test-id-people-section')).toBeInTheDocument();
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
          error:
            'fetch-mock: No fallback response defined for POST to /gateway/api/collaboration/v1/collaborationgraph/user/user',
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
          error: "Cannot read property 'then' of undefined",
        },
      });
      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'operational',
        actionSubject: 'teamMenuLink',
        action: 'failed',
        attributes: {
          status: undefined,
          error: "Cannot read property 'then' of undefined",
        },
      });
    });
  });

  describe('no browse user permissions', () => {
    beforeEach(() => {
      mockGetCollaborators();
      mockGetTeams(
        defaultContextProps.userId,
        defaultContextProps.cloudId,
        defaultContextProps.product,
      );
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

      expect(getByTestId('test-id-people-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-people-item')).toBeTruthy();

      expect(getByTestId('test-id-teams-section')).toBeInTheDocument();
      expect(getAllByTestId('test-id-team-item')).toBeTruthy();
    });
  });

  describe('add people feature', () => {
    it('should render "Invite a Teammate" Menu Item', async () => {
      const { getByTestId } = renderComponent();

      expect(getByTestId('test-id-invite-people')).toBeInTheDocument();
    });

    it('should fire UI event when the `Invite a teammate` navigation item is rendered', async () => {
      renderComponent();

      expect(defaultProps.createAnalyticsEvent).toHaveBeenCalledWith({
        eventType: 'ui',
        actionSubject: 'addPeopleNavigationItem',
        action: 'rendered',
      });
    });
  });
});
