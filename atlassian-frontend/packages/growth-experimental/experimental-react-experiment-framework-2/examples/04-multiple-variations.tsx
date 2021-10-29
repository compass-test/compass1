import React from 'react';
import { useExperiment } from '../src/core';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';

const flagKey = 'product.slack-integration';

export const InviteScreen: React.FC<{}> = (props) => {
  const slackExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(
      'product.slack-integration',
      [
        'not-enrolled' as const,
        'control' as const,
        'invite-urls-only' as const,
        'slack-only' as const,
        'slack-and-invite-urls' as const,
      ],
      'not-enrolled',
    ),
    usePluginAutoExposureEvent(),
  );

  return (
    <Wrapper propsPreview={props}>
      <h3>
        Cohort result:
        <code>{slackExperiment.cohort}</code>
      </h3>
    </Wrapper>
  );
};

export default () => {
  return (
    <ExampleHostSandbox flagKey={flagKey}>
      {() => <InviteScreen />}
    </ExampleHostSandbox>
  );
};
