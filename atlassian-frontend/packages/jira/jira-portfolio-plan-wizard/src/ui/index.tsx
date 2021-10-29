import React from 'react';

import { withAnalyticsContext } from '@atlaskit/analytics-next';
import { fireScreenAnalytics, MountEvent } from '@atlassian/analytics-bridge';

import { Plan } from '../common/types';
import { IntlHookProvider } from '../common/utils/intl';
import {
  ComponentsProvider,
  TeamPickerComponent,
} from '../controllers/components';
import { useFeatureFlags } from '../controllers/feature-flags';
import { FormProvider } from '../controllers/form';
import { IssueCountProvider } from '../controllers/issue-count';
import { IssueTypesProvider } from '../controllers/issue-types';
import { NavProvider, useNav } from '../controllers/nav';
import { OverLimitProvider } from '../controllers/over-limit';
import { PlanProvider } from '../controllers/plan';
import { PlanMetaProvider } from '../controllers/plan-meta';
import { ProjectsAndReleasesProvider } from '../controllers/projects-and-releases';
import { StatusTypesProvider } from '../controllers/status-types';

import {
  ContextProvider as AnalyticsContextProvider,
  PlanTracker as AnalyticsPlanTracker,
  WizardTracker as AnalyticsWizardTracker,
} from './analytics';
import Observer from './observer';
import OverlimitFlagGroup from './over-limit-flag-group';
import PlanForm, {
  IssueSourcesSettingsPageProps,
  IssueSourcesSettingsPage as IssueSourcesSettingsPageView,
  ProjectOverLimitPageProps,
  ProjectOverLimitPage as ProjectOverLimitPageView,
} from './plan-form';
import RefineIssuesForm, {
  SetExclusionRules,
  SetExclusionRulesProps,
} from './refine-issues-form';
import RemovedIssues, { RemovedIssuesProps } from './removed-issues';
import { Wrapper } from './styled';
export type {
  TeamPickerComponent,
  TeamPickerProps,
} from '../controllers/components';
export type { IssueSourcesSettingsPageProps } from './plan-form';
export type { SetExclusionRulesProps } from './refine-issues-form';
export type { RemovedIssuesProps as RemovedIssuesSettingsPageProps } from './removed-issues';

const name = process.env._PACKAGE_NAME_ as string;
const version = process.env._PACKAGE_VERSION_ as string;

interface Props {
  plan?: Plan;
  teamPickerComponent?: TeamPickerComponent;
}

interface ShowExitButton {
  shouldDisplay: boolean;
  onClicked: () => void;
}

interface AppProps {
  showExitButton?: ShowExitButton;
}

const STEPS = [PlanForm, RefineIssuesForm];

const App: React.ComponentType<AppProps> = (props) => {
  const { pageComponent: Page } = useNav();

  const screen = ((): string | undefined => {
    switch (Page) {
      case PlanForm:
        return 'planWizardCreateScreen';
      case RefineIssuesForm:
        return 'planWizardRefineIssuesScreen';
    }
  })();

  // feature clean up new-plan-wizard-issue-overlimit_8tze9
  const { getNewPlanWizardIssueOverLimit } = useFeatureFlags();

  // new-plan-wizard-issue-overlimit_8tze9
  // feature clean up
  const overLimitFlag = getNewPlanWizardIssueOverLimit() ? null : (
    <OverlimitFlagGroup />
  );
  return (
    <Wrapper>
      <AnalyticsContextProvider source={screen}>
        <>
          <Page {...props} />
          <AnalyticsWizardTracker />
          <AnalyticsPlanTracker />
        </>
      </AnalyticsContextProvider>
      {overLimitFlag}
      <Observer />
    </Wrapper>
  );
};

// Using React.ComponentType here instead of React.FC because React.FC typefdef is not avaiable for Flow
const PlanWizardView: React.ComponentType<Props> = ({
  plan,
  teamPickerComponent,
  ...props
}) => {
  return (
    <NavProvider initialSteps={STEPS}>
      <PlanProvider initialPlan={plan}>
        <ComponentsProvider teamPicker={teamPickerComponent}>
          <ProjectsAndReleasesProvider>
            <IssueTypesProvider>
              <StatusTypesProvider>
                <PlanMetaProvider>
                  <IssueCountProvider>
                    <OverLimitProvider>
                      <FormProvider>
                        <IntlHookProvider>
                          <App {...props} />
                        </IntlHookProvider>
                      </FormProvider>
                    </OverLimitProvider>
                  </IssueCountProvider>
                </PlanMetaProvider>
              </StatusTypesProvider>
            </IssueTypesProvider>
          </ProjectsAndReleasesProvider>
        </ComponentsProvider>
      </PlanProvider>
    </NavProvider>
  );
};

