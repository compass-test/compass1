import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import {
  LoadingState,
  MarkRequestReadState,
  RenderableNotification,
  ReadState as RenderableReadState,
  RequestCategory,
  RequestReadState,
  ResponseError,
} from '../../common/types';
import { useInboxClient } from '../use-inbox-client';
import { RequestExpand } from '../utils/inbox-client/types';

import { NotificationsState } from './types';
import calculateContinuationToken from './utils/calculate-continuation-token';
import createRenderableNotifications from './utils/create-renderable-notifications';
import getFilteredNotifications from './utils/get-filtered-notifications';
import handleExperienceFailures from './utils/handle-experience-failures';
import markBulkNotificationsUtil from './utils/mark-bulk-notifications';
import mergePaginatedNotifications from './utils/merge-paginated-notifications';
import resolveLoadingStates from './utils/resolve-loading-states';
import timeGroupNotifications from './utils/time-group-notifications';

type InboxMergeServiceState = NotificationsState & {
  fetchState: LoadingState;
  fetchingDisabled: boolean;
};

export const useNotificationListStore = ({
  categoryFilter,
  readStateFilter,
}: {
  categoryFilter: RequestCategory;
  readStateFilter: RequestReadState;
}) => {
  const experienceTracker = useContext(ExperienceTrackerContext);

  const [state, setState] = useState<InboxMergeServiceState>({
    fetchState: LoadingState.INITIAL,
    notifications: [],
    continuationToken: undefined,
    error: undefined,
    fetchingDisabled: false,
  });
  const [limit, setLimit] = useState(8);

  // Used to stop double fetch calls caused by hook state delays.
  const currentlyFetching = useRef(false);

  const {
    loadingState: withoutContentLoadingState,
    error: withoutContentError,
    data: withoutContentData,
    fetchData: notificationsFetch,
  } = useInboxClient({
    categoryFilter,
    readStateFilter,
    expand: RequestExpand.NONE,
  });

  const {
    loadingState: withContentLoadingState,
    error: withContentError,
    data: withContentData,
    fetchData: contentFetch,
    lastCallTimestamp,
  } = useInboxClient({
    categoryFilter,
    readStateFilter,
    expand: RequestExpand.CONTENT,
  });

  useEffect(() => {
    setState((previousState) => {
      const loadingStates = {
        withoutContent: withoutContentLoadingState,
        withContent: withContentLoadingState,
      };

      const fetchState = resolveLoadingStates(
        loadingStates,
        previousState.fetchState,
      );

      const continuationToken = calculateContinuationToken(
        loadingStates,
        withoutContentData.continuationToken,
        withContentData.continuationToken,
      );

      const renderableNotifications = createRenderableNotifications(
        loadingStates,
        withoutContentData.notifications,
        withContentData.notifications,
      );

      const paginatedNotifications = mergePaginatedNotifications(
        previousState.notifications,
        renderableNotifications,
      );

      if (fetchState === LoadingState.COMPLETE) {
        currentlyFetching.current = false;
      }

      if (previousState.fetchingDisabled) {
        return previousState;
      }

      return {
        ...previousState,
        continuationToken: continuationToken,
        notifications: paginatedNotifications,
        fetchState,
      };
    });
  }, [
    withoutContentLoadingState,
    withoutContentError,
    withoutContentData,
    withContentLoadingState,
    withContentError,
    withContentData,
  ]);

  useEffect(() => {
    const limit = state.notifications.length === 0 ? 8 : 16;
    setLimit(limit);
  }, [state.notifications]);

  const fetchData = useCallback(() => {
    if (!currentlyFetching.current) {
      currentlyFetching.current = true;
      notificationsFetch(state.continuationToken, limit);
      contentFetch(state.continuationToken, limit);
    }
  }, [state.continuationToken, notificationsFetch, limit, contentFetch]);

  useEffect(() => {
    const loadingStates = {
      withoutContent: withoutContentLoadingState,
      withContent: withContentLoadingState,
    };
    handleExperienceFailures(
      experienceTracker,
      loadingStates,
      withoutContentError as ResponseError,
      withContentError as ResponseError,
    );
  }, [
    experienceTracker,
    withContentError,
    withContentLoadingState,
    withoutContentError,
    withoutContentLoadingState,
  ]);

  const prefillAndFetchData = useCallback(
    (notifications: RenderableNotification[]) => {
      const filteredNotifications = getFilteredNotifications(
        notifications,
        readStateFilter,
        categoryFilter,
      );

      const continuationToken =
        filteredNotifications.length > 0
          ? filteredNotifications[filteredNotifications.length - 1].id
          : undefined;

      setState((previousState) => ({
        ...previousState,
        notifications: filteredNotifications,
        continuationToken,
      }));

      if (!currentlyFetching.current) {
        currentlyFetching.current = true;
        notificationsFetch(continuationToken, limit);
        contentFetch(continuationToken, limit);
      }
    },
    [categoryFilter, readStateFilter, contentFetch, notificationsFetch, limit],
  );

  const markBulkNotifications = useCallback(
    (
      notifications: RenderableNotification[],
      toState: MarkRequestReadState,
    ) => {
      setState((previousState) => {
        const markedNotifications = markBulkNotificationsUtil(
          previousState.notifications,
          notifications,
          toState,
          readStateFilter,
        );

        return {
          ...previousState,
          notifications: markedNotifications,
        };
      });
    },
    [readStateFilter, setState],
  );

  const disableListFetching = useCallback(() => {
    setState((previousState) => ({
      ...previousState,
      continuationToken: undefined,
      fetchState: LoadingState.COMPLETE,
      fetchingDisabled: true,
    }));
  }, []);

  const processedNotifications = useMemo(() => {
    let notifications = state.notifications;
    if (readStateFilter === RequestReadState.UNREAD) {
      notifications = state.notifications.filter(
        (notification) => notification.readState === RenderableReadState.UNREAD,
      );
    }

    const groupedNotifications = timeGroupNotifications(notifications);
    return {
      notifications,
      groupedNotifications,
    };
  }, [state.notifications, readStateFilter]);

  return {
    canLoadMore:
      state.fetchState === LoadingState.COMPLETE && !!state.continuationToken,
    notifications: processedNotifications.notifications,
    groupedNotifications: processedNotifications.groupedNotifications,
    fetchState: state.fetchState,
    error: withContentError || withoutContentError,
    loading: state.fetchState === LoadingState.LOADING,
    canCallMarkSeen:
      state.fetchState === LoadingState.COMPLETE ||
      withoutContentLoadingState === LoadingState.COMPLETE,
    lastCallTimestamp,
    prefillAndFetchData,
    fetchData,
    markBulkNotifications,
    disableListFetching,
  };
};
