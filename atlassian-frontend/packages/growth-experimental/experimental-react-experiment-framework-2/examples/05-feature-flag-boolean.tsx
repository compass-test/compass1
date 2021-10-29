import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginBooleanFeatureFlag } from './_support/mock-product/booleanFeatureFlag';
import ExampleHostSandbox, { Wrapper } from './_support/ExampleHostSandbox';

const flagKey = 'feature.boolean';

export const ExperimentComponent: React.FC<{}> = (props) => {
  const experiment = useExperiment(
    usePluginAnalytics(),
    usePluginBooleanFeatureFlag(
      flagKey,
      {
        trueCohort: 'variation',
        falseCohort: 'control',
      },
      false,
    ),
  );

  const handleInviteClick = () => {
    experiment.analytics.sendUIEvent({
      actionSubjectId: 'inviteButton',
      actionSubject: 'button',
      action: 'clicked',
    });
  };

  return (
    <Wrapper propsPreview={{ props, '[[const]] experiment': experiment }}>
      <ButtonGroup>
        {experiment.cohort === 'variation' && (
          <Button appearance="danger" onClick={handleInviteClick}>
            This is variation component
          </Button>
        )}
        {experiment.cohort === 'control' && (
          <Button appearance="warning" onClick={handleInviteClick}>
            This is control component
          </Button>
        )}
      </ButtonGroup>
    </Wrapper>
  );
};

export default () => (
  <ExampleHostSandbox flagKey={flagKey}>
    {() => <ExperimentComponent />}
  </ExampleHostSandbox>
);
