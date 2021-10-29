export interface ReferenceDataStatusItem {
  id: string;
  name?: string;
}

export interface ReferenceDataTypeItem {
  id: string;
  name: string;
  iconUrl?: string;
}

export interface ReferenceDataIssueTypeItem extends ReferenceDataTypeItem {
  statuses: string[];
  subtask: boolean;
}

export interface ReferenceDataRequestTypeItem extends ReferenceDataTypeItem {
  issueTypeId: string;
}

export interface ReferenceData {
  statuses: ReferenceDataStatusItem[];
  issueTypes: ReferenceDataIssueTypeItem[];
  requestTypes: ReferenceDataRequestTypeItem[];
}
