import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { InjectedIntl } from 'react-intl';

import type { Team } from '@atlassian/people-teams/types';

import { PeopleMenuContext } from '../../../../context/PeopleMenuContext';
import { MAX_TEAMS_IN_MENU } from '../../../../utils/constants';
import { getTestContextProps } from '../../../../utils/test-helper';
import { MenuGroupTeamsInternal } from '../../MenuGroupTeams';

describe('MenuGroupTeam', () => {
  const defaultContextProps = {
    ...getTestContextProps(jest),
  };

  const teams: Team[] = [
    {
      id: 'test-team-1',
      displayName: 'test team 1',
    },
    {
      id: 'test-team-2',
      displayName: 'test team 2',
    },
  ] as Team[];

  const defaultProps = {
    intl: ({
      formatMessage: jest.fn((message) => message.id),
    } as unknown) as InjectedIntl,
    teams,
    hasData: true,
  };

  const renderComponent = (overrideContextProps = {}, overrideProps = {}) => {
    return render(
      <PeopleMenuContext.Provider
        value={{ ...defaultContextProps, ...overrideContextProps }}
      >
        <MenuGroupTeamsInternal {...defaultProps} {...overrideProps} />
      </PeopleMenuContext.Provider>,
    );
  };

  it('should call onClickedItem and close menu when clicking on a team menu item', async () => {
    // setup
    const { getByText } = renderComponent();
    //act
    const team1 = getByText('test team 1');
    expect(team1).toBeInTheDocument();
    fireEvent.click(team1);
    // assert
    expect(defaultContextProps.onClickedItem).toHaveBeenCalledWith(
      'test-team-1',
      'team',
    );
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  it('should call onClickedItem and close menu when clicking on a team menu item', async () => {
    // setup
    const { getByText } = renderComponent(
      {},
      {
        hasData: false,
        teams: [],
      },
    );
    // assert
    expect(getByText('Start a team')).toBeInTheDocument();
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  it('should go to in-product Team page in Confluence and close menu when clicking on a team menu item', async () => {
    // setup
    const { getByText } = renderComponent({
      product: 'confluence',
    });
    // act
    const team1 = getByText('test team 1');
    fireEvent.click(team1);
    // assert
    expect(defaultContextProps.pushRoute).toHaveBeenCalledWith(
      '/wiki/people/team/test-team-1?ref=confluence&src=peopleMenu',
    );
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  it('should go to in-product People page in Jira and close menu when clicking on a people menu item', async () => {
    // setup
    const { getByText } = renderComponent({
      product: 'jira',
    });
    // act
    const team1 = getByText('test team 1');
    fireEvent.click(team1);
    // assert
    expect(defaultContextProps.pushRoute).toHaveBeenCalledWith(
      '/jira/people/team/test-team-1?ref=jira&src=peopleMenu',
    );
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  describe('loading skeleton', () => {
    it('should render skeleton when isLoading is true', async () => {
      const { queryAllByTestId } = renderComponent(
        {},
        {
          isLoading: true,
        },
      );
      const skeletonItems = await queryAllByTestId('people-menu-skeleton-item');
      expect(skeletonItems).toHaveLength(MAX_TEAMS_IN_MENU);
    });

    it('should render Create Team button when there is no data', async () => {
      const { getByTestId } = renderComponent(undefined, {
        isLoading: false,
        teams: [],
      });
      expect(getByTestId('test-id-create-team')).toBeInTheDocument();
    });
  });

  describe('Create team button', () => {
    it('should render create team button when isLoadingPermission is false', async () => {
      // setup
      const { getByText } = renderComponent(undefined, {
        isLoadingPermission: false,
      });

      const inviteButton = await getByText('Start a team');
      expect(inviteButton).toBeInTheDocument();
    });

    it('should not create team button when isLoadingPermission is true', async () => {
      // setup
      const { queryByText } = renderComponent(undefined, {
        isLoadingPermission: true,
      });

      const inviteButton = await queryByText('Start a team');
      expect(inviteButton).not.toBeInTheDocument();
    });
  });
});
