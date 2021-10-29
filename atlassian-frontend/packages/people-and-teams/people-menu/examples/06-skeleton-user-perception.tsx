import React, { useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { PopupMenuGroup } from '@atlaskit/menu';
import type { Team, User } from '@atlassian/people-teams/types';
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
  testId: 'test-id',
  product: 'confluence' as Product,
  isPeopleMenuOpen: false,
  isInvitePeopleModalOpen: false,
  invitePeopleInitState: false,
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

let timeout: any = 0;

function ExampleWithMockedData() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickRenderSkeleton = (duration: number) => () => {
    setIsLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  return (
    <styled.ExampleWrapper>
      <section>
        <ButtonGroup>
          <Button onClick={handleClickRenderSkeleton(10)}>10ms</Button>
          <Button onClick={handleClickRenderSkeleton(50)}>50ms</Button>
          <Button onClick={handleClickRenderSkeleton(100)}>100ms</Button>
          <Button onClick={handleClickRenderSkeleton(200)}>200ms</Button>
          <Button onClick={handleClickRenderSkeleton(300)}>300ms</Button>
          <Button onClick={handleClickRenderSkeleton(400)}>400ms</Button>
          <Button onClick={handleClickRenderSkeleton(500)}>500ms</Button>
          <Button onClick={handleClickRenderSkeleton(600)}>600ms</Button>
          <Button onClick={handleClickRenderSkeleton(700)}>700ms</Button>
          <Button onClick={handleClickRenderSkeleton(800)}>800ms</Button>
          <Button onClick={handleClickRenderSkeleton(900)}>900ms</Button>
          <Button onClick={handleClickRenderSkeleton(100)}>1000ms</Button>
        </ButtonGroup>
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
