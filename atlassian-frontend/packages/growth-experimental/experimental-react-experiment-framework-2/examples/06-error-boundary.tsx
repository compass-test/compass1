import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';

import { useExperiment } from '../src/core';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import ExampleHostSandbox, {
  Field,
  LabelText,
  Wrapper,
} from './_support/ExampleHostSandbox';
import { usePluginRenderer, ErrorBoundary } from '../src/portable/renderer';
import { allCohorts } from './_support/cohorts';

type Props = {
  showFallback: boolean;
  shouldThrow: boolean;
};

const flagKey = 'product.invite-experiment';

const ExperimentComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Experiment Component Failed!');
  }
  return <Button appearance="primary">Invite</Button>;
};

export const Toolbar: React.FC<Props> = (props) => {
  const { shouldThrow, showFallback } = props;

  const inviteExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginRenderer((pipeline) =>
      pipeline.cohort === 'experiment' ? (
        <ErrorBoundary
          onError={(error) => {
            pipeline.analytics.sendOperationalEvent({
              actionSubjectId: 'useRenderer',
              actionSubject: 'experiment',
              action: 'error',
              attributes: { error: error.message },
            });
          }}
          fallbackComponent={showFallback ? <Button>Fallback</Button> : null}
          key={`${shouldThrow}`}
        >
          <ExperimentComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
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

export default () => {
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <ExampleHostSandbox
      flagKey={flagKey}
      additionalControls={
        <Field>
          <LabelText>
            Show Fallback: <code>{showFallback.toString()}</code>
          </LabelText>
          <Button
            onClick={() => {
              setShowFallback(!showFallback);
            }}
          >
            Toggle Fallback Button
          </Button>
        </Field>
      }
    >
      {({ shouldThrow }) => (
        <Toolbar shouldThrow={shouldThrow} showFallback={showFallback} />
      )}
    </ExampleHostSandbox>
  );
};