// Force typing so flow conversion wont generate broken types, Especially when it uses "&" e.g Props & { ... }
const PlanWizard: React.ComponentType<Props> = withAnalyticsContext({
  componentName: 'PlanWizard',
  packageName: name,
  packageVersion: version,
})(PlanWizardView);

export default PlanWizard;

export const IssueSourcesSettingsPage: React.ComponentType<IssueSourcesSettingsPageProps> = (
  props,
) => {
  const screen = 'portfolio3SettingsIssueSourcesScreen';

  return (
    <PlanProvider>
      <ProjectsAndReleasesProvider>
        <IssueTypesProvider>
          <StatusTypesProvider>
            <PlanMetaProvider>
              <IssueCountProvider>
                <FormProvider>
                  <IntlHookProvider>
                    <AnalyticsContextProvider source={screen}>
                      <>
                        <MountEvent
                          onMount={(analyticsEvent) =>
                            fireScreenAnalytics(analyticsEvent)
                          }
                        />
                        <IssueSourcesSettingsPageView {...props} />
                        <Observer autoExcludeReleased={false} />
                      </>
                    </AnalyticsContextProvider>
                  </IntlHookProvider>
                </FormProvider>
              </IssueCountProvider>
            </PlanMetaProvider>
          </StatusTypesProvider>
        </IssueTypesProvider>
      </ProjectsAndReleasesProvider>
    </PlanProvider>
  );
};

export const ProjectOverLimitPage: React.ComponentType<ProjectOverLimitPageProps> = (
  props,
) => {
  const screen = 'portfolio3SettingsProjectOverLimitScreen';

  return (
    <PlanProvider>
      <ProjectsAndReleasesProvider>
        <IssueTypesProvider>
          <StatusTypesProvider>
            <PlanMetaProvider>
              <IssueCountProvider>
                <FormProvider>
                  <IntlHookProvider>
                    <AnalyticsContextProvider source={screen}>
                      <>
                        <MountEvent
                          onMount={(analyticsEvent) =>
                            fireScreenAnalytics(analyticsEvent)
                          }
                        />
                        <ProjectOverLimitPageView {...props} />
                        <Observer autoExcludeReleased={false} />
                      </>
                    </AnalyticsContextProvider>
                  </IntlHookProvider>
                </FormProvider>
              </IssueCountProvider>
            </PlanMetaProvider>
          </StatusTypesProvider>
        </IssueTypesProvider>
      </ProjectsAndReleasesProvider>
    </PlanProvider>
  );
};

// Note dont use Omit<SetExclusionRulesProps, 'planId'> does not generate into flow properly
export interface SetExclusionRulesSettingsPageProps {
  planId: Plan['id'];
  issueSources: Plan['issueSources'];
  excludeDays: SetExclusionRulesProps['excludeDays'];
  onChange?: SetExclusionRulesProps['onChange'];
  renderLoadingSpinner?: SetExclusionRulesProps['renderLoadingSpinner'];
  renderHeader?: SetExclusionRulesProps['renderHeader'];
  renderDescription?: SetExclusionRulesProps['renderDescription'];
}

export const SetExclusionRulesSettingsPage: React.ComponentType<SetExclusionRulesSettingsPageProps> = (
  props,
) => {
  const screen = 'portfolio3SettingsSetExclusionRulesScreen';
  // Beware of changing this, reason its done like this is so the <MountEvent> only triggers once
  const planId = props.planId;
  const content =
    planId == null ? null : (
      <>
        <SetExclusionRules {...props} planId={planId} />
        <Observer autoExcludeReleased={false} />
      </>
    );
  return (
    <NavProvider initialSteps={[]}>
      <PlanProvider>
        <ProjectsAndReleasesProvider>
          <IssueTypesProvider>
            <StatusTypesProvider>
              <PlanMetaProvider>
                <IssueCountProvider>
                  <FormProvider>
                    <IntlHookProvider>
                      <AnalyticsContextProvider source={screen}>
                        {content}
                      </AnalyticsContextProvider>
                    </IntlHookProvider>
                  </FormProvider>
                </IssueCountProvider>
              </PlanMetaProvider>
            </StatusTypesProvider>
          </IssueTypesProvider>
        </ProjectsAndReleasesProvider>
      </PlanProvider>
    </NavProvider>
  );
};

export const RemovedIssuesSettingsPage: React.ComponentType<RemovedIssuesProps> = (
  props,
) => {
  const screen = 'portfolio3SettingsRemovedIssuesScreen';

  return (
    <IntlHookProvider>
      <AnalyticsContextProvider source={screen}>
        <>
          <MountEvent
            onMount={(analyticsEvent) => fireScreenAnalytics(analyticsEvent)}
          />
          <PlanMetaProvider>
            <RemovedIssues {...props} />
          </PlanMetaProvider>
        </>
      </AnalyticsContextProvider>
    </IntlHookProvider>
  );
};
