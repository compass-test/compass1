import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';

import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';
import { usePluginResolver } from '../src/portable/resolver';
import { allCohorts } from './_support/cohorts';
import {
  useHandlerUnenroll,
  usePluginAddErrorHandler,
} from '../src/portable/errorHandler';

type Props = {
  shouldThrow: boolean;
};

const flagKey = 'product.invite-experiment';

export const Toolbar: React.FC<Props> = (props) => {
  const inviteExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginAddErrorHandler(
      useHandlerUnenroll({ ineligibilityReason: 'errorOccurred' }),
    ),
    usePluginResolver((pipeline) => {
      if (props.shouldThrow) {
        throw new Error('errorOccurred');
      }

      return {
        cohort: pipeline.featureFlag.value,
        ineligibilityReasons: [],
      };
    }),
    usePluginAutoExposureEvent(),
  );

  const handleInviteClick = () => {
    inviteExperiment.analytics.sendUIEvent({
      actionSubjectId: 'inviteButton',
      actionSubject: 'button',
      action: 'clicked',
    });
  };

  return (
    <Wrapper
      propsPreview={{ props, '[[const]] inviteExperiment': inviteExperiment }}
    >
      <ButtonGroup>
        <Button>Home</Button>
        <Button>Recent</Button>
        <Button>Spaces</Button>
        {inviteExperiment.cohort === 'experiment' && (
          <Button appearance="primary" onClick={handleInviteClick}>
            Invite
          </Button>
        )}
      </ButtonGroup>
    </Wrapper>
  );
};

export default () => (
  <ExampleHostSandbox flagKey={flagKey}>
    {({ shouldThrow }) => <Toolbar shouldThrow={shouldThrow} />}
  </ExampleHostSandbox>
);
