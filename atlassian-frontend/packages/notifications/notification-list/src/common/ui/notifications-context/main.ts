import React, { createContext } from 'react';

import {
  AnalyticsContext,
  LoadingState,
  MarkRequestReadState,
  RenderableNotification,
  RequestCategory,
  RequestReadState,
} from '../../types';

import type { NotificationsStoreState } from './types';

export type NotificationsStoreContext = {
  state: NotificationsStoreState;
  updateState: React.Dispatch<React.SetStateAction<NotificationsStoreState>>;
  // Prefer this to React.RefObject because "current" should never be null in our implementation
  // Official Typescript always allows "null"
  analyticsContext: { readonly current: AnalyticsContext };
  updateAnalyticsContext: (
    fn: (prevContext: AnalyticsContext) => AnalyticsContext,
  ) => void;
  intlLocale: { readonly current: string };
  updateIntlLocale: (intlLocale: string) => void;
};

export const NotificationsStoreContext = createContext<
  NotificationsStoreContext
>({
  state: {
    notifications: [],
    fetchState: LoadingState.INITIAL,
    canLoadMore: false,
    fetchData: () => {},
    markBulkNotifications: (
      _: RenderableNotification[],
      __: MarkRequestReadState,
    ) => {},
    isMarkAllAsReadVisible: false,
    markAllNotificationsRead: () => {},
    readStateFilter: RequestReadState.ANY,
    requestCategory: RequestCategory.DIRECT,
    toggleReadStateFilter: () => {},
  },
  updateState: () => {},
  analyticsContext: {
    current: {
      product: 'unset',
      requestCategory: RequestCategory.DIRECT,
      readStateFilter: RequestReadState.ANY,
    },
  },
  updateAnalyticsContext: () => {},
  intlLocale: {
    current: 'en-US',
  },
  updateIntlLocale: () => {},
});
