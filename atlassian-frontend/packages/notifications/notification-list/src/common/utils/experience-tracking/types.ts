export enum Experiences {
  RENDER_NOTIFICATIONS_WITHOUT_CONTENT = 'notification-list-render-notifications-without-content',
  RENDER_NOTIFICATIONS_WITH_CONTENT = 'notification-list-render-notifications-with-content',
  RENDER_NOTIFICATION_PAGE_WITH_CONTENT = 'notification-list-render-notification-page-with-content',
  RENDER_INDIVIDUAL_NOTIFICATION_WITH_CONTENT = 'notification-list-render-individual-notification-with-content',
}

export enum ExperienceIds {
  FIRST_LOAD = 'first-load',
}

export enum AbortReason {
  COMPONENT_UNMOUNTED = 'component-unmounted',
  CHANGE_FILTER = 'change-filter',
  NO_DOCUMENTS = 'no-adf-documents',
  CLIENT_ERROR = 'client-error',
}
