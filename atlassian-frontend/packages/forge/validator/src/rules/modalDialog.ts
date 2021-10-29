import { ForgeDoc } from '@atlassian/forge-ui-types';
import { Rule } from '../types';

export const validateModalDialogProps: Rule = (element: ForgeDoc) => {
  const { props = {} } = element;

  const errors = [];
  if (!props.header) {
    errors.push('ModalDialog must have a header');
  }
  if (!props.onClose) {
    errors.push('ModalDialog must have a onClose');
  }

  return {
    errors,
    warnings: [],
  };
};
