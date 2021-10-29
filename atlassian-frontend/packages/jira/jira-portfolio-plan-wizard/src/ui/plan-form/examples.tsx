import React from 'react';

import { fireEvent } from '@testing-library/react';

import {
  buildAPI,
  featureFlags,
  StoryMetadata,
  TeamPicker,
} from '../../common/mocks';
import Scenario from '../../common/utils/scenario';
import { withIntl, withMaxWidth } from '../../common/utils/storybook';
import { APIProvider } from '../../controllers/api';
import { ComponentsProvider } from '../../controllers/components';
import { FeatureFlagsProvider } from '../../controllers/feature-flags';
import { PlanProvider } from '../../controllers/plan';
import { PlanMetaProvider } from '../../controllers/plan-meta';

import PlanForm from './index';

export const basic = () => (
  <APIProvider api={buildAPI()}>
    <PlanProvider>
      <PlanMetaProvider>
        <PlanForm />
      </PlanMetaProvider>
    </PlanProvider>
  </APIProvider>
);

export const planFormWithCancelButton = () => (
  <APIProvider api={buildAPI()}>
    <PlanProvider>
      <PlanMetaProvider>
        <PlanForm
          showExitButton={{
            shouldDisplay: true,
            onClicked: () => {},
          }}
        />
      </PlanMetaProvider>
    </PlanProvider>
  </APIProvider>
);

export const planNameTooLong = () => (
  <Scenario
    act={async ({ getByTestId }) => {
      const planNameField = getByTestId('name') as HTMLInputElement;
      const exceededName = Array(256).fill('-').join('');

      fireEvent.change(planNameField, { target: { value: exceededName } });
      fireEvent.blur(planNameField);
    }}
  >
    {basic()}
  </Scenario>
);

export const noIssueSource = () => (
  <Scenario
    act={async ({ getByTestId }) => {
      const planNameField = getByTestId('name') as HTMLInputElement;
      const submitButton = getByTestId('submit') as HTMLElement;

      fireEvent.change(planNameField, { target: { value: 'Awesome' } });
      fireEvent.click(submitButton);
    }}
  >
    {basic()}
  </Scenario>
);

export default {
  title: 'Plan form',
  decorators: [
    (storyFn) => (
      <FeatureFlagsProvider featureFlags={featureFlags}>
        <ComponentsProvider teamPicker={TeamPicker}>
          {storyFn()}
        </ComponentsProvider>
      </FeatureFlagsProvider>
    ),
    withIntl,
    withMaxWidth(),
  ],
} as StoryMetadata;
