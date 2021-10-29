import { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { LoadingState, ResponseError } from '../../../../common/types';
import { SloFailureReason } from '../../../../common/utils/analytics/types';
import {
  AbortReason,
  Experiences,
} from '../../../../common/utils/experience-tracking/types';
import { LoadingStates } from '../../types';

const isServerFailure = (statusCode: number) =>
  statusCode >= 500 && statusCode <= 599;

export default function handleExperienceFailures(
  experienceTracker: ExperienceTrackerAPI,
  loadingStates: LoadingStates,
  withoutContentError: ResponseError,
  withContentError: ResponseError,
) {
  if (loadingStates.withContent === LoadingState.ERROR) {
    const withContentErrorCode = withContentError.code || undefined;

    if (withContentErrorCode && isServerFailure(withContentErrorCode)) {
      experienceTracker.fail({
        name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
        error: new Error(SloFailureReason.FETCH_FAILED),
        attributes: {
          ...(withContentErrorCode && { statusCode: withContentErrorCode }),
        },
      });
    } else {
      experienceTracker.abort({
        name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
        reason: AbortReason.CLIENT_ERROR,
        attributes: {
          ...(withContentErrorCode && { statusCode: withContentErrorCode }),
        },
      });
    }

    if (loadingStates.withoutContent === LoadingState.ERROR) {
      const withoutContentErrorCode = withoutContentError.code || undefined;

      if (withoutContentErrorCode && isServerFailure(withoutContentErrorCode)) {
        experienceTracker.fail({
          name: Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT,
          error: new Error(SloFailureReason.FETCH_FAILED),
          attributes: {
            ...(withoutContentErrorCode && {
              statusCode: withoutContentErrorCode,
            }),
          },
        });
      } else {
        experienceTracker.abort({
          name: Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT,
          reason: AbortReason.CLIENT_ERROR,
          attributes: {
            ...(withoutContentErrorCode && {
              statusCode: withoutContentErrorCode,
            }),
          },
        });
      }
    }
  }
}
