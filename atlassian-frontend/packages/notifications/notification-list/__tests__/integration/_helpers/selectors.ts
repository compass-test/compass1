export const selectors = {
  notificationListRoot: "[data-testid='notification-list']",
  notificationListItemSkeleton: "[data-testid='notification-item-skeleton']",
  notificationListItem: "[data-testid='notification-item-container']",
  notificationListEntityLink: "[data-testid='notification-item-entity-link']",
  notificationListItemContent:
    "[data-testid='notifaction-item__expandable-document']",
  loadEndReached: "[data-testid='no-more-to-load']",
  loadMoreWaypoint: "[data-testid='load-more-waypoint']",
  noNotificationsToShow: "[data-testid='no-more-notifications']",
  tabList: "[role='tablist']",
  readStateToggleButton: "button[data-testid='read-state-indicator']",
  readStateUnreadIndicator: "[data-testid='unread-indicator']",
  filterReadStateToggleLabel: "label[for='mark-as-read-toggle']",
  filterReadStateDataCheckedTrue: 'label[data-checked="true"]',
};
