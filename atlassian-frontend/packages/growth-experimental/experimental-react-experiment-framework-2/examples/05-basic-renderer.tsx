import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';
import { usePluginRenderer } from '../src/portable/renderer';
import { allCohorts } from './_support/cohorts';

type Props = {};

const flagKey = 'product.invite-experiment';

export const Toolbar: React.FC<Props> = (props) => {
  const inviteExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginRenderer((pipeline) =>
      pipeline.cohort === 'experiment' ? (
        <Button
          appearance="primary"
          onClick={() =>
            pipeline.analytics.sendUIEvent({
              actionSubjectId: 'inviteButton',
              actionSubject: 'button',
              action: 'clicked',
            })
          }
        >
          Invite
        </Button>
      ) : null,
    ),
    usePluginAutoExposureEvent(),
  );

  return (
    <Wrapper
      propsPreview={{ props, '[[const]] inviteExperiment': inviteExperiment }}
    >
      <ButtonGroup>
        <Button>Home</Button>
        <Button>Recent</Button>
        <Button>Spaces</Button>
        {inviteExperiment.render()}
      </ButtonGroup>
    </Wrapper>
  );
};

export default () => (
  <ExampleHostSandbox flagKey={flagKey}>{() => <Toolbar />}</ExampleHostSandbox>
);
