import React from 'react';

import { IntlProvider } from 'react-intl';
import styled, { injectGlobal } from 'styled-components';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ANALYTICS_BRIDGE_CHANNEL } from '@atlassian/analytics-bridge';

import {
  buildAPI,
  existingPlan,
  existingPlanBasicInfo,
  featureFlags,
  issueSources,
  PROJECT_LIMIT,
  responseAfter,
  TeamPicker,
} from '../common/mocks';
import { IssueSource as IssueSourceType, PlanBasicInfo } from '../common/types';
import { action } from '../common/utils/storybook';
import Vr from '../common/utils/vr';
import { APIProvider } from '../controllers/api';
import { ComponentsProvider } from '../controllers/components';
import {
  FeatureFlagsProvider,
  useFeatureFlags,
} from '../controllers/feature-flags';

import PlanWizard, {
  IssueSourcesSettingsPage,
  ProjectOverLimitPage,
  RemovedIssuesSettingsPage,
  SetExclusionRulesSettingsPage,
} from './index';

// Dunno why this class exists, it creates scroll bars because of no border-box
injectGlobal`
  .sb-show-main {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div<{ width?: number }>`
  width: ${({ width = 800 }) => width}px;
`;

export const PlanWizardPage = () => (
  <IntlProvider>
    <FeatureFlagsProvider featureFlags={featureFlags}>
      <APIProvider api={buildAPI(undefined, 1000)}>
        <ComponentsProvider>
          <AnalyticsListener
            channel={ANALYTICS_BRIDGE_CHANNEL}
            onEvent={action('analyticsEvent')}
          >
            <PlanWizard teamPickerComponent={TeamPicker} />
          </AnalyticsListener>
        </ComponentsProvider>
      </APIProvider>
    </FeatureFlagsProvider>
  </IntlProvider>
);

export const IssueSourcesSettingPage = () => (
  <Vr waitFor="issue-sources-settings-page">
    <Wrapper width={600}>
      <IntlProvider>
        <FeatureFlagsProvider
          featureFlags={{
            ...featureFlags,
            getIssueSourceSettingsConfirmOnRemove: () => true,
          }}
        >
          <APIProvider
            api={buildAPI(
              {
                fetchPlanConfiguration: () =>
                  Promise.resolve({
                    absoluteIssueLimit: 5000,
                    projectLimit: 100,
                    defaultAbsoluteIssueLimit: 5000,
                    defaultHierarchyIssueLimit: 2000,
                    defaultProjectLimit: 100,
                  }),
              },
              0,
            )}
          >
            <IssueSourcesSettingsPage
              planId={existingPlan.id || 1}
              excludeDays={existingPlan.excludeDays}
              onChange={async (partialPlan) => {
                action('onChange')(partialPlan);
              }}
              renderLoadingSpinner={() => <div>loading...</div>}
              renderHeader={(header) => <h3>{header}</h3>}
              toggleIssueLimitWarningFlag={action(
                'toggleIssueLimitWarningFlag',
              )}
              toggleNextGenWarningFlag={action('toggleNextGenWarningFlag')}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const RemovedIssuesSettingPage = () => (
  <Vr waitFor="remove-issues-settings-page">
    <Wrapper>
      <IntlProvider>
        <APIProvider api={buildAPI()}>
          <RemovedIssuesSettingsPage
            planId={1}
            scenarioId={1}
            issueSources={issueSources}
            onSubmit={async (...args) => {
              action('onSubmit')(...args);
            }}
            renderHeader={(header) => <h3>{header}</h3>}
          />
        </APIProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const EmptyRemovedIssuesSettingPage = () => (
  <Vr waitFor="remove-issues-settings-page">
    <Wrapper>
      <IntlProvider>
        <APIProvider
          api={buildAPI(
            { fetchRemovedIssues: () => Promise.resolve([]) },
            1000,
          )}
        >
          <RemovedIssuesSettingsPage
            planId={1}
            scenarioId={1}
            issueSources={issueSources}
            onSubmit={async (...args) => {
              action('onSubmit')(...args);
            }}
            renderHeader={(header) => <h3>{header}</h3>}
          />
        </APIProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const IssueSourcesSettingPageWithProjectLimit = () => (
  <Vr waitFor="issue-sources-settings-page">
    <Wrapper width={600}>
      <IntlProvider>
        <FeatureFlagsProvider
          featureFlags={{
            ...featureFlags,
            getIssueSourceSettingsConfirmOnRemove: () => true,
          }}
        >
          <APIProvider
            api={buildAPI(
              {
                fetchPlanConfiguration: () =>
                  Promise.resolve({
                    absoluteIssueLimit: 5000,
                    projectLimit: 1,
                    defaultAbsoluteIssueLimit: 5000,
                    defaultHierarchyIssueLimit: 2000,
                    defaultProjectLimit: 100,
                  }),
                fetchProjectsAndReleasesByIssueSources: (
                  issueSources: IssueSourceType[],
                ) => {
                  return Promise.reject({});
                },
              },
              0,
            )}
          >
            <IssueSourcesSettingsPage
              planId={existingPlan.id || 1}
              excludeDays={existingPlan.excludeDays}
              onChange={async (partialPlan) => {
                action('onChange')(partialPlan);
              }}
              renderLoadingSpinner={() => <div>loading...</div>}
              renderHeader={(header) => <h3>{header}</h3>}
              toggleIssueLimitWarningFlag={action(
                'toggleIssueLimitWarningFlag',
              )}
              toggleNextGenWarningFlag={action('toggleNextGenWarningFlag')}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const IssueSourcesSettingPageWithProjectAndIssueLimit = () => (
  <Vr waitFor="issue-sources-settings-page">
    <Wrapper width={600}>
      <IntlProvider>
        <FeatureFlagsProvider
          featureFlags={{
            ...featureFlags,
            getIssueSourceSettingsConfirmOnRemove: () => true,
          }}
        >
          <APIProvider
            api={buildAPI(
              {
                fetchPlanConfiguration: () =>
                  Promise.resolve({
                    absoluteIssueLimit: 3000,
                    projectLimit: 1,
                    defaultAbsoluteIssueLimit: 5000,
                    defaultHierarchyIssueLimit: 2000,
                    defaultProjectLimit: 100,
                  }),
                fetchProjectsAndReleasesByIssueSources: (
                  issueSources: IssueSourceType[],
                ) => {
                  return Promise.reject({});
                },
              },

              0,
            )}
          >
            <IssueSourcesSettingsPage
              planId={existingPlan.id || 1}
              excludeDays={existingPlan.excludeDays}
              onChange={async (partialPlan) => {
                action('onChange')(partialPlan);
              }}
              renderLoadingSpinner={() => <div>loading...</div>}
              renderHeader={(header) => <h3>{header}</h3>}
              toggleIssueLimitWarningFlag={action(
                'toggleIssueLimitWarningFlag',
              )}
              toggleNextGenWarningFlag={action('toggleNextGenWarningFlag')}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const IssueSourcesSettingPageWithIssueLimit = () => (
  <Vr waitFor="issue-sources-settings-page">
    <Wrapper width={600}>
      <IntlProvider>
        <FeatureFlagsProvider
          featureFlags={{
            ...featureFlags,
            getIssueSourceSettingsConfirmOnRemove: () => true,
          }}
        >
          <APIProvider
            api={buildAPI(
              {
                fetchPlanConfiguration: () =>
                  Promise.resolve({
                    absoluteIssueLimit: 5,
                    projectLimit: 100,
                    defaultAbsoluteIssueLimit: 5000,
                    defaultHierarchyIssueLimit: 2000,
                    defaultProjectLimit: 100,
                  }),
              },
              0,
            )}
          >
            <IssueSourcesSettingsPage
              planId={existingPlan.id || 1}
              excludeDays={existingPlan.excludeDays}
              onChange={async (partialPlan) => {
                action('onChange')(partialPlan);
              }}
              renderLoadingSpinner={() => <div>loading...</div>}
              renderHeader={(header) => <h3>{header}</h3>}
              toggleIssueLimitWarningFlag={action(
                'toggleIssueLimitWarningFlag',
              )}
              toggleNextGenWarningFlag={action('toggleNextGenWarningFlag')}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const ProjectOverLimitPageExample = () => (
  <Vr waitFor="issue-sources-settings-page">
    <Wrapper width={508}>
      <IntlProvider>
        <FeatureFlagsProvider featureFlags={featureFlags}>
          <APIProvider
            api={buildAPI(
              {
                fetchPlanConfiguration: () =>
                  Promise.resolve({
                    absoluteIssueLimit: 10000,
                    projectLimit: PROJECT_LIMIT,
                    defaultAbsoluteIssueLimit: 5000,
                    defaultHierarchyIssueLimit: 2000,
                    defaultProjectLimit: 100,
                  }),
                fetchPlanBasicInfo: (planId: PlanBasicInfo['id']) =>
                  responseAfter()<PlanBasicInfo>({
                    ...existingPlanBasicInfo,
                    issueSources: issueSources.slice(0, 4),
                  }),
              },
              0,
            )}
          >
            <ProjectOverLimitPage
              planId={existingPlan.id || 1}
              renderLoadingSpinner={() => <div>loading...</div>}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

export const SetExclusionRulesSettingPage = () => (
  <Vr waitFor="set-exclusion-rules-settings-page">
    <Wrapper>
      <IntlProvider>
        <FeatureFlagsProvider featureFlags={featureFlags}>
          <APIProvider api={buildAPI()}>
            <SetExclusionRulesSettingsPage
              planId={existingPlan.id || 1}
              issueSources={existingPlan.issueSources}
              excludeDays={existingPlan.excludeDays}
              onChange={async (plan) => {
                action('onChange')(plan);
              }}
              renderLoadingSpinner={() => <div>loading...</div>}
              renderHeader={(header) => <h3>{header}</h3>}
            />
          </APIProvider>
        </FeatureFlagsProvider>
      </IntlProvider>
    </Wrapper>
  </Vr>
);

const FeatureFlagVR = () => {
  const { _getVrTest } = useFeatureFlags();
  if (!_getVrTest) {
    return <pre>_getVrTest is not a function</pre>;
  }
  return <pre>{_getVrTest() ? 'ff: on' : 'ff: off'}</pre>;
};

export const FeatureFlagOn = () => (
  <FeatureFlagsProvider featureFlags={featureFlags}>
    <FeatureFlagVR />
  </FeatureFlagsProvider>
);

export const FeatureFlagOff = () => (
  <FeatureFlagsProvider
    featureFlags={{ ...featureFlags, _getVrTest: () => false }}
  >
    <FeatureFlagVR />
  </FeatureFlagsProvider>
);
