import React, { useContext, useEffect } from 'react';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { PopupMenuGroup } from '@atlaskit/menu';

import { PeopleMenuContext } from '../../context/PeopleMenuContext';
import useUsersTeamsData, {
  isCachedDataClear,
} from '../../hooks/useUsersTeamsData';
import { PeopleMenuProps } from '../../types';
import { isRealErrorFromService } from '../../utils/errror';
import { ErrorWithStatus } from '../../utils/fetch';
import { stopMeasure } from '../../utils/performance';
import {
  triggerAnalyticsForExposedUserRecommendations,
  triggerAnalyticsForLoadedPeople,
  triggerAnalyticsForLoadedTeam,
  triggerAnalyticsForNoBrowsePeoplePermission,
  triggerAnalyticsForRenderedInvitePeople,
  triggerAnalyticsForViewedFullUsersAndTeams,
  triggerAnalyticsForViewedPeopleMenu,
} from '../analytics';
import { ErrorBoundary } from '../ErrorBoundary';

import LoadingIndicator from './LoadingIndicator';
import { MenuGroupPeople } from './MenuGroupPeople';
import { MenuGroupTeams } from './MenuGroupTeams';
import { Buggy, MAX_POPUP_HEIGHT, MAX_POPUP_WIDTH } from './utils';
import { ViewAllPeopleAndTeamMenuItem } from './ViewAllPeopleAndTeamMenuItem';
import { ViewProfileMenuItem } from './ViewProfileMenuItem';

export interface MenuContentProps {
  // this is used for testing purpose
  requestCacheTimeout?: number;
  isLoadingPermission?: boolean;
  hasPermission?: boolean;
  userRecommendationsCohort?: PeopleMenuProps['userRecommendationsCohort'];
  viralSettingsCohort?: PeopleMenuProps['viralSettingsCohort'];
  invitePeopleDrawerMigrationCohort?: PeopleMenuProps['invitePeopleDrawerMigrationCohort'];
}

export function MenuContentInternal(
  props: MenuContentProps & WithAnalyticsEventsProps,
) {
  const {
    createAnalyticsEvent,
    requestCacheTimeout,
    isLoadingPermission,
    hasPermission,
    userRecommendationsCohort,
    viralSettingsCohort,
    invitePeopleDrawerMigrationCohort,
  } = props;

  const {
    cloudId,
    orgId,
    tenantUrl,
    userId,
    product,
    subProduct,
    testId,
    _hasError,
  } = useContext(PeopleMenuContext);

  const { users, teams, errorTeams, errorUsers, isLoading } = useUsersTeamsData(
    cloudId,
    userId,
    product,
    tenantUrl,
    requestCacheTimeout,
    orgId,
  );

  useEffect(() => {
    triggerAnalyticsForExposedUserRecommendations(
      product,
      userRecommendationsCohort,
      createAnalyticsEvent,
    );
  }, [createAnalyticsEvent, product, userRecommendationsCohort]);

  // trigger exposure event for the invite button
  useEffect(() => {
    triggerAnalyticsForRenderedInvitePeople(createAnalyticsEvent);
  }, [createAnalyticsEvent, product, subProduct]);

  // trigger viewed event regardless of browse people permission
  useEffect(() => {
    triggerAnalyticsForViewedPeopleMenu(
      createAnalyticsEvent,
      isCachedDataClear(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      triggerAnalyticsForNoBrowsePeoplePermission(createAnalyticsEvent);
    }
  }, [hasPermission, createAnalyticsEvent]);

  // Users: trigger operational events after stop loading data
  const isFetchedUsersSuccess =
    !isLoading && hasPermission && !errorUsers && !!users;
  useEffect(() => {
    if (isFetchedUsersSuccess) {
      triggerAnalyticsForLoadedPeople('succeeded', createAnalyticsEvent);
    } else if (isRealErrorFromService(errorUsers)) {
      triggerAnalyticsForLoadedPeople(
        'failed',
        createAnalyticsEvent,
        errorUsers && (errorUsers as ErrorWithStatus).status,
        errorUsers,
      );
    }
    // should not add `users` to this dep list because `users` array reference can be changed in next re-render
  }, [createAnalyticsEvent, isFetchedUsersSuccess, errorUsers]);

  // Teams: trigger operational events after stop loading data
  const isFetchedTeamsSuccess =
    !isLoading && hasPermission && !errorTeams && !!teams;
  useEffect(() => {
    if (isFetchedTeamsSuccess) {
      triggerAnalyticsForLoadedTeam('succeeded', createAnalyticsEvent);
    } else if (isRealErrorFromService(errorTeams)) {
      triggerAnalyticsForLoadedTeam(
        'failed',
        createAnalyticsEvent,
        errorTeams && (errorTeams as ErrorWithStatus).status,
        errorTeams,
      );
    }
    // should not add `teams` to this dep list because `teams` array reference can be changed in next re-render
  }, [createAnalyticsEvent, errorTeams, isFetchedTeamsSuccess]);

  // Users and Teams: trigger operational events for loading both users and teams
  const numberOfUsers = users ? users.length : 0;
  const numberOfTeams = teams ? teams.length : 0;
  const isFinishedLoadData = !isLoading && hasPermission && !!users && !!teams;

  useEffect(() => {
    if (!isFinishedLoadData) {
      return;
    }

    stopMeasure('clickAndShow', (duration, startTime) => {
      triggerAnalyticsForViewedFullUsersAndTeams(
        createAnalyticsEvent,
        // this helps us to make decision of changing number skeleton items in future to prevent UI jank
        numberOfTeams,
        numberOfTeams,
        duration,
        startTime,
      );
    });
  }, [createAnalyticsEvent, isFinishedLoadData, numberOfUsers, numberOfTeams]);

  if (!isLoadingPermission && !hasPermission) {
    return (
      <PopupMenuGroup>
        <ViewProfileMenuItem />
      </PopupMenuGroup>
    );
  }

  const isDataMissing = !users && !teams;
  // just show loading when cache is empty and fetching data is in process.
  const shouldRenderLoadingUI = isDataMissing || isLoadingPermission;

  return (
    <ErrorBoundary>
      <PopupMenuGroup
        testId={`${testId}-group-${isLoading ? 'loading' : 'loaded'}`}
        maxWidth={MAX_POPUP_WIDTH}
        maxHeight={MAX_POPUP_HEIGHT}
      >
        {shouldRenderLoadingUI && <LoadingIndicator />}

        <MenuGroupPeople
          users={users}
          isLoading={shouldRenderLoadingUI}
          viralSettingsCohort={viralSettingsCohort}
          invitePeopleDrawerMigrationCohort={invitePeopleDrawerMigrationCohort}
        />
        <MenuGroupTeams
          teams={teams}
          isLoading={shouldRenderLoadingUI}
          isLoadingPermission={isLoadingPermission}
        />

        {!isLoadingPermission && <ViewAllPeopleAndTeamMenuItem hasSeparator />}
      </PopupMenuGroup>

      {/*we use _hasError to test unhandled error*/}
      {_hasError && <Buggy />}
    </ErrorBoundary>
  );
}

export default withAnalyticsEvents()(MenuContentInternal);
