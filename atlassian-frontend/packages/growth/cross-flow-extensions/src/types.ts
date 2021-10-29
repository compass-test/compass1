export enum Editions {
  FREE = 'free',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  ESSENTIALS = 'essentials',
  ENTERPRISE = 'enterprise',
}

export type AdminHubExtensionsOptions = {
  edition?: string;
  migrationSourceUuid?: string;
};

export type StartExtensionsOptions = {
  edition?: string;
  migrationSourceUuid?: string;
};
