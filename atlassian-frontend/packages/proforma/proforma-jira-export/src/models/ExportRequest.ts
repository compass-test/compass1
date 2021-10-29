import { ExportFormat } from '@atlassian/proforma-common-core/jira-common-models';

export interface ExportRequest {
  readonly exportName: string;
  readonly exportFormat: ExportFormat;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

export const InternalExportApiPath = '/api/2/export';

export interface InternalExportRequest extends ExportRequest {}

export class AllFormResponsesXlsxExportRequest
  implements InternalExportRequest {
  readonly exportName = 'all_form_responses';
  readonly exportFormat = ExportFormat.Xlsx;
  readonly projectId: number;
  readonly templateFormId: number;

  constructor(projectId: number, templateFormId: number) {
    this.projectId = projectId;
    this.templateFormId = templateFormId;
  }
}

export class IndividualFormResponseXlsxExportRequest
  implements InternalExportRequest {
  readonly exportName = 'individual_form_response';
  readonly exportFormat = ExportFormat.Xlsx;
  readonly issueKey: string;
  readonly formResponseId: number;

  constructor(issueKey: string, formResponseId: number) {
    this.issueKey = issueKey;
    this.formResponseId = formResponseId;
  }
}

export class SearchFormResponsesExportRequest implements InternalExportRequest {
  readonly exportName = 'search_form_responses';
  readonly exportFormat: ExportFormat;
  readonly projectId: number;
  readonly templateFormId: number;
  readonly issueKeys: string[];

  constructor(
    exportFormat: ExportFormat,
    projectId: number,
    templateFormId: number,
    issueKeys: string[],
  ) {
    this.exportFormat = exportFormat;
    this.projectId = projectId;
    this.templateFormId = templateFormId;
    this.issueKeys = issueKeys;
  }
}
