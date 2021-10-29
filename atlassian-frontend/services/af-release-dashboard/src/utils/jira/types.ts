import { ReleaseEntity } from '../../db/entities/Release';

export interface FabDodgemTicket {
  releaseName: string;
  summary: string;
  key: string;
  id: string;
}

export interface ReleaseChange {
  fieldName: keyof ReleaseEntity;
  value: any; // Value has been checked by createReleaseChange helper function
}

export interface JiraIssue {
  key: string;
  id: string;
  fields: {
    [key: string]: string;
    summary: string;
  };
}

export interface JiraIssueChangelogItem {
  field: string;
  fieldtype: string;
  fieldId: string;
  from: string | null;
  fromString: string | null;
  to: string | null;
  toString: string | null;
}

export interface JiraIssueChangelog {
  id: string;
  created?: string; // Webhooks changelog does not include created
  items: JiraIssueChangelogItem[];
}

export interface GetJiraIssueResponse {
  issues: JiraIssue[];
}

export interface GetJiraIssueChangelogs {
  values: JiraIssueChangelog[];
}
