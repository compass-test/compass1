import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import {
  CompassMutationError,
  UpdateComponentAnnouncementHandledErrors,
} from '@atlassian/dragonfruit-graphql';

import { ANALYTICS_PACKAGE_NAME } from '../../../../../../../../../constants';

import { useAnnouncementUpdateMutationFlags } from './flags';
import messages from './messages';

export const useAnnouncementUpdateErrorHandler = () => {
  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();
  const {
    showAnnouncementUpdateErrorFlag,
    showGenericAnnouncementUpdateErrorFlag,
  } = useAnnouncementUpdateMutationFlags();

  const handleAnnouncementUpdateError = (error: any) => {
    if (error instanceof CompassMutationError) {
      const errorType = error.getFirstErrorType();

      switch (errorType) {
        case UpdateComponentAnnouncementHandledErrors.COMPONENT_NOT_FOUND:
          return showAnnouncementUpdateErrorFlag(
            messages.componentNotFoundErrorDescription,
          );
        case UpdateComponentAnnouncementHandledErrors.ANNOUNCEMENT_NOT_FOUND:
          return showAnnouncementUpdateErrorFlag(
            messages.announcementNotFoundErrorDescription,
          );
        default:
          fireCompassMutationErrorAnalytics({
            error,
            componentName: 'ComponentAnnouncementUpdateModal',
            packageName: ANALYTICS_PACKAGE_NAME,
          });
          return showGenericAnnouncementUpdateErrorFlag();
      }
    } else {
      showGenericAnnouncementUpdateErrorFlag();
      fireCompassMutationErrorAnalytics({
        error,
        componentName: 'ComponentAnnouncementUpdateModal',
        packageName: ANALYTICS_PACKAGE_NAME,
      });
    }
  };

  return { handleAnnouncementUpdateError };
};
