export enum ENTITY_TYPE {
  CONTAINER = 'CONTAINER',
  USER = 'USER',
}

export enum CONTAINER_TYPE {
  JIRA_PROJECT = 'jiraProject',
  CONFLUENCE_SPACE = 'confluenceSpace',
}

export interface CollaborationGraphContainerDetails {
  id: string;
  key: string;
  name: string;
  url: string;
  iconUrl: string;
}

export interface CollaborationGraphEntity {
  entityType: ENTITY_TYPE;
  containerType?: CONTAINER_TYPE;
  id: string;
  score: number;
  containerDetails?: CollaborationGraphContainerDetails;
  userProfile?: CollaborationGraphUserProfile;
}

export interface CollaborationGraphUserProfile {
  email: string;
  name: string;
  picture: string;
  nickname: string;
  account_id: string;
  account_type: string;
  account_status: string;
  locale: string;
  extended_profile?: { key?: string };
}

export interface CollaborationGraphResponse {
  collaborationGraphEntities?: CollaborationGraphEntity[];
}
