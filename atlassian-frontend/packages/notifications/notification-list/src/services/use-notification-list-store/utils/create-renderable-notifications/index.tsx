import {
  LoadingState,
  Notification,
  RenderableNotification,
} from '../../../../common/types';
import { LoadingStates } from '../../types';

export default function createRenderableNotifications(
  loadingStates: LoadingStates,
  notifications: Notification[],
  contentNotifications: Notification[],
): RenderableNotification[] {
  const withoutContentLoaded =
    loadingStates.withoutContent === LoadingState.COMPLETE;
  const withContentLoaded = loadingStates.withContent === LoadingState.COMPLETE;
  const withContentError = loadingStates.withContent === LoadingState.ERROR;

  // Content loaded
  if (withContentLoaded) {
    return convertToRenderableNotifications(
      contentNotifications,
      LoadingState.COMPLETE,
    );

    // Content errored but notifications loaded
  } else if (withContentError && withoutContentLoaded) {
    return convertToRenderableNotifications(notifications, LoadingState.ERROR);

    // Just notifications loaded (content still loading)
  } else if (withoutContentLoaded) {
    return convertToRenderableNotifications(
      notifications,
      LoadingState.LOADING,
    );
    // Fall through - could still be loading or both erroring.
  }
  return [];
}

export const convertToRenderableNotifications = (
  notifications: Notification[],
  loadingState: LoadingState,
): RenderableNotification[] => {
  return notifications.map((notif) => ({ ...notif, loadingState }));
};
