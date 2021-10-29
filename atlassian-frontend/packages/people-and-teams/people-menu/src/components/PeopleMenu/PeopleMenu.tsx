import React, { Suspense, useCallback, useContext, useState } from 'react';

import {
  AnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { useOverflowStatus } from '@atlaskit/atlassian-navigation';
import Popup from '@atlaskit/popup';

import {
  PeopleMenuContext,
  PeopleMenuContextProvider,
} from '../../context/PeopleMenuContext';
import useBrowsePeoplePermission from '../../hooks/useBrowsePeoplePermission';
import { isCachedDataClear } from '../../hooks/useUsersTeamsData';
import { PeopleMenuProps } from '../../types';
import { VOID_FUNC } from '../../utils/constants';
import { packageContext } from '../../utils/package-context';
import {
  clearMeasure,
  startMeasure,
  stopMeasure,
} from '../../utils/performance';
import { trimLastForwardSlash } from '../../utils/url';
import {
  AnalyticsSource,
  triggerAnalyticsForHoverAndClick,
} from '../analytics';
import { CustomIntlProvider as PeopleMenuIntlProvider } from '../i18n';
import { MenuContent, MenuContentFallback } from '../MenuContent/lazy';

import PeopleMenuTrigger, { PeopleMenuTriggerSSR } from './PeopleMenuTrigger';
import { UsersTeamsPreFetch } from './PreFetchData';

const defaultProps: Partial<PeopleMenuProps> = {
  onClickViewPeopleDirectoryLink: () => undefined,
  onClickCreateNewTeam: () => undefined,
  testId: 'menu',
  isSSR: false,
};

type PeopleMenuInternalProps = Pick<
  PeopleMenuProps,
  | 'isHighlighted'
  | 'customChevronIcon'
  | 'onClick'
  | 'enablePreFetchingByHovering'
  | 'peopleText'
  | 'userRecommendationsCohort'
  | 'viralSettingsCohort'
  | 'invitePeopleDrawerMigrationCohort'
>;

// if `@atlaskit/popup` is upgraded from 0.6.x to 1.x,
// we may need to change this to an array of numbers like [0, 12];.
const OFFSET_FOR_MORE_BUTTON_VIEW = '12px -11px';
const eventuallyClearHoverMeasure = () => {
  setTimeout(() => {
    clearMeasure('hoverAndClick');
  }, 5 * SECOND);
};

const SECOND = 1000;
const stopPropagation = (e: React.MouseEvent<HTMLElement>) =>
  e.stopPropagation();

export function PeopleMenuInternal(
  props: PeopleMenuInternalProps & WithAnalyticsEventsProps,
) {
  const {
    customChevronIcon,
    isHighlighted,
    enablePreFetchingByHovering,
    createAnalyticsEvent,
    onClick = VOID_FUNC,
    peopleText,
    userRecommendationsCohort,
    viralSettingsCohort,
    invitePeopleDrawerMigrationCohort,
  } = props;
  const [canPrefetch, setCanPrefetch] = useState(false);

  const {
    testId,
    isPeopleMenuOpen,
    isBrowseUsersEnabled,
    isSSR,
    cloudId,
    orgId,
    userId,
    product,
    tenantUrl,
    togglePeopleMenu = VOID_FUNC,
  } = useContext(PeopleMenuContext);
  const { isVisible } = useOverflowStatus();

  const closeMenu = useCallback(() => togglePeopleMenu(false), [
    togglePeopleMenu,
  ]);
  const handleClickOnTriggerButton = useCallback(() => {
    onClick(!isPeopleMenuOpen);
    togglePeopleMenu(!isPeopleMenuOpen);
    // measure duration of click and show menu
    startMeasure('clickAndShow');
    stopMeasure('hoverAndClick', (duration, startTime) => {
      triggerAnalyticsForHoverAndClick(
        createAnalyticsEvent,
        duration,
        startTime,
      );
    });
  }, [createAnalyticsEvent, isPeopleMenuOpen, onClick, togglePeopleMenu]);

  const handleMouseEnterTriggerButton = useCallback(() => {
    if (!canPrefetch) {
      setCanPrefetch(true);
      // measure duration time between hovering and clicking
      startMeasure('hoverAndClick');

      // clear all unwanted hovering after 5 seconds
      eventuallyClearHoverMeasure();
    }
  }, [canPrefetch, setCanPrefetch]);

  const {
    loading: isLoadingPermission,
    hasPermission,
  } = useBrowsePeoplePermission(isBrowseUsersEnabled);

  const buttonProps = {
    isSelected: isPeopleMenuOpen,
    onClick: handleClickOnTriggerButton,
    onMouseEnter: handleMouseEnterTriggerButton,
    testId: `${testId}-people-primary-button`,
    peopleText,
  };

  if (isSSR) {
    return <PeopleMenuTriggerSSR testId={testId} peopleText={peopleText} />;
  }

  return (
    <>
      <Popup
        // @ts-ignore
        offset={isVisible ? undefined : OFFSET_FOR_MORE_BUTTON_VIEW}
        content={() => (
          <span onClick={stopPropagation}>
            <Suspense fallback={<MenuContentFallback />}>
              <MenuContent
                invitePeopleDrawerMigrationCohort={
                  invitePeopleDrawerMigrationCohort
                }
                userRecommendationsCohort={userRecommendationsCohort}
                viralSettingsCohort={viralSettingsCohort}
                isLoadingPermission={isLoadingPermission}
                hasPermission={hasPermission}
              />
            </Suspense>
          </span>
        )}
        isOpen={isPeopleMenuOpen}
        placement={isVisible ? 'bottom-start' : 'right-start'}
        onClose={closeMenu}
        trigger={(triggerProps) => (
          <PeopleMenuTrigger
            isVisible={isVisible}
            isHighlighted={isHighlighted}
            customChevronIcon={customChevronIcon}
            triggerProps={triggerProps}
            {...buttonProps}
          />
        )}
      />

      {/* when cached data is empty and hovering on People trigger button */}
      {enablePreFetchingByHovering && canPrefetch && isCachedDataClear() && (
        <UsersTeamsPreFetch
          cloudId={cloudId}
          orgId={orgId}
          userId={userId}
          product={product}
          tenantUrl={tenantUrl}
        />
      )}
    </>
  );
}

const PeopleMenuInternalWithAnalytics = withAnalyticsEvents()(
  PeopleMenuInternal,
);
/**
 * There are some essential higher components wrapping an actual PeopleMenu component:
 * - PeopleMenuContext: is used to avoid passing common props like cloudId
 * - IntlProvider: to make i18n working
 * - AnalyticsContext: is used to avoid passing many props for triggering analytics events
 * - ErrorBoundary: to capture any errors inside actual PeopleMenu component
 */
export default function PeopleMenu(props: PeopleMenuProps) {
  const {
    product,
    subProduct,
    cloudId,
    orgId,
    userId,
    onClickViewPeopleDirectoryLink,
    onClickCreateNewTeam,
    isBrowseUsersEnabled,
    testId,
    isHighlighted,
    tenantUrl,
    onClickedItem,
    onClick,
    onOpen,
    onClose,
    pushRoute,
    enableInviteInviteeList,
    enableCustomizedProductSelect,
    enableThirdPartyInvites,
    thirdPartyInvitesCohort,
    thirdPartyApiV2,
    thirdPartySlackv2Enabled,
    userRecommendationsCohort,
    viralSettingsCohort,
    viralOptionsDefaultToCheckedFeatureFlag,
    invitePeopleDrawerMigrationCohort,
    enablePreFetchingByHovering,
    userRole,
    _hasError,
    addFlag,
    isOpen,
    isSSR,
    customChevronIcon,
    peopleText,
    invitePeopleInitState,
  } = {
    ...defaultProps,
    ...props,
  };

  const analyticsContextData = {
    product,
    source: AnalyticsSource.PEOPLE_MENU,
    componentName: AnalyticsSource.PEOPLE_MENU,
    ...packageContext,
  };

  const commonPropsInContext = {
    cloudId,
    orgId,
    product,
    subProduct,
    userId,
    onClickViewPeopleDirectoryLink,
    onClickCreateNewTeam,
    isBrowseUsersEnabled,
    isSSR,
    testId,
    tenantUrl: trimLastForwardSlash(tenantUrl),
    onClickedItem,
    onOpen,
    onClose,
    pushRoute,
    enableInviteInviteeList,
    enableCustomizedProductSelect,
    enableThirdPartyInvites,
    thirdPartyInvitesCohort,
    thirdPartyApiV2,
    thirdPartySlackv2Enabled,
    userRecommendationsCohort,
    viralSettingsCohort,
    viralOptionsDefaultToCheckedFeatureFlag,
    invitePeopleDrawerMigrationCohort,
    userRole,
    _hasError,
    addFlag,
    isPeopleMenuOpen: false,
    isInvitePeopleModalOpen: false,
    invitePeopleInitState,
    isOpen,
  };

  return (
    <PeopleMenuContextProvider {...commonPropsInContext}>
      <PeopleMenuIntlProvider>
        <AnalyticsContext data={analyticsContextData}>
          <PeopleMenuInternalWithAnalytics
            customChevronIcon={customChevronIcon}
            isHighlighted={isHighlighted}
            onClick={onClick}
            enablePreFetchingByHovering={enablePreFetchingByHovering}
            peopleText={peopleText}
            userRecommendationsCohort={userRecommendationsCohort}
            viralSettingsCohort={viralSettingsCohort}
            invitePeopleDrawerMigrationCohort={
              invitePeopleDrawerMigrationCohort
            }
          />
        </AnalyticsContext>
      </PeopleMenuIntlProvider>
    </PeopleMenuContextProvider>
  );
}
