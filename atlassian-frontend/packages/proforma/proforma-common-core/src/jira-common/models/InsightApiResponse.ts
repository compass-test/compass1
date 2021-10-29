export interface InsightApiResponse {
  objects: InsightObject[];
  offset: number;
  limit: number;
  attributeNamesForSearch: string[];
  size: number;
}

export interface InsightAvatar {
  url16: string;
  url48: string;
  url72: string;
  url144: string;
  url288: string;
  objectId: number;
}

export interface InsightIcon {
  id: number;
  name: string;
  url16: string;
  url48: string;
}

export interface InsightObjectType {
  id: number;
  name: string;
  type: number;
  icon: InsightIcon;
  position: number;
  created: string;
  updated: string;
  objectCount: number;
  parentObjectTypeId: number;
  objectSchemaId: number;
  inherited: boolean;
  abstractObjectType: boolean;
  parentObjectTypeInherited: boolean;
}

export interface InsightObject {
  id: number;
  label: string;
  objectKey: string;
  avatar: InsightAvatar;
  objectType: InsightObjectType;
  created: string;
  updated: string;
  hasAvatar: boolean;
  timestamp: any;
  attributes: any[];
  _links: any;
  name: string;
}

export interface InsightCustomFieldRequestField {
  fieldId: string;
  value: string;
}

export interface InsightObjectQuery {
  currentIssueId?: string;
  // We might want to transition this over to use a projectId instead
  currentProject: string;
  currentReporter: string;
  customFieldRequestFields: InsightCustomFieldRequestField[];
  excludeIssueScope: boolean;
  limit?: number;
  query?: string;
  start?: number;
}

const toInsightCustomFieldRequestField = (
  fieldId: string,
  value: string,
): InsightCustomFieldRequestField => {
  return {
    fieldId: fieldId,
    value: value,
  } as InsightCustomFieldRequestField;
};

export const INSIGHT_OBJECT_LIMIT = 100;

export const getInsightObjectQuery = (
  issueKey?: string,
  customFieldRequestFieldsMap?: Map<string, string>,
  query?: string,
): InsightObjectQuery => {
  const projectKey = issueKey?.split('-', 2)[0];
  const customFieldRequestFields: InsightCustomFieldRequestField[] = [];

  if (customFieldRequestFieldsMap) {
    customFieldRequestFieldsMap.forEach((value, fieldId) =>
      customFieldRequestFields.push(
        toInsightCustomFieldRequestField(fieldId, value),
      ),
    );
  }

  return {
    currentIssueId: issueKey,
    currentProject: projectKey,
    currentReporter: '',
    customFieldRequestFields: customFieldRequestFields,
    excludeIssueScope: false,
    limit: INSIGHT_OBJECT_LIMIT + 1,
    query: query,
  } as InsightObjectQuery;
};
