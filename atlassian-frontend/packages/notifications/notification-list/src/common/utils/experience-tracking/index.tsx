import React, { Fragment, useContext, useEffect } from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';
import {
  ExperienceEvent,
  StopEvent,
} from '@atlassian/experience-tracker/ExperienceEvent';
import { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { Notification } from '../../types';
import {
  triggerNotificationsRenderAborted,
  triggerNotificationsRenderFailed,
  triggerNotificationsRenderSucceeded,
  useCreateFireAnalyticsFromTrigger,
} from '../analytics';
import { SloFailureReason } from '../analytics/types';
import PerformanceFacade from '../facade/performance';

import { AbortReason, ExperienceIds, Experiences } from './types';
import { getExperienceTimeout } from './utils';

type AnalyticsSuccessSloFunction = (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  noNotificationsScreen: boolean,
) => void;

type AnalyticsFailureSloFunction = (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  failureReason: SloFailureReason,
  extraAttributes: { [key: string]: any },
) => void;

type AnalyticsAbortedSloFunction = (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  failureReason: AbortReason,
  extraAttributes: { [key: string]: any },
) => void;

export const useNotificationsExperienceTracking = () => {
  const experienceTracker = useContext(ExperienceTrackerContext);

  const fireNotificationsRenderSucceeded = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsRenderSucceeded,
  );
  const fireNotificationsRenderFailed = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsRenderFailed,
  );
  const fireNotificationsRenderAborted = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsRenderAborted,
  );

  useEffect(() => {
    return () => {
      experienceTracker.abort({
        name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
        reason: AbortReason.COMPONENT_UNMOUNTED,
      });
      experienceTracker.abort({
        name: Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT,
        reason: AbortReason.COMPONENT_UNMOUNTED,
      });
      experienceTracker.abort({
        name: Experiences.RENDER_NOTIFICATION_PAGE_WITH_CONTENT,
        reason: AbortReason.COMPONENT_UNMOUNTED,
      });
    };
  }, [experienceTracker]);

  useEffect(() => {
    return setupExperienceTracking(
      experienceTracker,
      fireNotificationsRenderSucceeded,
      fireNotificationsRenderFailed,
      fireNotificationsRenderAborted,
    );
  }, [
    experienceTracker,
    fireNotificationsRenderSucceeded,
    fireNotificationsRenderFailed,
    fireNotificationsRenderAborted,
  ]);
};

const setupExperienceTracking = (
  experienceTracker: ExperienceTrackerAPI,
  fireNotificationsRenderSucceeded: AnalyticsSuccessSloFunction,
  fireNotificationsRenderFailed: AnalyticsFailureSloFunction,
  fireNotificationsRenderAborted: AnalyticsAbortedSloFunction,
) => {
  return experienceTracker.subscribe((event: ExperienceEvent) => {
    if (
      event.name === Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT ||
      event.name === Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT
    ) {
      const withContent =
        event.name === Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT;
      const firstLoad = event.id === ExperienceIds.FIRST_LOAD;
      let duration: number | undefined;

      const performance = new PerformanceFacade(window.performance);
      if (performance.isAvailable) {
        const renderStartPerformanceMarks = performance.getEntriesByName(
          'notification.list.render.start',
        );
        const nowMark = performance.now();

        if (nowMark && renderStartPerformanceMarks.length > 0) {
          duration =
            nowMark -
            renderStartPerformanceMarks[renderStartPerformanceMarks.length - 1]
              .startTime;
        }
      }

      const totalDuration = duration || (event as StopEvent).duration;

      if (event.action === 'taskSuccess') {
        const successAttributes = event.attributes as
          | { noNotificationsScreen: boolean }
          | undefined;
        fireNotificationsRenderSucceeded(
          firstLoad,
          withContent,
          totalDuration,
          successAttributes?.noNotificationsScreen || false,
        );
      } else if (event.action === 'taskFail') {
        fireNotificationsRenderFailed(
          firstLoad,
          withContent,
          totalDuration,
          event.error.message as SloFailureReason,
          event.attributes || {},
        );
      } else if (event.action === 'taskAbort') {
        if ((event.reason as AbortReason) === AbortReason.COMPONENT_UNMOUNTED) {
          const timeout = getExperienceTimeout(event.name as Experiences);
          if (totalDuration > timeout) {
            fireNotificationsRenderFailed(
              firstLoad,
              withContent,
              totalDuration,
              SloFailureReason.ABORT_TIMEOUT,
              event.attributes || {},
            );

            return;
          }
        }
        fireNotificationsRenderAborted(
          firstLoad,
          withContent,
          totalDuration,
          event.reason as AbortReason,
          event.attributes || {},
        );
      }
    }
  });
};

interface NotificationsExperienceTrackerProps {
  children: React.ReactElement;
}

const NotificationsExperienceTracker = ({
  children,
}: NotificationsExperienceTrackerProps) => {
  useNotificationsExperienceTracking();

  return <Fragment>{children}</Fragment>;
};

export default NotificationsExperienceTracker;

export const generateNotificationContentRenderExperienceName = (
  notification: Notification,
) =>
  Experiences.RENDER_INDIVIDUAL_NOTIFICATION_WITH_CONTENT +
  '/' +
  notification.id;
