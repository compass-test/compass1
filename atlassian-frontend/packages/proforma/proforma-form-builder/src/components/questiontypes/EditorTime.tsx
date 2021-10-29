import React from 'react';

import { FormattedMessage, FormattedTime } from 'react-intl';

import Select from '@atlaskit/select';
import {
  EditTimeMessages,
  IntlEditTimeMessages,
} from '@atlassian/proforma-common-core/form-system';
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorTime: React.FunctionComponent<QuestionParameters> = props => {
  const { id, defaultAnswer } = props;
  return (
    <Select
      autoFocus={false}
      instanceId={`pf-fb-questionview-${id}`}
      isInvalid={false}
      isDisabled={true}
      placeholder={
        <FormattedMessage
          {...IntlEditTimeMessages[EditTimeMessages.TimePlaceholder]}
          values={{
            time: <FormattedTime value={new Date()} />,
          }}
        />
      }
      components={{ DropdownIndicator: null }}
      value={(defaultAnswer && defaultAnswer.time) || null}
    />
  );
};
