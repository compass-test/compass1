import { Site } from '../common-types';

export interface CollaborationGraphConfig {
  collaborationGraphUrl: string;
}

export interface CollaborationGraphClientConfig
  extends CollaborationGraphConfig {
  isMultiSite: boolean;
  cloudId: string;
  sites: Site[];
}
