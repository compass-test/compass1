import { FormattedMessage } from 'react-intl';

import { TextFieldProps } from '@atlaskit/textfield';

import { PlanNameValidation as Validation } from '../../../common/types';

export type NameFieldMessageKey = 'placeholder' | 'label';

export type FieldMessages = {
  [K in NameFieldMessageKey]: FormattedMessage.MessageDescriptor;
};

export type PlanNameFieldProps = {
  label?: string;
  validation?: Validation;
  onChange?: (planName: string) => void;
  value: string;
} & Omit<TextFieldProps, 'onChange'>;
