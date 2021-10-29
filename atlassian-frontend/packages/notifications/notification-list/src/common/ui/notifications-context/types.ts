import {
  LoadingState,
  MarkRequestReadState,
  NotificationTimeGroup,
  RenderableNotification,
  RequestCategory,
  RequestReadState,
} from '../../types';

export type NotificationsStoreState = {
  userId?: string;
  notifications: NotificationTimeGroup[];
  canLoadMore: boolean;
  fetchState: LoadingState;
  fetchData: () => void;
  isMarkAllAsReadVisible: boolean;
  markBulkNotifications: (
    notifications: RenderableNotification[],
    toState: MarkRequestReadState,
  ) => void;
  markAllNotificationsRead: () => void;
  readStateFilter: RequestReadState;
  requestCategory: RequestCategory;
  toggleReadStateFilter: () => void;
};
