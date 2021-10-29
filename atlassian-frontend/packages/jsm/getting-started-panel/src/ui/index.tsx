import React, { ReactNode } from 'react';
import { ExitingPersistence, SlideIn } from '@atlaskit/motion';
import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { ReportErrors } from '@atlassian/error-handling';

import { getComponentTestId } from '../common/util';
import { AnalyticsProvider } from '../common/analytics/provider';
import {
  jsmGettingStartedPanelScreenName,
  jsmGettingStartedPanelPackageName,
} from '../common/analytics/constants';
import ChecklistSection from './checklist-section';
import WalkthroughsSection from './walkthroughs-section';
import HomeSection from './home-section';
import {
  TaskId,
  Checklist as ChecklistData,
  ProductTours,
  VisualState,
  GspSectionKey,
  ActiveState,
  SectionState,
  Product,
  GspState,
  Property,
  PropertyKey,
  Environment,
  Tenant,
  User,
} from '../common/types';
import { UrlDataProvider } from '../common/ui/url-data';
import { SlidingContainer, GettingStartedPanelContainer } from './styled';
import PanelFooter from './panel-footer';
import { VisibilityContainer } from '../common/services/visibility';
import { useSectionState } from './section-state';
import { GettingStartedPanelIntlProvider } from './messages-intl-provider';
import { InitialiseFeatureFlags } from './initialise-feature-flags';

interface Props {
  state: GspState;
  serviceDeskBaseUrl: string | undefined;
  opsgenieBaseUrl: string | undefined;
  product: Product;
  environment: Environment;
  cloudId: string;
  projectKey?: string;
  onTaskComplete: (id: TaskId) => void;
  onUserActivity: (property: Property) => void;
  onSpaRedirect?: (url: string) => void;
  onOpenInProductHelpArticle?: (articleId: string) => void;
  tenant?: Tenant;
  user?: User;
}

const WithSlidingHome = ({
  shouldShowHome,
  home,
  children,
}: {
  shouldShowHome: boolean;
  home: ReactNode;
  children: ReactNode;
}) => (
  <SlidingContainer>
    <ExitingPersistence>
      {shouldShowHome && (
        <SlideIn enterFrom="left" fade="inout">
          {(props) => <div {...props}>{home}</div>}
        </SlideIn>
      )}
    </ExitingPersistence>
    <ExitingPersistence>
      {!shouldShowHome && (
        <SlideIn enterFrom="right" fade="inout">
          {(props) => <div {...props}>{children}</div>}
        </SlideIn>
      )}
    </ExitingPersistence>
  </SlidingContainer>
);

const GettingStartedPanel = ({
  state,
  serviceDeskBaseUrl,
  opsgenieBaseUrl,
  product,
  projectKey,
  onOpenInProductHelpArticle,
  onTaskComplete,
  onUserActivity,
  onSpaRedirect,
}: Props) => {
  const [sectionState, setSectionState] = useSectionState(
    state.properties.user.sectionState,
    (updatedState: SectionState) =>
      onUserActivity({
        key: PropertyKey.SectionState,
        value: JSON.stringify(updatedState),
      }),
  );

  const onClose = () => {
    // minimise the panel into the lozenge state
    onUserActivity({
      key: PropertyKey.VisualState,
      value: VisualState.Lozenge,
    });
  };

  const onChecklistUserActivity = (checklistState: ChecklistData) => {
    const updatedState: SectionState = {
      ...sectionState,
      sections: {
        ...sectionState.sections,
        checklist: checklistState,
      },
    };

    setSectionState(updatedState);
  };

  const onProductToursUserActivity = (productTours: ProductTours) => {
    const updatedState: SectionState = {
      ...sectionState,
      sections: {
        ...sectionState.sections,
        productTours,
      },
    };

    setSectionState(updatedState);
  };

  const onSectionChange = (activeSection: GspSectionKey) => {
    setSectionState({
      ...sectionState,
      activeSection,
    });
  };

  const goHome = () => onSectionChange(GspSectionKey.Home);

  const onExitQuickStart = () => {
    onUserActivity({ key: PropertyKey.ActiveState, value: ActiveState.Off });
  };

  const { activeSection } = sectionState;

  const shouldShowHome = activeSection === GspSectionKey.Home;
  const shouldShowChecklist = activeSection === GspSectionKey.Checklist;
  const shouldShowWalkthroughs = activeSection === GspSectionKey.ProductTours;
  const shouldShowPanel =
    state.properties.user.visualState === VisualState.FullPanel &&
    (shouldShowHome || shouldShowChecklist || shouldShowWalkthroughs);

  return shouldShowPanel ? (
    <ContextualAnalyticsData
      sourceName={jsmGettingStartedPanelScreenName}
      sourceType={SCREEN}
    >
      <ReportErrors id="panel" packageName={jsmGettingStartedPanelPackageName}>
        <UrlDataProvider
          projectId={state.properties.user.projectId || ''}
          projectKey={projectKey}
          serviceDeskBaseUrl={serviceDeskBaseUrl || ''}
          opsgenieBaseUrl={opsgenieBaseUrl || ''}
          onTaskComplete={onTaskComplete}
          onSpaRedirect={onSpaRedirect}
          onOpenInProductHelpArticle={onOpenInProductHelpArticle}
          product={product}
        >
          <VisibilityContainer
            gspState={state}
            serviceDeskBaseUrl={serviceDeskBaseUrl}
            opsgenieBaseUrl={opsgenieBaseUrl}
          >
            <GettingStartedPanelContainer
              data-testid={getComponentTestId('panel')}
            >
              <WithSlidingHome
                shouldShowHome={shouldShowHome}
                home={
                  <HomeSection
                    onSectionChange={onSectionChange}
                    onClose={onClose}
                  />
                }
              >
                {shouldShowChecklist && (
                  <ChecklistSection
                    state={sectionState.sections.checklist}
                    completedItems={state.completedItems}
                    onUserActivity={onChecklistUserActivity}
                    onClose={onClose}
                    onBack={goHome}
                  />
                )}
                {shouldShowWalkthroughs && (
                  <WalkthroughsSection
                    state={sectionState.sections.productTours}
                    onUserActivity={onProductToursUserActivity}
                    onBack={goHome}
                    onClose={onClose}
                  />
                )}
              </WithSlidingHome>
              <PanelFooter onExitQuickStart={onExitQuickStart} />
            </GettingStartedPanelContainer>
            <FireScreenAnalytics />
          </VisibilityContainer>
        </UrlDataProvider>
      </ReportErrors>
    </ContextualAnalyticsData>
  ) : null;
};

export default (props: Props) => {
  const { tenant, user, environment, product } = props;
  const productInfo = {
    env: environment,
    // JSD events are registered under 'jira' with subproduct 'serviceDesk'
    product: product === Product.ServiceDesk ? 'jira' : product,
    subproduct: product === Product.ServiceDesk ? product : undefined,
  };
  return (
    <AnalyticsProvider productInfo={productInfo} tenant={tenant} user={user}>
      {({ analyticsClient }) => (
        <InitialiseFeatureFlags
          analyticsClient={analyticsClient}
          environment={props.environment}
          cloudId={props.cloudId}
        >
          <GettingStartedPanelIntlProvider>
            <GettingStartedPanel {...props} />
          </GettingStartedPanelIntlProvider>
        </InitialiseFeatureFlags>
      )}
    </AnalyticsProvider>
  );
};
