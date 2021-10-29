import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';
import { usePluginExtend } from '../src/portable/extend';
import { allCohorts } from './_support/cohorts';
import { usePluginLanguage } from './_support/mock-product/language';

type Props = {
  counter: number;
};

const flagKey = 'product.invite-experiment';

export const Toolbar: React.FC<Props> = (props) => {
  // This tests the maximum number of plugins our TypeScript types support in one pipeline:
  const inviteExperiment = useExperiment(
    usePluginLanguage(),
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginAutoExposureEvent(),
    usePluginExtend(() => ({
      plugin5: 5,
    })),
    usePluginExtend((pipeline) => ({
      plugin6: pipeline.plugin5 + 1,
    })),

    usePluginExtend((pipeline) => ({
      plugin7: pipeline.plugin6 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin8: pipeline.plugin7 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin9: pipeline.plugin8 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin10: pipeline.plugin9 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin11: pipeline.plugin10 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin12: pipeline.plugin11 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin13: pipeline.plugin12 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin14: pipeline.plugin13 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin15: pipeline.plugin14 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin16: pipeline.plugin15 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin17: pipeline.plugin16 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin18: pipeline.plugin17 + 1,
    })),
    usePluginExtend((pipeline) => ({
      plugin19: pipeline.plugin18 + 1,
    })),
    usePluginExtend((pipeline) => ({
      pluginCount: pipeline.plugin19 + 1,
    })),
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
      <div>
        <p>Number of plugins supported: {inviteExperiment.pluginCount}</p>
        <small>Counter: {props.counter}</small>
      </div>
    </Wrapper>
  );
};

export default () => (
  <ExampleHostSandbox flagKey={flagKey}>
    {({ counter }) => <Toolbar counter={counter} />}
  </ExampleHostSandbox>
);
