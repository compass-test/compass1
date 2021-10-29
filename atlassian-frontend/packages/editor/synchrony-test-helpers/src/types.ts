import {
  CollabEditProvider,
  CollabParticipant,
} from '@atlaskit/editor-common/collab';

export type ParticipantData = Pick<CollabParticipant, 'name' | 'avatar'> & {
  sid: string;
};

export interface CollabProviderOptions {
  url: string;
  jwt: () => string;
  entityId: string;
  batchUpdates?: boolean;
  worker?: Worker;
}

export interface CollabProviderFeatureFlags {
  fastDelta: boolean;
  telepointers: boolean;
  useAsync: boolean;
  verboseLogging: boolean;
  diffOptimisation: 'off' | 'batched' | 'webworker';
}

export interface CollabProfile {
  avatar: string;
  name: string;
  lastActive: string;
  sessionId: string;
}

export interface SynchronyUser {
  joinedAt: number;
  origin: string;
}

export interface CollabProvider extends CollabEditProvider {
  new (
    options: CollabProviderOptions,
    getProfile: (user: SynchronyUser) => Omit<ParticipantData, 'sid'>,
    features?: Partial<CollabProviderFeatureFlags>,
  ): CollabEditProvider;
}

export interface CollabProviderModule {
  Provider: CollabProvider;
}
export interface CLJSModule {
  default: {
    create_development_token: (
      url: string,
      permission: string,
      duration: number,
    ) => string;
  };
}
