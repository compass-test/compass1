import React from 'react';

import { FormattedDate, FormattedMessage } from 'react-intl';

import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import Select from '@atlaskit/select';
import {
  EditDateMessages,
  IntlEditDateMessages,
} from '@atlassian/proforma-common-core/form-system'; // TODO[PF-2010]: This seems like an odd import maybe this could be done better ?
import { QuestionParameters } from '@atlassian/proforma-common-core/form-system-models';

export const EditorDate: React.FunctionComponent<QuestionParameters> = props => {
  const { id, defaultAnswer } = props;
  return (
    <Select
      autoFocus={false}
      instanceId={`pf-fb-questionview-${id}`}
      isInvalid={false}
      isDisabled={true}
      placeholder={
        <FormattedMessage
          {...IntlEditDateMessages[EditDateMessages.DatePlaceholder]}
          values={{
            date: <FormattedDate value={new Date()} />,
          }}
        />
      }
      components={{
        DropdownIndicator: () => <CalendarIcon label="Dates" />,
      }}
      value={
        defaultAnswer?.date
          ? {
              value: defaultAnswer.date,
              label: defaultAnswer.date,
            }
          : null
      }
    />
  );
};
