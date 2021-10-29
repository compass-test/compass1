import React, { FunctionComponent } from 'react';

import { fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { buildAPI, featureFlags, projects } from '../../common/mocks';
import { existingPlan } from '../../common/mocks/plan';
import { API, Plan } from '../../common/types';
import { IntlHookProvider } from '../../common/utils/intl';
import Scenario from '../../common/utils/scenario';
import { APIProvider } from '../../controllers/api';
import { FeatureFlagsProvider } from '../../controllers/feature-flags';
import { FormProvider } from '../../controllers/form';
import { IssueCountProvider } from '../../controllers/issue-count';
import { IssueTypesProvider } from '../../controllers/issue-types';
import { OverLimitProvider } from '../../controllers/over-limit';
import { PlanProvider } from '../../controllers/plan';
import { PlanMetaProvider } from '../../controllers/plan-meta';
import { ProjectsAndReleasesProvider } from '../../controllers/projects-and-releases';
import { StatusTypesProvider } from '../../controllers/status-types';

import RefineIssuesForm, { SetExclusionRules } from './index';

const StoryContainer = styled.div`
  width: 600px;
  height: 100vh;
`;

const ProviderStack: FunctionComponent<{
  initialPlan?: Plan;
  api: API;
}> = ({ children, initialPlan, api }) => (
  <FeatureFlagsProvider featureFlags={featureFlags}>
    <APIProvider api={api}>
      <PlanProvider initialPlan={initialPlan}>
        <ProjectsAndReleasesProvider>
          <IssueTypesProvider>
            <StatusTypesProvider>
              <PlanMetaProvider>
                <IssueCountProvider>
                  <OverLimitProvider>
                    <FormProvider>
                      <IntlProvider>
                        <IntlHookProvider>
                          <StoryContainer>{children}</StoryContainer>
                        </IntlHookProvider>
                      </IntlProvider>
                    </FormProvider>
                  </OverLimitProvider>
                </IssueCountProvider>
              </PlanMetaProvider>
            </StatusTypesProvider>
          </IssueTypesProvider>
        </ProjectsAndReleasesProvider>
      </PlanProvider>
    </APIProvider>
  </FeatureFlagsProvider>
);

export const basic = ({
  initialPlan = existingPlan,
  api = buildAPI(undefined),
}: {
  initialPlan?: Plan;
  api?: API;
} = {}) => (
  <ProviderStack initialPlan={initialPlan} api={api}>
    <RefineIssuesForm />
  </ProviderStack>
);

export const noExclusions = () =>
  basic({
    api: buildAPI({
      fetchProjectsAndReleasesByIssueSources: () =>
        Promise.resolve({ projects: [], releases: [] }),
    }),
  });

export const oneExclusion = () =>
  basic({
    api: buildAPI({
      fetchProjectsAndReleasesByIssueSources: () =>
        Promise.resolve({
          projects: projects,
          releases: [
            {
              id: '1',
              projectId: 3,
              userStartDate: '10/May/2020',
              userEndDate: '20/Dec/2020',
              released: true,
              name: 'Version 1',
            },
          ],
        }),
    }),
  });

export const exclusonDaysIncorrect = () => (
  <Scenario
    act={async ({ getByTestId }) => {
      const field = getByTestId('exclude-days') as HTMLInputElement;
      fireEvent.change(field, { target: { value: 'apple' } });
    }}
  >
    {basic()}
  </Scenario>
);

export const excludeSomeType = () => (
  <Scenario
    act={async ({ getByTestId }) => {
      const field = getByTestId('exclude-issue-type') as HTMLInputElement;
      fireEvent.click(field);
    }}
  >
    {basic()}
  </Scenario>
);

export const exclusionIssueSources = () => (
  <ProviderStack
    initialPlan={existingPlan}
    api={buildAPI({
      fetchProjectsAndReleasesByIssueSources: () =>
        Promise.resolve({
          projects: projects,
          releases: [
            {
              id: '1',
              projectId: 3,
              userStartDate: '10/May/2020',
              userEndDate: '20/Dec/2020',
              released: true,
              name: 'Version 1',
            },
          ],
        }),
    })}
  >
    <SetExclusionRules
      planId={existingPlan.id || 1}
      excludeDays={existingPlan.excludeDays}
      issueSources={existingPlan.issueSources}
    />
  </ProviderStack>
);

export const oneArchivedReleaseExcluded = () =>
  basic({
    initialPlan: { ...existingPlan, excludedVersions: ['10006'] },
    api: buildAPI({
      fetchProjectsAndReleasesByIssueSources: () =>
        Promise.resolve({
          projects: projects,
          releases: [
            {
              id: '10006',
              projectId: 3,
              userStartDate: '10/May/2020',
              userEndDate: '20/Dec/2020',
              released: false,
              name: 'Version 1',
              archived: true,
            },
          ],
        }),
    }),
  });

export const oneReleaseExcluded = () =>
  basic({
    initialPlan: { ...existingPlan, excludedVersions: ['10007'] },
    api: buildAPI({
      fetchProjectsAndReleasesByIssueSources: () =>
        Promise.resolve({
          projects: projects,
          releases: [
            {
              id: '10007',
              projectId: 3,
              userStartDate: '10/May/2020',
              userEndDate: '20/Dec/2020',
              released: false,
              name: 'Version 1',
            },
          ],
        }),
    }),
  });
