import React from 'react';

import { ExperimentCore, ExperimentLoading } from '../core/types';
import { ExperimentAnalytics, AnalyticsEventType } from '../abstract/analytics';
import { ExperimentFeatureFlag } from '../abstract/featureFlag';
import { ExperimentResolution } from './resolver';
import {
  UnmetEnrollmentRequirements,
  isUnmetEnrollmentRequirements,
} from '../helpers/markEnrollmentRequirements';
import { isNotEnrolled } from '../helpers/markNotEnrolled';

type RequiredUpstream = ExperimentCore &
  Partial<ExperimentLoading> &
  ExperimentAnalytics &
  ExperimentResolution &
  ExperimentFeatureFlag<string | boolean> &
  Partial<UnmetEnrollmentRequirements>;

type EventPayloadFunc<EventPayload, Upstream> = (
  pipeline: Upstream,
) => EventPayload;

interface ExposureEventOptions<
  EventPayload extends Partial<AnalyticsEventType>,
  Upstream extends RequiredUpstream
> {
  eventType?: 'operational' | 'track';
  excludeNotEnrolled?: boolean;
  payload?: EventPayload | EventPayloadFunc<EventPayload, Upstream>;
}

export const usePluginAutoExposureEvent = <
  EventPayload extends Partial<AnalyticsEventType>,
  Upstream extends RequiredUpstream
>(
  options?: ExposureEventOptions<EventPayload, Upstream>,
) =>
  function useAutoExposureEvent(pipeline: Upstream) {
    const previousCohort = React.useRef<string | null>(null);
    const enrollmentRequirementsNotMet = isUnmetEnrollmentRequirements(
      pipeline,
    );
    const { eventType, payload, excludeNotEnrolled } = options || {
      eventType: 'operational',
      excludeNotEnrolled: false,
    };

    const eventPayload =
      typeof payload === 'function' ? payload(pipeline) : payload;

    const fireEvent =
      eventType === 'track'
        ? pipeline.analytics.sendTrackEvent
        : pipeline.analytics.sendOperationalEvent;

    const {
      name: flagKey,
      value: flagValue,
      ...otherFlagAttributes
    } = pipeline.featureFlag;

    React.useEffect(() => {
      // do nothing if the pipeline doesn't match enrollment requirements
      if (
        enrollmentRequirementsNotMet ||
        pipeline.loading ||
        (excludeNotEnrolled && isNotEnrolled(pipeline))
      ) {
        return;
      }

      // The format of this event should follow:
      // https://hello.atlassian.net/wiki/spaces/MEASURE/pages/361020395/3.+Exposure+tracking
      fireEvent({
        action: 'exposed',
        actionSubject: 'feature',
        ...eventPayload,
        attributes: {
          flagKey,
          value: flagValue, // value of the flag from launch darkly
          cohort: pipeline.cohort, // actual value user is cohorted as
          // inform us of cases where an experiment flips from
          // one cohort into another
          ...(previousCohort.current && {
            previousCohort: previousCohort.current,
          }),
          ineligibilityReasons: pipeline.ineligibilityReasons,
          // this should allow for other values sent over by launch darkly
          // such as reason and ruleId to get attached to the event
          ...otherFlagAttributes,
          ...(eventPayload && eventPayload.attributes),
        },
      });
      // TODO see if we can remove any's
      (previousCohort as any).current = pipeline.cohort;

      // We should NOT include .analytics here as it's not guaranteed
      // to be the same reference, and we don't want to keep firing
      // the exposure event
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      pipeline.cohort,
      pipeline.loading,
      enrollmentRequirementsNotMet,
      excludeNotEnrolled,
    ]);
    return pipeline;
  };
