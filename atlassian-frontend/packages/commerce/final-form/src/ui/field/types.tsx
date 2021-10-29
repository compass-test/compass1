import { SyntheticEvent } from 'react';

type SupportedElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
// tslint:disable-next-line:no-empty-interface
interface FormEvent<T = Element> extends SyntheticEvent<T> {}

export interface FieldProps<
  FieldValue,
  Element extends SupportedElements = HTMLInputElement
> {
  id: string;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  // This can be either an event or value as `onChange` might not be applied
  // directly to a DOM element. For example, it might be a react-select
  onChange: (value: FormEvent<Element> | FieldValue) => void;
  onBlur: () => void;
  onFocus: () => void;
  value: FieldValue;
  name: string;
  'aria-invalid': 'true' | 'false';
  'aria-labelledby': string;
}
