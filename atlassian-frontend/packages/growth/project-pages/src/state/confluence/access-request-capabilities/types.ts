// https://stash.atlassian.com/projects/IPS/repos/id-invitations-service/browse/src/main/java/com/atlassian/identity/invitations/model/access/AccessRequestCapability.java
export enum AccessRequestCapabilityType {
  // only the ones we care about, if we get anything else, treat it as ERROR
  DIRECT_ACCESS = 'DIRECT_ACCESS',
  REQUEST_ACCESS = 'REQUEST_ACCESS',
  ACCESS_EXISTS = 'ACCESS_EXISTS',
  PENDING_REQUEST_EXISTS = 'PENDING_REQUEST_EXISTS',
  DENIED_REQUEST_EXISTS = 'DENIED_REQUEST_EXISTS',
  APPROVED_REQUEST_EXISTS = 'APPROVED_REQUEST_EXISTS',
  ERROR = 'ERROR',
}

export interface AccessRequestCapabilityResponse {
  userAccessLevel: 'INTERNAL' | 'EXTERNAL' | 'INTERNAL_INACTIVE'; // we shouldn't have to deal with anything but INTERNAL since the user is on Jira
  verificationStatus: 'REQUIRED' | 'NOT_REQUIRED'; // again we should not have to deal with this (as the user is logged into Jira)
  results: Record<string, AccessRequestCapabilityType>;
}

export interface AccessRequestCapabilitiesState {
  capability: AccessRequestCapabilityType;
  loaded: boolean;
}
