import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import { initialFilters } from '../../common/constants';
import {
  LoadingState,
  MarkRequestReadState,
  ReadState,
  RenderableNotification,
  RequestCategory,
  RequestReadState,
  ResponseError,
} from '../../common/types';
import { NotificationsStoreContext } from '../../common/ui/notifications-context';
import {
  triggerNotificationFilterViewed,
  triggerNotificationsAPICallFailed,
  triggerNotificationsAPICallSucceeded,
  useCreateFireAnalyticsFromTrigger,
} from '../../common/utils/analytics';
import {
  AbortReason,
  Experiences,
} from '../../common/utils/experience-tracking/types';
import { useMarkSeenService } from '../../services/use-mark-seen-service';
import { useNotificationListStore } from '../../services/use-notification-list-store';
import {
  loadReadStateFilterFromLocalStorage,
  saveReadStateFilterToLocalStorage,
} from '../../services/utils/local-storage-util';
import {
  markAllApiRoute,
  markAllNotificationsReadFetch,
} from '../../services/utils/mark-all-client';
import {
  markBulkApiRoute,
  markBulkNotificationsFetch,
} from '../../services/utils/mark-bulk-client';

import { toFilterIndex } from './utils';

export const useNotificationsController = () => {
  const {
    updateAnalyticsContext,
    updateState: updateNotificationsState,
    state: notificationsState,
  } = useContext(NotificationsStoreContext);
  const experienceTracker = useContext(ExperienceTrackerContext);

  // State
  const [requestCategory, setRequestCategory] = useState<RequestCategory>(
    initialFilters.categoryFilter,
  );
  const [readStateFilter, setReadStateFilter] = useState<RequestReadState>(
    loadReadStateFilterFromLocalStorage(),
  );
  // Used for screen event analytics - tracking previously seen filter combinations
  const seenCombinations = useRef<string[]>([]);

  const firstRender = useRef(true);

  const fireNotificationFilterViewed = useCreateFireAnalyticsFromTrigger(
    triggerNotificationFilterViewed,
  );
  const fireNotificationsAPICallSucceeded = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsAPICallSucceeded,
  );
  const fireNotificationsAPICallFailed = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsAPICallFailed,
  );

  const notificationListStores = {
    [toFilterIndex(
      RequestCategory.NONE,
      RequestReadState.ANY,
    )]: useNotificationListStore({
      categoryFilter: RequestCategory.NONE,
      readStateFilter: RequestReadState.ANY,
    }),
    [toFilterIndex(
      RequestCategory.NONE,
      RequestReadState.UNREAD,
    )]: useNotificationListStore({
      categoryFilter: RequestCategory.NONE,
      readStateFilter: RequestReadState.UNREAD,
    }),
    [toFilterIndex(
      RequestCategory.DIRECT,
      RequestReadState.ANY,
    )]: useNotificationListStore({
      categoryFilter: RequestCategory.DIRECT,
      readStateFilter: RequestReadState.ANY,
    }),
    [toFilterIndex(
      RequestCategory.DIRECT,
      RequestReadState.UNREAD,
    )]: useNotificationListStore({
      categoryFilter: RequestCategory.DIRECT,
      readStateFilter: RequestReadState.UNREAD,
    }),
  };

  const isfirstFilterView = (
    requestCategory: RequestCategory,
    requestReadState: RequestReadState,
  ): boolean => {
    const filterIndex = toFilterIndex(requestCategory, requestReadState);
    if (!seenCombinations.current.includes(filterIndex)) {
      seenCombinations.current = [
        ...seenCombinations.current,
        toFilterIndex(requestCategory, requestReadState),
      ];
      return true;
    } else {
      return false;
    }
  };

  // Effects and memoizations
  const readStateAnyIndex = useMemo(
    () => toFilterIndex(requestCategory, RequestReadState.ANY),
    [requestCategory],
  );
  const readStateUnreadIndex = useMemo(
    () => toFilterIndex(requestCategory, RequestReadState.UNREAD),
    [requestCategory],
  );

  // WARNING: Don't use these directly in effect dependency lists. They always update.
  const readStateAnyList = notificationListStores[readStateAnyIndex];
  const readStateUnreadList = notificationListStores[readStateUnreadIndex];
  const currentNotificationList =
    readStateFilter === RequestReadState.UNREAD
      ? readStateUnreadList
      : readStateAnyList;

  useMarkSeenService({
    firstRequestCompleted: currentNotificationList.canCallMarkSeen,
  });

  const currentNotificationListPrefillAndFetch =
    currentNotificationList.prefillAndFetchData;
  const currentNotificationListFetch = currentNotificationList.fetchData;
  // Initial fetching
  useEffect(() => {
    if (
      !currentNotificationListPrefillAndFetch ||
      !currentNotificationListFetch
    ) {
      return;
    }

    if (currentNotificationList.fetchState === LoadingState.INITIAL) {
      if (readStateFilter === RequestReadState.UNREAD) {
        currentNotificationListPrefillAndFetch(readStateAnyList.notifications);
      } else {
        currentNotificationListFetch();
      }
    }
  }, [
    currentNotificationList.fetchState,
    readStateAnyList.notifications,
    requestCategory,
    readStateFilter,
    currentNotificationListPrefillAndFetch,
    currentNotificationListFetch,
  ]);

  useEffect(() => {
    const firstFilterView = isfirstFilterView(requestCategory, readStateFilter);
    fireNotificationFilterViewed(firstRender.current, firstFilterView);
    firstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readStateFilter, requestCategory]);

  const isMarkAllAsReadVisible = useMemo(
    () =>
      currentNotificationList.notifications.some(
        (notification) => notification.readState === ReadState.UNREAD,
      ),
    [currentNotificationList],
  );

  const abortNotificationExperiences = useCallback(() => {
    experienceTracker.abort({
      name: Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT,
      reason: AbortReason.CHANGE_FILTER,
    });
    experienceTracker.abort({
      name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
      reason: AbortReason.CHANGE_FILTER,
    });
  }, [experienceTracker]);

  // Callbacks
  const toggleReadStateFilter = useCallback(() => {
    const newReadStateFilter = (() => {
      if (readStateFilter === RequestReadState.ANY) {
        saveReadStateFilterToLocalStorage(RequestReadState.UNREAD);
        return RequestReadState.UNREAD;
      } else {
        saveReadStateFilterToLocalStorage(RequestReadState.ANY);
        return RequestReadState.ANY;
      }
    })();
    abortNotificationExperiences();
    updateAnalyticsContext((prev) => ({
      ...prev,
      readStateFilter: newReadStateFilter,
    }));
    setReadStateFilter(newReadStateFilter);
  }, [readStateFilter, updateAnalyticsContext, abortNotificationExperiences]);

  const setCategoryFilter = useCallback(
    (requestCategory: RequestCategory) => {
      updateAnalyticsContext((prev) => ({
        ...prev,
        requestCategory,
      }));
      abortNotificationExperiences();
      setRequestCategory(requestCategory);
    },
    [abortNotificationExperiences, updateAnalyticsContext],
  );

  const readStateAnyMarkBulkNotifications =
    readStateAnyList.markBulkNotifications;
  const readStateUnreadMarkBulkNotifications =
    readStateUnreadList.markBulkNotifications;
  const disableUnreadNotificationListFetching =
    readStateUnreadList.disableListFetching;

  // As categories are independent - we only need to client side mock the different readStates for the current category
  const markLocalNotificationLists = useCallback(
    (
      notifications: RenderableNotification[],
      toState: MarkRequestReadState,
    ) => {
      readStateAnyMarkBulkNotifications(notifications, toState);
      readStateUnreadMarkBulkNotifications(notifications, toState);
    },
    [readStateAnyMarkBulkNotifications, readStateUnreadMarkBulkNotifications],
  );

  const markBulkNotifications = useCallback(
    (
      notifications: RenderableNotification[],
      toState: MarkRequestReadState,
    ) => {
      markBulkNotificationsFetch(
        notifications.map((notif) => notif.id),
        toState,
      )
        .then((_) => fireNotificationsAPICallSucceeded(markBulkApiRoute))
        .catch((e: ResponseError) =>
          fireNotificationsAPICallFailed(markBulkApiRoute, e.code),
        );
      markLocalNotificationLists(notifications, toState);
    },
    [
      fireNotificationsAPICallSucceeded,
      fireNotificationsAPICallFailed,
      markLocalNotificationLists,
    ],
  );
  const markAllNotificationsRead = useCallback(() => {
    const notificationsToMark = currentNotificationList.notifications.filter(
      (notification) => notification.readState === ReadState.UNREAD,
    );
    if (notificationsToMark.length > 0) {
      markAllNotificationsReadFetch(
        requestCategory === RequestCategory.DIRECT,
        notificationsToMark[0].id,
      )
        .then((_) => fireNotificationsAPICallSucceeded(markAllApiRoute))
        .catch((e: ResponseError) =>
          fireNotificationsAPICallFailed(markAllApiRoute, e.code),
        );

      disableUnreadNotificationListFetching();
      markLocalNotificationLists(
        notificationsToMark,
        MarkRequestReadState.READ,
      );
    }
  }, [
    currentNotificationList.notifications,
    fireNotificationsAPICallSucceeded,
    fireNotificationsAPICallFailed,
    requestCategory,
    markLocalNotificationLists,
    disableUnreadNotificationListFetching,
  ]);

  useEffect(() => {
    updateNotificationsState((previousState) => ({
      ...previousState,
      notifications: currentNotificationList.groupedNotifications,
      canLoadMore: currentNotificationList.canLoadMore,
      fetchState: currentNotificationList.fetchState,
      fetchData: currentNotificationList.fetchData,
      isMarkAllAsReadVisible,
      markBulkNotifications,
      markAllNotificationsRead,
      readStateFilter,
      requestCategory,
      toggleReadStateFilter,
    }));
  }, [
    currentNotificationList.groupedNotifications,
    currentNotificationList.canLoadMore,
    currentNotificationList.fetchState,
    currentNotificationList.fetchData,
    updateNotificationsState,
    isMarkAllAsReadVisible,
    markBulkNotifications,
    markAllNotificationsRead,
    readStateFilter,
    requestCategory,
    toggleReadStateFilter,
  ]);

  return {
    filter: {
      requestCategory: notificationsState.requestCategory,
      readStateFilter: notificationsState.readStateFilter,
    },
    toggleReadStateFilter,
    setCategoryFilter,
  };
};
