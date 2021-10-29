import { defineMessages } from 'react-intl';

const messages = defineMessages({
  direct: {
    defaultMessage: 'Direct',
    description: 'The direct label',
    id: 'fabric.notificationList.direct',
  },
  watching: {
    defaultMessage: 'Watching',
    description: 'The watching label',
    id: 'fabric.notificationList.watching',
  },
  title: {
    description: 'The title of the notification list component.',
    defaultMessage: 'Notifications',
    id: 'fabric.notificationList.title',
  },
  unread: {
    description: 'The message next to the unread toggle.',
    defaultMessage: 'Only show unread',
    id: 'fabric.notificationList.unread',
  },
  upToDateDescription: {
    defaultMessage: "That's all your notifications from the last 30 days.",
    description: 'Shown when there are no more notifications',
    id: 'fabric.notificationList.upToDate.description',
  },
  readAllNotifications: {
    defaultMessage:
      "That's all your <strong>unread</strong> notifications from the last 30 days.",
    description: 'Shown when there are no more unread notifications',
    id: 'fabric.notificationList.readAllNotifications.description',
  },
  markAllAsRead: {
    defaultMessage: 'Mark all as read',
    description: 'Mark all as read',
    id: 'fabric.notificationList.markAllAsRead',
  },
  onlyShowUnread: {
    defaultMessage: 'Only show unread',
    description: 'Only show unread',
    id: 'fabric.notificationList.onlyShowUnread',
  },
  notifications: {
    defaultMessage: 'Notifications',
    description: 'The notifications title',
    id: 'fabric.notificationList.notifications',
  },
  markNotificationAsRead: {
    defaultMessage: 'Mark as read',
    description: 'Shown to a user when they can mark a notification as read',
    id: 'fabric.notificationList.markNotificationAsRead',
  },
  markNotificationAsUnread: {
    defaultMessage: 'Mark as unread',
    description: 'Shown to a user when they can mark a notification as unread',
    id: 'fabric.notificationList.markNotificationAsUnread',
  },
  timeGroupingToday: {
    defaultMessage: 'Today',
    description: 'Shown above notifications recieved today',
    id: 'fabric.notificationList.timeGroupingToday',
  },
  timeGroupingYesterday: {
    defaultMessage: 'Yesterday',
    description: 'Shown above notifications recieved yesterday',
    id: 'fabric.notificationList.timeGroupingYesterday',
  },
  timeGroupingOlder: {
    defaultMessage: 'Older',
    description: 'Shown above notifications recieved older than yesterday',
    id: 'fabric.notificationList.timeGroupingOlder',
  },
  timeGroupingLatest: {
    defaultMessage: 'Latest',
    description:
      'Shown above notifications when only notifications older than 2 days exist',
    id: 'fabric.notificationList.timeGroupingLatest',
  },
  contentLoadFailure: {
    defaultMessage: 'Unable to load',
    description:
      'Shown when an error occurs trying to load content for a notification',
    id: 'fabric.notificationList.contentLoadFailure',
  },
  notificationsLoadingErrorTitle: {
    defaultMessage: 'Something went wrong',
    description: 'Shown when we are unable to load a group of notifications',
    id: 'fabric.notificationList.notificationsLoadingErrorTitle',
  },
  notificationsLoadingErrorDescription: {
    defaultMessage:
      'We can’t load any more notifications right now, please try again later',
    description:
      'Subtext shown when we are unable to load a group of notifications',
    id: 'fabric.notificationList.notificationsLoadingErrorDescription',
  },
  noNotificationsLoadingDescription: {
    defaultMessage: 'You have no notifications from the last 30 days.',
    description: 'Subtext shown when a user has no notifications',
    id: 'fabric.notificationList.noNotificationsLoadingDescription',
  },
  globalErrorBoundaryDescription: {
    defaultMessage:
      'We keep track of these errors, but feel free to contact us if refreshing doesn’t fix things.',
    description:
      'Shown when there is a error that prevents the experience from loading.',
    id: 'fabric.notificationList.globalErrorBoundaryDescription',
  },
  allyListDescription: {
    defaultMessage: 'Your notifications sorted by most recent',
    description:
      'Accessibility text for screen readers indicated the content is a list of sorted notifications',
    id: 'fabric.notificationList.allyListDescription',
  },
  noUnreadNotifications: {
    defaultMessage:
      "You've <strong>read</strong> all your notifications from the last 30 days.",
    description: 'Title text shown when a user has no unread notifications',
    id: 'fabric.notificationList.noUnreadNotifications',
  },
  changeBoardingTitle: {
    defaultMessage: "Stay focused on what's important",
    description: 'The title text of the changeboarding banner',
    id: 'fabric.notificationList.changeBoardingTitle',
  },
  changeBoardingBodyText: {
    defaultMessage:
      "To help you stay organized, you can now hide notifications that you've already read. Filter notifications by selecting <strong>Only show unread</strong> to keep up to date with the latest activity.",
    description: 'The main body text of the changeboarding banner',
    id: 'fabric.notificationList.changeBoardingBodyText',
  },
  changeBoardingLearnMore: {
    defaultMessage: 'Learn more',
    description: 'A link to learn more about the new notifications',
    id: 'fabric.notificationList.changeBoardingLearnMore',
  },
  changeBoardingAcknowledge: {
    defaultMessage: 'OK',
    description: 'Text of the button to dismiss the changeboarding banner',
    id: 'fabric.notificationList.changeBoardingAcknowledge',
  },
  shortcutsHeaderText: {
    defaultMessage: 'Keyboard shortcuts',
    description:
      'Header text for a guide to keyboard shortcuts in notifications',
    id: 'fabric.notificationList.shortcutsHeaderText',
  },
  nextNotificationShortcut: {
    defaultMessage: 'Next notification',
    description:
      'Describes shortcut that user can press the ArrowDown key to go to the next notification',
    id: 'fabric.notificationList.nextNotificationShortcut',
  },
  previousNotificationShortcut: {
    defaultMessage: 'Previous notification',
    description:
      'Describes shortcut that user can press the ArrowUp key to go to the previous notification',
    id: 'fabric.notificationList.previousNotificationShortcu',
  },
  expandNotificationShortcut: {
    defaultMessage: 'Expand notification',
    description:
      'Describes shortcut that user can press the "e" key to expand the notification',
    id: 'fabric.notificationList.expandNotificationShortcut',
  },
  toggleReadNotificationShortcut: {
    defaultMessage: 'Change read state',
    description:
      'Describes shortcut that user can press the "r" key to expand the notification',
    id: 'fabric.notificationList.toggleReadNotificationShortcut',
  },
  lastNotificationShortcut: {
    defaultMessage: 'Last notification',
    description:
      'Describes shortcut that user can press "Shift" + "ArrowDown" key to go to the last notification',
    id: 'fabric.notificationList.lastNotificationShortcut',
  },
  firstNotificationShortcut: {
    defaultMessage: 'First notification',
    description:
      'Describes shortcut that user can press "Shift" + "ArrowUp" key to go to the first notification',
    id: 'fabric.notificationList.firstNotificationShortcut',
  },
});

export default messages;
