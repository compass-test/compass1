import {
  DataConnectionResponse,
  JiraField,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface RefDataJiraFieldGroup {
  label: string;
  options: JiraField[];
}

export interface RefDataJiraFields {
  jiraFieldGroups?: RefDataJiraFieldGroup[];
  jiraFieldMap?: Map<string, JiraField>;
}

export interface RefDataConnections {
  dataConnections?: DataConnectionResponse[];
  dataConnectionMap?: Map<string, DataConnectionResponse>;
}

export interface FormBuilderReferenceData
  extends RefDataJiraFields,
    RefDataConnections {
  // This interface combines reference data from different sources into one, but doesn't add any extra properties.
}
