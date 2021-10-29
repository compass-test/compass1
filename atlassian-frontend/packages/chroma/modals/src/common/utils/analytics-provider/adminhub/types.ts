// Analytics event data format expected by the Admin Hub's analytics web client

export interface AdminHubUIEvent {
  data: AdminHubUIData;
  dataPortalLink?: string;
}

export interface AdminHubScreenEvent {
  data: AdminHubScreenData;
  dataPortalLink?: string;
}

export interface AdminHubTrackEvent {
  data: AdminHubTrackData;
  dataPortalLink?: string;
}

export interface AdminHubOperationalEvent {
  data: AdminHubOperationalData;
  dataPortalLink?: string | string[];
}

export type AdminHubUIData = Readonly<{
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  source: string;
  attributes?: Record<string, any>;
  tags?: object;
}>;

export type AdminHubScreenData = Readonly<{
  name: string;
  attributes?: Record<string, any>;
  tags?: object;
}>;

export type AdminHubTrackData = Readonly<{
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  source: string;
  attributes?: Record<string, any>;
  tags?: object;
}>;

export type AdminHubOperationalData = Readonly<{
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  source: string;
  attributes?: Record<string, any>;
  tags?: object;
}>;
