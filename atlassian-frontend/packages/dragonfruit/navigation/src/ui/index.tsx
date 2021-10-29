import React, { useCallback, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Link, useRouter, useRouterActions } from 'react-resource-router';

import {
  AtlassianNavigation,
  Create,
  PrimaryButton,
  ProductHome,
} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button';
import { LogoProps } from '@atlaskit/logo';
import Lozenge from '@atlaskit/lozenge';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CreateComponentModal } from '@atlassian/dragonfruit-component-create-modal';
import { ComponentMenu } from '@atlassian/dragonfruit-component-menu';
import { DisplayFeedback } from '@atlassian/dragonfruit-components';
import {
  UI_IN_PRODUCT_HELP,
  UI_IN_PRODUCT_HELP_DEFAULT_VALUE,
  UI_STARRED_COMPONENT,
  UI_STARRED_COMPONENT_DEFAULT_VALUE,
  useFeatureFlag,
  useInAppNotificationsEnabled,
} from '@atlassian/dragonfruit-feature-flags';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { HelpMenu } from '@atlassian/dragonfruit-in-product-help';
import TeamsMenu from '@atlassian/dragonfruit-people-menu';
import { useAddFlag } from '@atlassian/dragonfruit-people-teams';
import { routes } from '@atlassian/dragonfruit-routes';
import CompassSearch from '@atlassian/dragonfruit-search';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { isInDevMode } from '@atlassian/dragonfruit-utils';

import { CompassIcon, CompassLogo } from './compass-logo';
import CompassSwitcher from './compass-switcher';
import { DevModePopup } from './dev-mode-popup';
import { HelpPopup } from './help-popup';
import messages from './messages';
import { NotificationsPopup } from './notifications-popup';
import ProfilePopup from './profile-popup';
import { FeedbackContainer, LogoContainer, LozengeContainer } from './styled';

const baseUrl = `${window.location.origin}`;

const ProductLogo = (logoProps: LogoProps) => (
  <LogoContainer>
    <CompassLogo {...logoProps} />
    <LozengeContainer>
      <Lozenge appearance="new">
        <FormattedMessage {...messages.alphaLozengeText} />
      </Lozenge>
    </LozengeContainer>
  </LogoContainer>
);

const AppSwitcher = () => <CompassSwitcher />;

const CompassHome = () => {
  return (
    <ProductHome
      href={`${baseUrl}${routes.HOME()}`}
      icon={CompassIcon}
      logo={ProductLogo}
    />
  );
};

