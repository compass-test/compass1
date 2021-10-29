import { Form } from '@atlassian/proforma-common-core/form-system-models';

export interface Issue {
  key: string;
  id: number;
  name: string;
  forms: Form[];
}
