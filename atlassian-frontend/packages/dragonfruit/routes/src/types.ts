/**
 * A "Route" in this context is simply a function that returns the path.
 */
export type Route = () => string;

export type Routes = Record<string, Route>;

export enum ComponentListTypeUrlParam {
  APPLICATIONS = 'applications',
  LIBRARIES = 'libraries',
  SERVICES = 'services',
  OTHER = 'other',
}

export enum ComponentDetailPageUrlParam {
  DEPENDENCIES = 'dependencies',
  ANNOUNCEMENTS = 'announcements',
  SETTINGS = 'settings',
  JIRA = 'jira',
  ACTIVITY = 'activity',
}
