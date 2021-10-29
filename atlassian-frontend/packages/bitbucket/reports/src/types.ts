export enum ReportResult {
  Passed = 'PASSED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN',
}

export enum ReportType {
  Security = 'SECURITY',
  Coverage = 'COVERAGE',
  Test = 'TEST',
  Bug = 'BUG',
}

export type Report = {
  uuid: string;
  report_type?: ReportType;
  type: string;
  title: string;
  details: string;
  result?: ReportResult;
  reporter: string;
  link?: string;
  external_id: string;
  logo_url?: string;
  data?: Array<{
    title: string;
    type:
      | 'BOOLEAN'
      | 'DATE'
      | 'DURATION'
      | 'LINK'
      | 'NUMBER'
      | 'PERCENTAGE'
      | 'TEXT';
    value: any;
  }>;
  created_on: string;
  updated_on: string;
  is_locked: boolean;
};

export enum AnnotationType {
  Bug = 'BUG',
  CodeSmell = 'CODE_SMELL',
  Vulnerability = 'VULNERABILITY',
}

export enum AnnotationResult {
  Failed = 'FAILED',
  Ignored = 'IGNORED',
  Passed = 'PASSED',
  Skipped = 'SKIPPED',
}

export enum AnnotationSeverity {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
}

export type Annotation = {
  annotation_type?: AnnotationType;
  created_on?: string;
  details?: string;
  external_id: string;
  line?: number;
  link?: string;
  path?: string;
  result?: AnnotationResult;
  severity?: AnnotationSeverity;
  summary: string;
  type: string;
  updated_on?: string;
  uuid: string;
};
