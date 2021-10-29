import { FormData } from '@atlassian/forge-ui-types';
import { User } from '../userPicker/providers/useMentionResource';

interface OptionData {
  value: string;
}
type FormValue = Array<string> | User | OptionData | string;
type FormValueTransformer = (value: FormValue) => FormValue;

const isOptionData = (value: FormValue): value is OptionData =>
  typeof value === 'object' && value.hasOwnProperty('value');

const isUserData = (value: FormValue): value is User =>
  typeof value === 'object' &&
  value.hasOwnProperty('id') &&
  value.hasOwnProperty('name');

export const transformFormValue: FormValueTransformer = (value) => {
  if (isOptionData(value)) {
    return value.value;
  } else if (isUserData(value)) {
    return value.id;
  }
  return value;
};

export const transformFormData = (formData: FormData) =>
  Object.entries(formData).reduce((transformedData, [key, value]) => {
    return {
      ...transformedData,
      [key]: Array.isArray(value)
        ? value.map(transformFormValue)
        : transformFormValue(value),
    };
  }, {});
