import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import {
  CompassMutationError,
  DeleteComponentAnnouncementHandledErrors,
} from '@atlassian/dragonfruit-graphql';

import { ANALYTICS_PACKAGE_NAME } from '../../../../../../../../constants';

import { useAnnouncementDeleteMutationFlags } from './flags';
import messages from './messages';

export const useAnnouncementDeleteErrorHandler = () => {
  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();
  const {
    showAnnouncementDeleteErrorFlag,
    showAnnouncementDeleteSuccessFlag,
    showGenericAnnouncementDeleteErrorFlag,
  } = useAnnouncementDeleteMutationFlags();

  const handleAnnouncementDeleteError = (
    error: any,
    onSuccess?: () => void, // to be invoked if error is treated as a mutation success
  ) => {
    if (error instanceof CompassMutationError) {
      const errorType = error.getFirstErrorType();

      switch (errorType) {
        case DeleteComponentAnnouncementHandledErrors.COMPONENT_NOT_FOUND:
          return showAnnouncementDeleteErrorFlag(
            messages.componentNotFoundErrorDescription,
          );
        case DeleteComponentAnnouncementHandledErrors.ANNOUNCEMENT_NOT_FOUND:
          // If announcement not found, it means it had already been deleted,
          // so we should treat it as a successful delete for idempotency.
          showAnnouncementDeleteSuccessFlag();

          return onSuccess?.();
        default:
          fireCompassMutationErrorAnalytics({
            error,
            componentName: 'ComponentAnnouncementDeleteModal',
            packageName: ANALYTICS_PACKAGE_NAME,
          });
          return showGenericAnnouncementDeleteErrorFlag();
      }
    } else {
      showGenericAnnouncementDeleteErrorFlag();
      fireCompassMutationErrorAnalytics({
        error,
        componentName: 'ComponentAnnouncementDeleteModal',
        packageName: ANALYTICS_PACKAGE_NAME,
      });
    }
  };

  return { handleAnnouncementDeleteError };
};