export const DragonfruitNavigation = ({
  intl: { formatMessage },
}: InjectedIntlProps) => {
  const [{ match }] = useRouter();
  const { push } = useRouterActions();
  const { accountId, cloudId, orgId } = useTenantInfo();
  const { value: inProductHelpEnabled } = useFeatureFlag<boolean>(
    UI_IN_PRODUCT_HELP,
    UI_IN_PRODUCT_HELP_DEFAULT_VALUE,
  );

  const [isPeoplePopupOpen, setPeoplePopupOpen] = useState(false);
  const onPeoplePopupOpen = useCallback(() => setPeoplePopupOpen(true), []);
  const onPeoplePopupClose = useCallback(() => setPeoplePopupOpen(false), []);

  const [isCreateComponentOpen, setIsCreateComponentOpen] = useState(false);
  const onCreateComponentOpen = useCallback(
    () => setIsCreateComponentOpen(true),
    [setIsCreateComponentOpen],
  );
  const onCreateComponentClose = useCallback(
    () => setIsCreateComponentOpen(false),
    [setIsCreateComponentOpen],
  );

  const onCreateComponentSuccess = useCallback(
    (componentId: CompassComponent['id']) => {
      push(routes.COMPONENT_DETAILS(componentId));
      onCreateComponentClose();
    },
    [push, onCreateComponentClose],
  );

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { addFlag } = useAddFlag();

  const isAppsHighlighted = match.path === routes.APPS();
  const isComponentsHighlighted =
    match.path.includes('/components') ||
    match.path.includes('/component/') ||
    match.path === '/compass/';
  const isScorecardsHighlighted =
    match.path.includes('/scorecards') || match.path.includes('/scorecard/');
  const isTeamsHighlighted =
    match.path.includes('/teams') || match.path.includes('/people');

  // Navigation Items
  const ComponentsNavItem = (
    <PrimaryButton
      component={Link}
      href="/compass/components"
      isHighlighted={isComponentsHighlighted}
    >
      {formatMessage(CommonMessages.components)}
    </PrimaryButton>
  );

  const componentDropdownViewEnabled = useFeatureFlag<boolean>(
    UI_STARRED_COMPONENT,
    UI_STARRED_COMPONENT_DEFAULT_VALUE,
  );

  const ScorecardsNavItem = (
    <PrimaryButton
      component={Link}
      href={routes.SCORECARD_LIST()}
      isHighlighted={isScorecardsHighlighted}
    >
      {formatMessage(CommonMessages.scorecards)}
    </PrimaryButton>
  );

  const AppsNavItem = (
    <PrimaryButton
      component={Link}
      href={routes.APPS()}
      isHighlighted={isAppsHighlighted}
    >
      {formatMessage(CommonMessages.apps)}
    </PrimaryButton>
  );

  return (
    <ContextualAnalyticsData sourceName="topNavigation" sourceType={SCREEN}>
      <AtlassianNavigation
        renderAppSwitcher={AppSwitcher}
        renderProductHome={CompassHome}
        label="header"
        renderHelp={inProductHelpEnabled ? HelpMenu : HelpPopup}
        renderProfile={ProfilePopup}
        renderSearch={CompassSearch}
        renderNotifications={
          useInAppNotificationsEnabled() ? NotificationsPopup : undefined
        }
        primaryItems={[
          componentDropdownViewEnabled.value ? (
            <ComponentMenu />
          ) : (
            ComponentsNavItem
          ),
          <TeamsMenu
            product="compass"
            cloudId={cloudId}
            userId={accountId}
            orgId={orgId}
            //isBrowseUsersEnabled={checkUsersGroupPermission}
            // allow PeopleMenu to do transitions to in-product People Directory
            pushRoute={push}
            //pushRoute={pushRoute}
            isHighlighted={isTeamsHighlighted}
            addFlag={addFlag}
            //onClick={triggerAnalytics}
            // manage open state
            isOpen={isPeoplePopupOpen}
            onOpen={onPeoplePopupOpen}
            onClose={onPeoplePopupClose}
            enableInvite
            enablePreFetchingByHovering
            //customChevronIcon={<ChevronRightIcon />}
            // "isEnablePreFetchDataPeopleMenu" allows us to turn off "shouldPreFetch"
            // if pre-fetch data causes too many requests to services.
            //enablePreFetchingByHovering={isEnablePreFetchDataPeopleMenu()}
            //enableLoadingSkeleton
          />,
          ScorecardsNavItem,
          AppsNavItem,
          isInDevMode ? <DevModePopup /> : null,
          <Create
            onClick={onCreateComponentOpen}
            text={formatMessage(CommonMessages.create)}
          />,
          <FeedbackContainer>
            <Button onClick={() => setIsFeedbackModalOpen(true)}>
              {formatMessage(messages.feedbackButton)}
            </Button>
          </FeedbackContainer>,
        ]}
      />

      {isFeedbackModalOpen && (
        <DisplayFeedback onClose={() => setIsFeedbackModalOpen(false)} />
      )}

      <ModalTransition>
        {isCreateComponentOpen && (
          <CreateComponentModal
            onSuccess={onCreateComponentSuccess}
            onClose={onCreateComponentClose}
          />
        )}
      </ModalTransition>
    </ContextualAnalyticsData>
  );
};

export default injectIntl(DragonfruitNavigation);
