import { FormConditions } from '@atlassian/proforma-common-core/form-system-models';

export interface SectionParameters {
  id: number;
  name?: string;
  conditions?: FormConditions;
  extensionTitle: string;
}
