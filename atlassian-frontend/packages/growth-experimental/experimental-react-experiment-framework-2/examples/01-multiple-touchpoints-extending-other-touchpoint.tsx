import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import { usePluginExtend } from '../src/portable/extend';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';
import { allCohorts } from './_support/cohorts';

type Props = {
  counter: number;
};

const flagKey = 'product.invite-experiment';

// Can pass props in here if needed
export const useInviteExperiment = () =>
  useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
  );

const useInviteExperimentMainTouchpoint = () =>
  useExperiment(
    usePluginExtend(useInviteExperiment()),
    usePluginAutoExposureEvent(),
  );

const ProductComponent: React.FC<Props> = (props) => (
  <Wrapper propsPreview={props}>
    <Toolbar counter={props.counter} />
    <Main />
    <div>
      <small>Counter: {props.counter}</small>
    </div>
  </Wrapper>
);

export const Toolbar: React.FC<Props> = (props) => {
  const inviteExperiment = useInviteExperiment();
  const handleInviteClick = () => {
    inviteExperiment.analytics.sendUIEvent({
      actionSubjectId: 'inviteButton',
      actionSubject: 'button',
      action: 'clicked',
    });
  };
  return (
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
  );
};

const Main: React.FC<{}> = () => {
  const inviteExperiment = useInviteExperimentMainTouchpoint();

  return (
    <div>
      {inviteExperiment.cohort === 'experiment' ? (
        <p>You can press buttons and invite people here!</p>
      ) : (
        <p>You can press some buttons here!</p>
      )}
    </div>
  );
};

export default () => (
  <ExampleHostSandbox flagKey={flagKey}>
    {({ counter }) => <ProductComponent counter={counter} />}
  </ExampleHostSandbox>
);
