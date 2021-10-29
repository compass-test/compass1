export {
  SUBSCRIBE_ALL,
  UFOGlobalEventStreamEventType,
} from '@atlassian/ufo-experimental/types';

export type {
  CustomData,
  UFOGlobalEventStreamExperiencePayload,
  UFOGlobalEventStreamEvent,
  UFOGlobalEventStreamSubscribe,
  SubscribeCallback,
  UFOGlobalEventStreamUnsubscribe,
  ExperienceMetrics,
  ExperienceData,
  PageLoadExperienceData,
} from '@atlassian/ufo-experimental/types';

export enum TenantType {
  RealUser = 'real-user',
  Synthetic = 'synthetic',
}

export type AppConfig = {
  framework?: { name: string; version: string };
  version: { web: string; ssr?: string };
};
