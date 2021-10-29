import React, { useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { PopupMenuGroup } from '@atlaskit/menu';
import { Team, User } from '@atlassian/dragonfruit-people-teams';
import {
  testCollaboratorsData,
  testMyTeamsData,
} from '@atlassian/ptc-test-utils';

import { MenuGroupPeople } from '../src/components/MenuContent/MenuGroupPeople';
import { MenuGroupTeams } from '../src/components/MenuContent/MenuGroupTeams';
import { PeopleMenuContextProvider } from '../src/context/PeopleMenuContext';
import { Product } from '../src/types';

import { withAnalyticsLogger, withIntlProvider } from './helpers';
import * as styled from './helpers/styled';

const commonPropsInContext = {
  userId: 'test-user-id',
  cloudId: 'test-cloud-id',
  orgId: 'test-org-id',
  testId: 'test-id',
  product: 'confluence' as Product,
  isPeopleMenuOpen: false,
  isInvitePeopleModalOpen: false,
  isOpen: false,
  onClickedItem: () => null,
  pushRoute: () => null,
  togglePeopleMenu: () => null,
  onClose: () => null,
  onOpen: () => null,
};

const users: User[] = testCollaboratorsData.collaborationGraphEntities.map(
  (item) => {
    return {
      id: item.id,
      fullName: item.userProfile.name,
      nickname: item.userProfile.nickname,
      email: item.userProfile.email,
      avatarUrl: item.userProfile.picture,
      status: item.userProfile.account_status,
    };
  },
) as User[];

const teams: Team[] = testMyTeamsData.entities.map((item) => {
  return {
    ...item,
  };
}) as Team[];

function ExampleWithMockedData() {
  const [isLoading, setIsLoading] = useState(false);

  const onChangeCheckbox = (event?: React.ChangeEvent<HTMLInputElement>) =>
    setIsLoading(!!event!.currentTarget.checked);

  return (
    <styled.ExampleWrapper>
      <section>
        <Checkbox
          label="isLoading"
          value="isLoading"
          name="isLoading"
          onChange={onChangeCheckbox}
        />
      </section>

      <PeopleMenuContextProvider {...commonPropsInContext}>
        <PopupMenuGroup>
          <MenuGroupPeople users={users} isLoading={isLoading} />
          <MenuGroupTeams teams={teams} isLoading={isLoading} />
        </PopupMenuGroup>
      </PeopleMenuContextProvider>
    </styled.ExampleWrapper>
  );
}

export default withIntlProvider(withAnalyticsLogger(ExampleWithMockedData));
