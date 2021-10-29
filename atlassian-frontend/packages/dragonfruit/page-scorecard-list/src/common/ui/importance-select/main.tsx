import React from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import IconSelect, { Props } from '../icon-select';

import messages from './messages';
import { ImportanceOptions } from './utils';

const ImportanceSelect = (props: Props) => {
  const { formatMessage } = useIntl();

  // The options prop is controlled by user's permission.
  return (
    <IconSelect
      {...props}
      options={ImportanceOptions(props.isAdmin || false)}
      placeholder={formatMessage(messages.placeholder)}
      classNamePrefix="dragonfruit-importance-select"
    />
  );
};

export default ImportanceSelect;
