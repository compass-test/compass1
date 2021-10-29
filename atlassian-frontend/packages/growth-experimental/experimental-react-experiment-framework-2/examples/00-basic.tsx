import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';
import { usePluginResolver } from '../src/portable/resolver';
import { usePluginExtend } from '../src/portable/extend';
import { usePluginEnglishOnly } from '../src/portable/englishOnly';
import { allCohorts } from './_support/cohorts';
import { usePluginLanguage } from './_support/mock-product/language';

type Props = {
  counter: number;
};

const flagKey = 'product.invite-experiment';

export const Toolbar: React.FC<Props> = (props) => {
  const inviteExperiment = useExperiment(
    usePluginLanguage(),
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginExtend({ injectedFoo: 42 }),
    usePluginExtend((pipeline) => ({
      injectedBar: pipeline.injectedFoo / 2,
    })),
    usePluginResolver((pipeline) => {
      if (pipeline.injectedFoo !== 42 || pipeline.injectedBar !== 21) {
        return { ineligible: 'wrong magic numbers' };
      }
      return {
        cohort: pipeline.featureFlag.value,
      };
    }),
    usePluginEnglishOnly(),
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
      <div>
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
