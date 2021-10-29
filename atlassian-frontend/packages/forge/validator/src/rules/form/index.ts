import { ForgeDoc } from '@atlassian/forge-ui-types';
import { Rule } from '../../types';
import { isWithin } from '../helpers';

export function isWithinForm(
  formComponents: string[] = ['Form', 'ConfigForm'],
) {
  return isWithin(formComponents);
}

export const namePropIsNotANumber: Rule = (element: ForgeDoc) => {
  const { type, props = {} } = element;

  const errors = [];
  if (!props.name) {
    errors.push(`"name" prop on ${type} must be a non-empty string.`);
  } else if (!isNaN(props.name)) {
    errors.push(`"name" prop on ${type} must be a non-numeric string.`);
  }

  return {
    errors,
    warnings: [],
  };
};
