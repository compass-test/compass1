import { PublishedApp } from './published-app';
import { APP_KEY, PUBLISHED_APP_METADATA } from './published-app-metadata';

export const PUBLISHED_APPS: PublishedApp[] = PUBLISHED_APP_METADATA.map(
  (metadata) => new PublishedApp(metadata),
);

export function getPublishedApp(key: APP_KEY): PublishedApp {
  const app = PUBLISHED_APPS.find((app) => app.key === key);

  if (!app) {
    throw new AppDoesNotExistError(key);
  }

  return app;
}

export function getPublishedAppByAri(ari: string) {
  return PUBLISHED_APPS.find((app) => app.ari === ari);
}

class AppDoesNotExistError extends Error {
  constructor(appKey: APP_KEY) {
    super(`No published app found for app key ${appKey}`);
  }
}
