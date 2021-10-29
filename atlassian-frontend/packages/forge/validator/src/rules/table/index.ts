import { ForgeDoc } from '@atlassian/forge-ui-types';
import { Rule } from '../../types';

export const validateTableHead: Rule = (element: ForgeDoc) => {
  const { children } = element;
  const errors = [];
  const headCount = children.filter((child) => child.type === 'Head').length;

  if (headCount > 1) {
    errors.push('Table can only contain one Head component.');
  }

  return {
    errors,
    warnings: [],
  };
};
