import React from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import Select from '@atlaskit/select/Select';
import Spinner from '@atlaskit/spinner';

import { useExperiment } from '../src/core';
import { allCohorts } from './_support/cohorts';
import ExampleHostSandbox, {
  Field,
  LabelText,
  Wrapper,
} from './_support/ExampleHostSandbox';
import { usePluginAnalytics } from './_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from './_support/mock-product/multivariateFeatureFlag';
import { usePluginAutoExposureEvent } from '../src/portable/autoExposureEvent';
import { usePluginResolver } from '../src/portable/resolver';
import { usePluginExtend } from '../src/portable/extend';
import { usePluginAsyncExtendCallback } from '../src/portable/asyncExtendCallback';
import { usePluginAsyncExtendOnce } from '../src/portable/asyncExtendOnce';
import { ExperimentAnalytics } from '../src/abstract/analytics';

type Props = {
  counter: number;
  dynamicEndpointResponse: string;
};
const flagKey = 'product.invite-experiment';

// XXX TODO: should we have a separate type for the actual analytics interface?
type Analytics = ExperimentAnalytics['analytics'];

const fetchMock = async <Data,>(
  mockResponse: Data,
  analytics: Analytics,
  {
    actionSubjectId,
    delay = 1000,
  }: { actionSubjectId?: string; delay?: number } = {},
): Promise<Data> => {
  analytics.sendOperationalEvent({
    actionSubject: 'data',
    action: 'requested',
  });
  await new Promise((resolve) => setTimeout(resolve, delay));
  analytics.sendOperationalEvent({
    actionSubjectId,
    actionSubject: 'data',
    action: 'fetched',
    attributes: {
      data: mockResponse,
    },
  });
  return mockResponse;
};

const fetchIndependentData = (analytics: Analytics) =>
  fetchMock({ independentData: 1 }, analytics, {
    actionSubjectId: 'independent',
  });
const fetchImmediateData = (analytics: Analytics) =>
  fetchMock({ immediateData: 2 }, analytics, { actionSubjectId: 'immediate' });

const fetchCohortDependentData = (cohort: string, analytics: Analytics) =>
  fetchMock(
    {
      cohortMirroringData: {
        cohort,
      },
    },
    analytics,
    { actionSubjectId: 'cohortDependent' },
  );

const useInviteExperiment = ({
  dynamicEndpointResponse,
}: {
  dynamicEndpointResponse: string;
}) => {
  const initialPipeline = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(
      'product.invite-experiment',
      allCohorts,
      'not-enrolled',
    ),
    usePluginAsyncExtendOnce(
      async (pipeline) =>
        // Executed only once, when finished loading for the first time.
        // Safest bet for most cases.
        await fetchIndependentData(pipeline.analytics),
    ),
    usePluginAsyncExtendOnce(
      async (pipeline) =>
        // Executed once, immediately, even if pipeline is loading.
        await fetchImmediateData(pipeline.analytics),
      { runWhenLoading: true },
    ),
    usePluginResolver((pipeline) => {
      if (pipeline.independentData && pipeline.independentData < 0) {
        return { ineligible: 'wrong data fetched' };
      }
    }),
  );

  return useExperiment(
    usePluginExtend(initialPipeline),

    // This is how we can safely do data fetching that depends on the pipeline.
    //
    // By splitting the pipeline into two, we can safely use the first pipeline's
    // fields as useCallback() dependencies.
    // This ensures that the callback is not executed multiple times
    // unnecessarily, because usePluginAsyncExtend() guarantees that it will
    // not call the callback again as long as the callback maintains its identity.
    usePluginAsyncExtendCallback(
      React.useCallback(
        async () =>
          fetchCohortDependentData(
            initialPipeline.cohort!,
            initialPipeline.analytics,
          ),
        [initialPipeline.analytics, initialPipeline.cohort],
      ),
    ),

    usePluginAsyncExtendCallback(
      React.useCallback(
        async () => ({
          mockedDynamicData: await fetchMock(
            dynamicEndpointResponse,
            initialPipeline.analytics,
            { actionSubjectId: 'dynamicData' },
          ),
        }),
        [initialPipeline.analytics, dynamicEndpointResponse],
      ),
    ),

    usePluginResolver((pipeline) => {
      if (pipeline.mockedDynamicData === 'do-not-enroll') {
        return { ineligible: 'blocked-by-mock-endpoint' };
      }
      if (
        pipeline.immediateData &&
        pipeline.independentData &&
        pipeline.cohortMirroringData &&
        pipeline.cohortMirroringData.cohort
      ) {
        return {
          cohort: pipeline.cohortMirroringData.cohort,
        };
      }
    }),
    usePluginAutoExposureEvent(),
  );
};

export const Toolbar: React.FC<Props> = (props) => {
  const inviteExperiment = useInviteExperiment({
    dynamicEndpointResponse: props.dynamicEndpointResponse,
  });

  const handleInviteClick = () => {
    inviteExperiment.analytics.sendUIEvent({
      actionSubjectId: 'inviteButton',
      actionSubject: 'button',
      action: 'clicked',
    });
  };
  return (
    <Wrapper
      propsPreview={{
        props,
        '[[const]] inviteExperiment': inviteExperiment,
      }}
    >
      <ButtonGroup>
        <Button>Home</Button>
        <Button>Recent</Button>
        <Button>Spaces</Button>
        {inviteExperiment.loading ? (
          <Spinner />
        ) : (
          inviteExperiment.cohort === 'experiment' && (
            <Button appearance="primary" onClick={handleInviteClick}>
              Invite
            </Button>
          )
        )}
      </ButtonGroup>
      <div>
        <small>Counter: {props.counter}</small>
      </div>
    </Wrapper>
  );
};

export default () => {
  const [dynamicResponse, setDynamicResponse] = React.useState({
    label: "Don't enroll",
    value: 'do-not-enroll',
  });
  const changeDynamicEndpointResponse = React.useCallback(
    (event) => setDynamicResponse(event),
    [],
  );
  return (
    <ExampleHostSandbox
      flagKey={flagKey}
      additionalControls={
        <Field>
          <LabelText>Mock endpoint response</LabelText>
          <div style={{ width: '150px' }}>
            <Select
              value={dynamicResponse}
              options={[
                { label: 'OK to enroll', value: 'can-enroll' },
                { label: "Don't enroll", value: 'do-not-enroll' },
              ]}
              onChange={changeDynamicEndpointResponse}
            />
          </div>
        </Field>
      }
    >
      {({ counter }) => (
        <Toolbar
          counter={counter}
          dynamicEndpointResponse={dynamicResponse.value}
        />
      )}
    </ExampleHostSandbox>
  );
};
