import React, { useCallback } from 'react';
import noop from 'lodash/noop';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  fireUIAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Tooltip from '@atlaskit/tooltip';
import { ReportErrors } from '@atlassian/error-handling';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { G300, N0 } from '@atlaskit/theme/colors';

import {
  Outer,
  Icon,
  Content,
  TabName,
  TaskName,
  Title,
  CloseButtonWrapper,
} from './styled';

import { AnalyticsProvider } from '../../common/analytics/provider';
import {
  lozengeScreenName,
  jsmGettingStartedPanelPackageName,
} from '../../common/analytics/constants';
import {
  ActiveState,
  GspState,
  VisualState,
  GspSectionKey,
  Property,
  PropertyKey,
  Product,
  Environment,
  Tenant,
  User,
} from '../../common/types';
import { getComponentTestId } from '../../common/util';
import {
  useTabVisibility,
  useTaskVisibility,
  VisibilityContainer,
} from '../../common/services/visibility';
import { useSectionState } from '../section-state';
import { InitialiseFeatureFlags } from '../initialise-feature-flags';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { ZoomIn } from '@atlaskit/motion';

import IconRocket from '../../common/ui/avatar/assets/Rocket';
import { CloseButton } from './close-button';
import { GettingStartedPanelIntlProvider } from '../messages-intl-provider';
import { getSectionData, getActiveSectionConfig } from './utils';

interface InternalProps {
  state: GspState;
  onUserActivity: (property: Property) => void;
}

interface Props {
  state: GspState;
  serviceDeskBaseUrl: string | undefined;
  opsgenieBaseUrl: string | undefined;
  onUserActivity: (property: Property) => void;
  product: Product;
  environment: Environment;
  cloudId: string;
  tenant?: Tenant;
  user?: User;
}

const LozengeComponent = ({
  state,
  onUserActivity,
  intl,
}: InternalProps & InjectedIntlProps) => {
  const [taskVisibility] = useTaskVisibility();
  const [tabVisibility] = useTabVisibility();
  const [sectionState] = useSectionState(
    state.properties.user.sectionState,
    // This component doesn't set section state, it only reads it:
    noop,
  );
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const { activeSection } = sectionState;

  const handleClick = useCallback(() => {
    const activeTab =
      (activeSection === GspSectionKey.Checklist &&
        sectionState.sections.checklist.activeTab) ||
      undefined;
    const activeTask =
      activeTab && sectionState.sections.checklist.tabs[activeTab].activeTask;
    // TODO: InactiveTabContainer onClick does not give us an Atlaskit event so
    // we have to create it ourselves. Because of this we don't have the context
    // populated automatically from ContextualAnalyticsData
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'lozenge',
      attributes: {
        activeTab,
        activeTask,
      },
    });
    event.context.push({
      source: `${lozengeScreenName}${SCREEN}`,
    });
    fireUIAnalytics(event, 'jsmGettingStartedPanelLozenge');

    onUserActivity({
      key: PropertyKey.VisualState,
      value: VisualState.FullPanel,
    });
  }, [
    createAnalyticsEvent,
    onUserActivity,
    activeSection,
    sectionState.sections.checklist.activeTab,
    sectionState.sections.checklist.tabs,
  ]);

  const onClose = useCallback(() => {
    // fully dismiss the GSP
    onUserActivity({ key: PropertyKey.ActiveState, value: ActiveState.Off });
  }, [onUserActivity]);

  if (activeSection) {
    const activeSectionConfig = getActiveSectionConfig(
      activeSection,
      sectionState.sections,
    );
    const { title, subtitle, isComplete, icon } = getSectionData(
      activeSectionConfig,
      state.completedItems,
      taskVisibility,
      tabVisibility,
      intl.formatMessage,
    );
    return (
      <Outer
        isComplete={isComplete}
        onClick={handleClick}
        data-testid={getComponentTestId('lozenge')}
      >
        <Icon isComplete={isComplete}>
          {isComplete ? (
            <ZoomIn>
              {(props) => (
                <div {...props}>
                  <CheckCircleIcon
                    label={intl.formatMessage(messages.tickIconLabel)}
                    size="large"
                    primaryColor={N0}
                    secondaryColor={G300}
                  />
                </div>
              )}
            </ZoomIn>
          ) : (
            icon
          )}
        </Icon>
        <Content>
          {activeSection === GspSectionKey.Home ? (
            <Title>{title}</Title>
          ) : (
            <TabName>{title}</TabName>
          )}
          <Tooltip content={subtitle}>
            <TaskName>{subtitle}</TaskName>
          </Tooltip>
        </Content>
        <CloseButtonWrapper>
          <CloseButton onClose={onClose} />
        </CloseButtonWrapper>
        <FireScreenAnalytics
          attributes={{ activeSection: sectionState.activeSection }}
        />
      </Outer>
    );
  }

  return (
    <Outer onClick={handleClick}>
      <Icon>
        <IconRocket />
      </Icon>
      <Content>
        <Title>{intl.formatMessage(messages.yourCoach)}</Title>
      </Content>
      <CloseButtonWrapper>
        <CloseButton onClose={onClose} />
      </CloseButtonWrapper>
      <FireScreenAnalytics />
    </Outer>
  );
};

export const Lozenge = ({
  state,
  serviceDeskBaseUrl,
  opsgenieBaseUrl,
  ...props
}: Props & InjectedIntlProps) => {
  return (
    <ContextualAnalyticsData sourceName={lozengeScreenName} sourceType={SCREEN}>
      <ReportErrors
        id="lozenge"
        packageName={jsmGettingStartedPanelPackageName}
      >
        <VisibilityContainer
          gspState={state}
          serviceDeskBaseUrl={serviceDeskBaseUrl}
          opsgenieBaseUrl={opsgenieBaseUrl}
        >
          <LozengeComponent state={state} {...props} />
        </VisibilityContainer>
      </ReportErrors>
    </ContextualAnalyticsData>
  );
};

const LozengeWithIntl = injectIntl(Lozenge);

export default (props: Props) => {
  const { product, environment, tenant, cloudId, user } = props;
  const productInfo = {
    env: environment,
    // JSD events are registered under 'jira' with subproduct 'serviceDesk'
    product: product === Product.ServiceDesk ? 'jira' : product,
    subproduct:
      product === Product.ServiceDesk ? Product.ServiceDesk : undefined,
  };

  return (
    <AnalyticsProvider productInfo={productInfo} tenant={tenant} user={user}>
      {({ analyticsClient }) => (
        <InitialiseFeatureFlags
          analyticsClient={analyticsClient}
          environment={environment}
          cloudId={cloudId}
        >
          <GettingStartedPanelIntlProvider>
            <LozengeWithIntl {...props} />
          </GettingStartedPanelIntlProvider>
        </InitialiseFeatureFlags>
      )}
    </AnalyticsProvider>
  );
};
