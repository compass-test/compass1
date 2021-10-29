import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  descriptionPlaceholder: {
    id: 'dragonfruit-page-component-details.description-placeholder',
    defaultMessage: 'Click here to add a description',
    description: 'The placeholder text for the description field.',
  },
  disabledDescriptionPlaceholder: {
    id: 'dragonfruit-page-component-details.disabled-description-placeholder',
    defaultMessage: `Add description in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'The placeholder text for the description field when the component is in a managed state and uneditable.',
  },
});
