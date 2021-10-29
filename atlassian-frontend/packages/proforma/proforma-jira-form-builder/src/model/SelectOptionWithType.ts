import { GroupType } from '@atlaskit/select';
import { SelectOption } from '@atlassian/proforma-common-core/form-system-models';

export interface SelectOptionWithType extends SelectOption {
  type: 'issueType' | 'requestType';
}

export interface SelectGroupedOptionWithType
  extends GroupType<SelectOptionWithType> {
  label: string;
  options: SelectOptionWithType[];
}
