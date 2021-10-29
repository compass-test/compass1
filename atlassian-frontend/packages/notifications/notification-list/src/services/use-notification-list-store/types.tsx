import {
  LoadingState,
  Notification,
  RequestCategory,
  RequestReadState,
} from '../../common/types';

export interface NotificationsState {
  notifications: RenderableNotification[];
  continuationToken?: string;
  error?: Error;
}

export interface RenderableNotification extends Notification {
  loadingState: LoadingState;
}

export interface NotificationListFilter {
  readStateFilter: RequestReadState;
  categoryFilter: RequestCategory;
}

export interface LoadingStates {
  withoutContent: LoadingState;
  withContent: LoadingState;
}
