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
import { allCohorts } from './_support/cohorts';

type Props = {
  eventType: 'operational' | 'track';
  excludeNotEnrolled: boolean;
};

const flagKey = 'product.invite-experiment';

export const Toolbar: React.FC<Props> = (props) => {
  const { eventType, excludeNotEnrolled } = props;

  const inviteExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(flagKey, allCohorts, 'not-enrolled'),
    usePluginAutoExposureEvent({
      eventType,
      payload: {
        actionSubjectId: 'myExperiment',
      },
      excludeNotEnrolled,
    }),
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

export default () => {
  const [eventType, setEventType] = React.useState<'operational' | 'track'>(
    'operational',
  );
  const [excludeNotEnrolled, setExcludeNotEnrolled] = React.useState<boolean>(
    false,
  );

  const getAlternative = () =>
    eventType === 'track' ? 'operational' : 'track';

  return (
    <ExampleHostSandbox
      flagKey={flagKey}
      additionalControls={
        <>
          <Field>
            <LabelText>
              Exposure Event Type: <code>{eventType.toString()}</code>
            </LabelText>
            <Button
              onClick={() => {
                setEventType(getAlternative());
              }}
            >
              Switch to {getAlternative()} Exposure Event
            </Button>
          </Field>
          <Field>
            <LabelText>
              Fire event for not-enrolled:{' '}
              <code>{(!excludeNotEnrolled).toString()}</code>
            </LabelText>
            <Button
              onClick={() => {
                setExcludeNotEnrolled(!excludeNotEnrolled);
              }}
            >
              Set to {excludeNotEnrolled.toString()}
            </Button>
          </Field>
        </>
      }
    >
      {() => (
        <Toolbar
          eventType={eventType}
          excludeNotEnrolled={excludeNotEnrolled}
        />
      )}
    </ExampleHostSandbox>
  );
};
