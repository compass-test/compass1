import { OptionType } from '@atlaskit/select';

import { FormChoice } from './Form';

export interface SelectOption<ValueType extends string | number = string>
  extends OptionType {
  value: ValueType;
  label: string;
}

export const toSelectOption = (choice: FormChoice): SelectOption => {
  return {
    value: choice.id,
    label: choice.label,
  };
};
