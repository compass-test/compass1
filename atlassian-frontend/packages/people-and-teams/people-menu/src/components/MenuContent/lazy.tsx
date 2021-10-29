import React, { lazy, useContext } from 'react';

import { PopupMenuGroup } from '@atlaskit/menu';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import useUsersTeamsData from '../../hooks/useUsersTeamsData';

import { MenuGroupPeople } from './MenuGroupPeople';
import { MenuGroupTeams } from './MenuGroupTeams';

export const MenuContent = lazy(
  () =>
    // eslint-disable-next-line import/dynamic-import-chunkname
    import(/* webpackChunkName: "async-people-menu-content" */ './MenuContent'),
);

// avoid importing from other file like `./utils.tsx`
export const MAX_POPUP_WIDTH = 480;
export const MAX_POPUP_HEIGHT = 'calc(100vh - 79px)';

export function MenuContentFallback() {
  const { cloudId, tenantUrl, userId, product, testId, orgId } = useContext(
    PeopleMenuContext,
  );

  // kick off some requests sooner
  useUsersTeamsData(cloudId, userId, product, tenantUrl, undefined, orgId);

  return (
    <PopupMenuGroup
      testId={`${testId}-group-loading}`}
      maxWidth={MAX_POPUP_WIDTH}
      maxHeight={MAX_POPUP_HEIGHT}
    >
      <MenuGroupPeople isLoading={true} />
      <MenuGroupTeams isLoading={true} isLoadingPermission={true} />
    </PopupMenuGroup>
  );
}
