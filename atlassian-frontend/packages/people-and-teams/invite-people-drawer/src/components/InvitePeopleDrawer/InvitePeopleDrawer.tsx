import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import { AnalyticsSource, InvitePeopleDrawerProps } from '../../types';
import {
  WithAnalyticsEventsProps,
  useAnalyticsEvents,
  withAnalyticsContext,
} from '@atlaskit/analytics-next';
import Drawer from '@atlaskit/drawer';
import InvitePeople from '@atlassian/invite-people';
import {
  ImageWrapper,
  InviteWrapper,
  InviteWrapperSpace,
  Wrapper,
  overrideDrawerContentStyles,
  overrideDrawerSidebarStyles,
} from './styled';
import { Illustration } from './Illustration';

import {
  triggerAnalyticsForClickCloseDrawerButton,
  triggerAnalyticsForDrawerViewed,
} from '../analytics';
import { CSSObject } from '@emotion/core';

const bgOverrideCssFn = (defaultStyles: CSSObject): CSSObject => ({
  ...defaultStyles,
  ...overrideDrawerSidebarStyles,
});
const contentOverrideCssFn = (defaultStyles: CSSObject): CSSObject => ({
  ...defaultStyles,
  ...overrideDrawerContentStyles,
});

// This is a temporary solution to make the invite people drawer works in Jira with Issue Modal
const DrawerZIndexSetter: React.FC<{}> = () => {
  const zIndexRef = React.useCallback((node) => {
    if (node !== null) {
      const portalElement: Element | null =
        node.closest && node.closest('.atlaskit-portal');
      if (portalElement) {
        // we set it to 550 because we want it to stay above the modal, and below flag, spotlight and tooltip
        // directly setting the style property is the safer option than setAttribute()
        // because we don't know what other possible style properties could be
        (portalElement as any).style['z-index'] = 550;
      }
    }
  }, []);

  return <div ref={zIndexRef} />;
};

const InvitePeopleDrawerContainer: React.FC<
  InvitePeopleDrawerProps & InjectedIntlProps
> = ({
  intl,
  testId,
  viralOptionsDefaultToCheckedFeatureFlag,
  viralSettingsCohort,
  userRecommendationsCohort,
  ...props
}: InvitePeopleDrawerProps & WithAnalyticsEventsProps & InjectedIntlProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [isOpen, setIsOpen] = React.useState<boolean>(!!props.isOpen);
  const handleDrawerClose = () => {
    triggerAnalyticsForClickCloseDrawerButton(
      createAnalyticsEvent,
      props.source,
    );
    setIsOpen(false);
    props.onCloseHandler && props.onCloseHandler();
  };

  React.useEffect(() => {
    setIsOpen(!!props.isOpen);
  }, [props.isOpen]);

  const handleDrawerOpen = React.useCallback(() => {
    triggerAnalyticsForDrawerViewed(
      createAnalyticsEvent,
      props.source,
      viralSettingsCohort,
    );
  }, [createAnalyticsEvent, props.source, viralSettingsCohort]);

  const instanceUrl = `${window.location.protocol}//${window.location.host}`;
  const continueUrl = props.continueUrl || instanceUrl;
  const siteAri = `ari:cloud:${props.product}::site/${props.cloudId}`;

  return (
    <div data-testid="testId-invite-people-drawer">
      <Drawer
        testId={testId}
        onClose={handleDrawerClose}
        onOpenComplete={handleDrawerOpen}
        isOpen={isOpen}
        width="full"
        shouldUnmountOnExit={true}
        icon={CrossIcon}
        overrides={{
          Sidebar: {
            cssFn: bgOverrideCssFn,
          },
          Content: {
            cssFn: contentOverrideCssFn,
          },
        }}
      >
        <DrawerZIndexSetter />
        <Wrapper>
          <ImageWrapper data-testid="testId-invite-people-drawer-img">
            <Illustration />
          </ImageWrapper>
          <InviteWrapperSpace>
            <InviteWrapper>
              <InvitePeople
                onSendHandler={handleDrawerClose}
                onCancelHandler={handleDrawerClose}
                continueUrl={continueUrl}
                resourceAri={siteAri}
                showFlag={props.addFlag}
                userRole={props.userRole}
                enableInviteeList={props.enableInviteInviteeList}
                enableCustomizedProductSelect={
                  props.enableCustomizedProductSelect
                }
                subProduct={props.subProduct}
                source={props.source}
                jiraProjectName={props.jiraProjectName}
                jiraProjectKey={props.jiraProjectKey}
                enableThirdParty={props.enableThirdParty}
                thirdPartyInvitesCohort={props.thirdPartyInvitesCohort}
                thirdPartyApiV2={props.thirdPartyApiV2}
                thirdPartySlackv2Enabled={props.thirdPartySlackv2Enabled}
                userRecommendationsCohort={userRecommendationsCohort}
                viralSettingsCohort={viralSettingsCohort}
                viralOptionsDefaultToCheckedFeatureFlag={
                  viralOptionsDefaultToCheckedFeatureFlag
                }
                invitePeopleDrawerMigrationCohort={
                  props.invitePeopleDrawerMigrationCohort
                }
              />
            </InviteWrapper>
          </InviteWrapperSpace>
        </Wrapper>
      </Drawer>
    </div>
  );
};

const analyticsContextData = {
  source: AnalyticsSource.ADD_PEOPLE_DRAWER,
  componentName: 'addPeopleDrawer',
};

export default withAnalyticsContext(analyticsContextData)(
  injectIntl(InvitePeopleDrawerContainer),
);
