import React, { FunctionComponent } from 'react';

import noop from 'lodash/fp/noop';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { Field } from '@atlaskit/form';

import {
  buildAPI,
  buildPlan,
  featureFlags,
  issueSources,
  projects,
  releases,
  StoryMetadata,
} from '../../../../common/mocks';
import { APIProvider } from '../../../../controllers/api';
import { FeatureFlagsProvider } from '../../../../controllers/feature-flags';
import { PlanProvider } from '../../../../controllers/plan';

import { FieldValue } from './types';

import ViewReleases from './index';

const StoryContainer = styled.div`
  max-width: 800px;
  height: 100vh;
`;

const ProviderStack: FunctionComponent<{}> = ({ children }) => {
  return (
    <FeatureFlagsProvider featureFlags={featureFlags}>
      <APIProvider api={buildAPI()}>
        <PlanProvider
          initialPlan={{
            id: null,
            name: '',
            permission: 'open',
            issueSources: issueSources,
            excludeDays: 30,
            excludedVersions: releases.slice(0, 5).map(({ id }) => id),
          }}
        >
          <IntlProvider>
            <StoryContainer>{children}</StoryContainer>
          </IntlProvider>
        </PlanProvider>
      </APIProvider>
    </FeatureFlagsProvider>
  );
};

export default {
  title: 'Refine Issues form',
  decorators: [(storyFn) => <ProviderStack>{storyFn()}</ProviderStack>],
} as StoryMetadata;

export const Basic = () => {
  const plan = buildPlan();
  return (
    <Field<FieldValue> name="excludeReleases">
      {({ fieldProps: { onChange } }) => (
        <ViewReleases
          onChange={onChange}
          allProjects={projects}
          allReleases={releases}
          loading={false}
          plan={plan}
          onClose={noop}
        />
      )}
    </Field>
  );
};

export const ControlledValues = () => {
  const plan = buildPlan();
  return (
    <Field<FieldValue> name="excludeReleases">
      {({ fieldProps: { onChange } }) => (
        <ViewReleases
          onChange={onChange}
          allProjects={projects}
          allReleases={releases}
          loading={false}
          plan={plan}
          onClose={noop}
          defaultValue={['1']}
        />
      )}
    </Field>
  );
};

export const NoReleases = () => {
  const plan = buildPlan();
  return (
    <Field<FieldValue> name="excludeReleases">
      {({ fieldProps: { onChange } }) => (
        <ViewReleases
          onChange={onChange}
          allProjects={projects}
          allReleases={[]}
          loading={false}
          plan={plan}
          onClose={noop}
          defaultValue={[]}
        />
      )}
    </Field>
  );
};
