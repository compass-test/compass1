import { collectAll } from '@atlassian/experience-tracker';
import { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { NotificationResponse } from '../../common/types';
import { generateNotificationContentRenderExperienceName } from '../../common/utils/experience-tracking';
import {
  AbortReason,
  ExperienceIds,
  Experiences,
} from '../../common/utils/experience-tracking/types';

export const handleWithContentExperienceTracking = (
  response: NotificationResponse,
  experienceTracker: ExperienceTrackerAPI,
) => {
  if (
    !response.notifications.some(
      (notification) => notification.content.body?.items?.length,
    )
  ) {
    experienceTracker.abort({
      name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
      reason: AbortReason.NO_DOCUMENTS,
    });
    return;
  }

  const contentExperienceNames = response.notifications
    .filter((notification) => notification.content.body?.items?.length)
    .map((notification) =>
      generateNotificationContentRenderExperienceName(notification),
    );

  // Create global experience to track each individual notification withContent
  experienceTracker.start({
    name: Experiences.RENDER_NOTIFICATION_PAGE_WITH_CONTENT,
    id: ExperienceIds.FIRST_LOAD,
    collect: collectAll(contentExperienceNames),
  });

  // Create each individual notification withContent experience
  contentExperienceNames.forEach((contentExperience) =>
    experienceTracker.start({
      name: contentExperience,
      id: contentExperience,
    }),
  );
};
