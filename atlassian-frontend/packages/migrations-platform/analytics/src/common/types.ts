export type AnySourceScreen = string;

// Context
export type MigrationContext<S extends AnySourceScreen = AnySourceScreen> = {
  source: S; // source screen
};

// Payload
type AnyMigrationPayload = {
  eventType: 'SCREEN' | 'TRACK' | 'UI';
};

type AnyMigrationEvent = {
  timestamp: number;
};

// Screen
export interface ScreenPayload extends AnyMigrationPayload {
  eventType: 'SCREEN';
}

export interface ScreenEvent<S extends AnySourceScreen = AnySourceScreen>
  extends AnyMigrationEvent,
    ScreenPayload {
  name: S; // source screen
}

// Track
export interface TrackPayload extends AnyMigrationPayload {
  eventType: 'TRACK';
  action: 'started' | 'stopped';
  actionSubject: 'plan';
  actionSubjectId: string;
}

export interface TrackEvent<S extends AnySourceScreen = AnySourceScreen>
  extends AnyMigrationEvent,
    TrackPayload {
  source: S;
}

// UI
export interface UIPayload extends AnyMigrationPayload {
  eventType: 'UI';
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  attributes?: Record<string, string | number | boolean | undefined>;
  container?: { containerId: string; containerType: 'plan' };
}

/** @deprecated Legacy MPKit UI payload, please use the newer `UIPayload` type */
export type LegacyUIPayload = {
  action: string;
  id: string;
  subject: string;
  attributes?: Record<string, string | number | boolean | undefined>;
};

export interface UIEvent<S extends AnySourceScreen = AnySourceScreen>
  extends AnyMigrationEvent,
    UIPayload {
  source: S;
}

export type AllMigrationPayload = ScreenPayload | TrackPayload | UIPayload;
