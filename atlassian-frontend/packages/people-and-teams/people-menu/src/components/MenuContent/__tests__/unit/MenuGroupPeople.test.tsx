import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { InjectedIntl } from 'react-intl';

import type { User } from '@atlassian/people-teams/types';

import { PeopleMenuContext } from '../../../../context/PeopleMenuContext';
import { MAX_PEOPLE_IN_MENU } from '../../../../utils/constants';
import { getTestContextProps } from '../../../../utils/test-helper';
import { MenuGroupPeopleInternal } from '../../MenuGroupPeople';

describe('MenuGroupPeople', () => {
  const defaultContextProps = {
    ...getTestContextProps(jest),
  };

  const users: User[] = [
    {
      id: 'test-user-1',
      fullName: 'test user 1',
    },
    {
      id: 'test-user-2',
      fullName: 'test user 2',
    },
  ];

  const defaultProps = {
    intl: ({
      formatMessage: jest.fn((message) => message.id),
    } as unknown) as InjectedIntl,
    users,
    hasData: true,
    isLoading: false,
  };

  const clickOnUser1 = (getByText: any) => {
    const user1 = getByText('test user 1');
    fireEvent.click(user1);
  };

  const renderComponent = (
    overrideContextProps = {},
    overrideComponentProps = {},
  ) => {
    return render(
      <PeopleMenuContext.Provider
        value={{
          ...defaultContextProps,
          ...overrideContextProps,
        }}
      >
        <MenuGroupPeopleInternal
          {...defaultProps}
          {...overrideComponentProps}
        />
      </PeopleMenuContext.Provider>,
    );
  };

  describe('Invite Button', () => {
    it('should render', async () => {
      // setup
      const { getByText } = renderComponent();

      const inviteButton = await getByText('Invite a teammate');
      expect(inviteButton).toBeInTheDocument();
    });
  });

  it('should call onClickedItem and close menu when clicking on a people menu item', async () => {
    // setup
    const { getByText } = renderComponent();
    // act
    const user1 = getByText('test user 1');
    expect(user1).toBeInTheDocument();
    fireEvent.click(user1);
    // assert
    expect(defaultContextProps.onClickedItem).toHaveBeenCalledWith(
      'test-user-1',
      'people',
    );
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  it('should go to in-product People page in Confluence and close menu when clicking on a people menu item', async () => {
    // setup
    const { getByText } = renderComponent({
      product: 'confluence',
    });
    // act
    clickOnUser1(getByText);
    // assert
    expect(defaultContextProps.pushRoute).toHaveBeenCalledWith(
      '/wiki/people/test-user-1?ref=confluence&src=peopleMenu',
    );
    expect(defaultContextProps.togglePeopleMenu).toHaveBeenCalledWith(false);
  });

  it('should go to in-product People page in Jira and close menu when clicking on a people menu item', async () => {
    // setup
    const { getByText } = renderComponent({
      product: 'jira',
    });
    // act
    clickOnUser1(getByText);
    // assert
    expect(defaultContextProps.pushRoute).toHaveBeenCalledWith(
      '/jira/people/test-user-1?ref=jira&src=peopleMenu',
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
      expect(skeletonItems).toHaveLength(MAX_PEOPLE_IN_MENU);
    });

    it('should render when there is no data but still loading', async () => {
      const { getByTestId } = renderComponent(
        {},
        {
          isLoading: true,
          users: [],
        },
      );

      expect(
        getByTestId('test-id-people-section--heading'),
      ).toBeInTheDocument();
    });
  });
});
