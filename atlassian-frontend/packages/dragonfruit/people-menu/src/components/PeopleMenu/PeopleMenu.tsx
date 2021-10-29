import React, { useCallback, useContext, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-resource-router';

import {
  AnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  PrimaryButton,
  PrimaryDropdownButton,
  useOverflowStatus,
} from '@atlaskit/atlassian-navigation';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import { ButtonItem } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';
import {
  UI_TEAMS_LIST_PAGE,
  UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { routes } from '@atlassian/dragonfruit-routes';
import { SplitTeamsButton } from '@atlassian/dragonfruit-teams';

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
import { messages, PeopleMenuIntlProvider } from '../i18n';
import { MenuContent } from '../MenuContent';

import { UsersTeamsPreFetch } from './PreFetchData';
import * as styled from './styled';

const defaultProps: Partial<PeopleMenuProps> = {
  onClickViewPeopleDirectoryLink: () => undefined,
  onClickCreateNewTeam: () => undefined,
  testId: 'menu',
};

type PeopleMenuInternalProps = Pick<
  PeopleMenuProps,
  | 'isHighlighted'
  | 'customChevronIcon'
  | 'onClick'
  | 'enablePreFetchingByHovering'
>;

const eventuallyClearHoverMeasure = () => {
  setTimeout(() => {
    clearMeasure('hoverAndClick');
  }, 5 * SECOND);
};

const SPLIT_TEAM_POPUP_OFFSET = [0, -8];
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
  } = props;
  const [canPrefetch, setCanPrefetch] = useState(false);

  const {
    isPeopleMenuOpen,
    isBrowseUsersEnabled,
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

  const dropdownButtonProps = {
    isSelected: isPeopleMenuOpen,
    onClick: handleClickOnTriggerButton,
    onMouseEnter: handleMouseEnterTriggerButton,
  };

  const linkButtonProps = {
    isSelected: isPeopleMenuOpen,
    onClick: closeMenu,
    onMouseEnter: handleMouseEnterTriggerButton,
  };

  const chevron = customChevronIcon || (
    <ChevronRightIcon label="dropdown-chevron" />
  );

  const { value: teamsListPageEnabled } = useFeatureFlag<boolean>(
    UI_TEAMS_LIST_PAGE,
    UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  );

  return (
    <>
      <Popup
        // @ts-ignore
        offset={
          isVisible && teamsListPageEnabled
            ? SPLIT_TEAM_POPUP_OFFSET
            : undefined
        }
        content={() => (
          <span onClick={stopPropagation}>
            <MenuContent
              isLoadingPermission={isLoadingPermission}
              hasPermission={hasPermission}
            />
          </span>
        )}
        isOpen={isPeopleMenuOpen}
        placement={'bottom-start'}
        onClose={closeMenu}
        trigger={(triggerProps) => {
          // send in isVisible, buttonProps, triggerProps
          return isVisible ? (
            teamsListPageEnabled ? (
              <SplitTeamsButton
                dropdownButtonProps={dropdownButtonProps}
                linkButtonProps={linkButtonProps}
                triggerProps={triggerProps}
              />
            ) : (
              <PrimaryDropdownButton
                isHighlighted={isHighlighted}
                {...dropdownButtonProps}
                {...triggerProps}
              >
                <FormattedMessage {...messages.teams} />
              </PrimaryDropdownButton>
            )
          ) : teamsListPageEnabled ? (
            <PrimaryButton component={Link} href={routes.TEAMS()}>
              <FormattedMessage {...messages.teams} />
            </PrimaryButton>
          ) : (
            <styled.ButtonItemWrapper>
              <ButtonItem
                iconAfter={chevron}
                {...triggerProps}
                {...dropdownButtonProps}
              >
                <FormattedMessage {...messages.teams} />
              </ButtonItem>
            </styled.ButtonItemWrapper>
          );
        }}
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
    shouldPreFetch,
    tenantUrl,
    onClickedItem,
    onClick,
    onOpen,
    onClose,
    pushRoute,
    enableInvite,
    enableImprovedInvite,
    enableInviteProductSelect,
    enablePreFetchingByHovering,
    userRole,
    _hasError,
    addFlag,
    isOpen,
    customChevronIcon,
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
    testId,
    tenantUrl: trimLastForwardSlash(tenantUrl),
    onClickedItem,
    onOpen,
    onClose,
    pushRoute,
    enableInvite,
    enableImprovedInvite,
    enableInviteProductSelect,
    userRole,
    _hasError,
    addFlag,
    isPeopleMenuOpen: false,
    isInvitePeopleModalOpen: false,
    isOpen,
  };

  return (
    <PeopleMenuContextProvider {...commonPropsInContext}>
      <PeopleMenuIntlProvider>
        <AnalyticsContext data={analyticsContextData}>
          <>
            <PeopleMenuInternalWithAnalytics
              customChevronIcon={customChevronIcon}
              isHighlighted={isHighlighted}
              onClick={onClick}
              enablePreFetchingByHovering={enablePreFetchingByHovering}
            />
            {/* when cached data is empty and product is ready to allow to pre-fetch */}
            {shouldPreFetch && isCachedDataClear() && (
              <UsersTeamsPreFetch
                cloudId={cloudId}
                orgId={orgId}
                userId={userId}
                product={product}
                tenantUrl={tenantUrl}
              />
            )}
          </>
        </AnalyticsContext>
      </PeopleMenuIntlProvider>
    </PeopleMenuContextProvider>
  );
}
