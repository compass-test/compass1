import {
  LoadingState,
  RequestCategory,
  RequestReadState,
} from '../../../../common/types';
import { RenderableNotification } from '../../types';

/**
 * Takes a list of notifications and returns a list of notifications
 * matching the current filters in the notification list
 */
export default function getFilteredNotifications(
  notifications: RenderableNotification[],
  readStateFilter: RequestReadState,
  categoryFilter: RequestCategory,
) {
  return notifications.filter((notification) => {
    const readStateMatcher =
      readStateFilter === RequestReadState.ANY ||
      (readStateFilter === RequestReadState.UNREAD &&
        notification.readState === RequestReadState.UNREAD);
    const categoryMatcher =
      categoryFilter === RequestCategory.ANY ||
      (categoryFilter === RequestCategory.NONE &&
        notification.category === undefined) ||
      (categoryFilter === RequestCategory.DIRECT &&
        notification.category === RequestCategory.DIRECT);

    return (
      readStateMatcher &&
      categoryMatcher &&
      notification.loadingState === LoadingState.COMPLETE
    );
  });
}
